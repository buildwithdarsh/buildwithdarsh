"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { z } from "zod";
import { builders, interests, site } from "@/lib/content";
import { emailConfig, emailConfigured, sendMail, trackLead } from "@/lib/email/resend";
import {
  checklistEmail,
  checklistLeadEmail,
  diagnosticConfirmEmail,
  diagnosticOwnerEmail,
  type DiagnosticLead,
} from "@/lib/email/templates";
import { rateLimit } from "@/lib/rate-limit";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name → message, so the form can highlight the field. */
  fieldErrors?: Record<string, string>;
  /** Echoed back on error so the form can keep what the visitor typed. */
  values?: Record<string, string>;
};

const FALLBACK = `Something went wrong on my side. Please email ${site.email} directly — I read every one.`;

/* ── Spam guards ─────────────────────────────────────── */

/** Honeypot filled, or submitted faster than a human could type → silently "succeed". */
function looksLikeBot(form: FormData): boolean {
  if (String(form.get("website") ?? "").trim() !== "") return true;
  const startedAt = Number(form.get("startedAt"));
  return Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 1500;
}

async function clientKey(scope: string): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}

/** Same submission, same key, for a day — Resend then won't send it twice. */
const idempotencyKey = (...parts: string[]) =>
  `build-${createHash("sha256").update(parts.join("|").toLowerCase()).digest("hex").slice(0, 40)}`;

const today = () => new Date().toISOString().slice(0, 10);

/* ── Schemas ─────────────────────────────────────────── */

const email = z
  .string()
  .trim()
  .max(254, "That email is too long.")
  .pipe(z.email("Enter a valid email address."));

const checklistSchema = z.object({ email });

const appUrl = z
  .string()
  .trim()
  .min(1, "Paste your app's URL.")
  .max(300, "That URL is too long.")
  .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => {
    try {
      const u = new URL(v);
      return (u.protocol === "https:" || u.protocol === "http:") && u.hostname.includes(".");
    } catch {
      return false;
    }
  }, "That doesn't look like a URL — e.g. myapp.lovable.app");

const diagnosticSchema = z.object({
  name: z.string().trim().min(1, "Tell me your name.").max(80, "Keep it under 80 characters."),
  email,
  appUrl,
  builder: z.enum(builders, "Pick what you built it with."),
  interest: z.enum(interests).catch("Free diagnostic"),
  worry: z.string().trim().max(1500, "Keep it under 1,500 characters — you can reply with more.").default(""),
});

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

const pick = (form: FormData, keys: string[]) =>
  Object.fromEntries(keys.map((k) => [k, String(form.get(k) ?? "")]));

/* ── Checklist ───────────────────────────────────────── */

export async function requestChecklist(_prev: FormState, form: FormData): Promise<FormState> {
  const values = pick(form, ["email"]);
  if (looksLikeBot(form)) return { status: "success", message: "Sent — check your inbox." };

  const parsed = checklistSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted field.", fieldErrors: fieldErrors(parsed.error), values };
  }

  const limit = rateLimit(await clientKey("checklist"), 5, 10 * 60_000);
  if (!limit.ok) {
    return { status: "error", message: `Too many requests — try again in ${Math.ceil(limit.retryAfterS / 60)} min.`, values };
  }

  if (!emailConfigured()) {
    console.error("[checklist] RESEND_API_KEY missing — could not send to", parsed.data.email);
    return { status: "error", message: FALLBACK, values };
  }

  const to = parsed.data.email;
  const receivedAt = new Date();

  // The checklist is the thing they asked for — its send decides success.
  const sent = await sendMail(to, checklistEmail(), {
    tag: "checklist",
    replyTo: site.email,
    idempotencyKey: idempotencyKey("checklist", to, today()),
  });
  if (!sent.ok) return { status: "error", message: FALLBACK, values };

  // Notify + record after the response; failures only log.
  after(async () => {
    await sendMail(emailConfig.notify, checklistLeadEmail(to, receivedAt), {
      tag: "checklist-lead",
      replyTo: to,
      idempotencyKey: idempotencyKey("checklist-lead", to, today()),
    });
    await trackLead({
      email: to,
      segmentId: emailConfig.segments.checklist,
      event: "checklist.requested",
      payload: { source: site.domain },
    });
  });

  return { status: "success", message: `Sent to ${to} — check your inbox (and the promotions tab).` };
}

/* ── Diagnostic ──────────────────────────────────────── */

export async function requestDiagnostic(_prev: FormState, form: FormData): Promise<FormState> {
  const values = pick(form, ["name", "email", "appUrl", "builder", "interest", "worry"]);
  if (looksLikeBot(form)) return { status: "success", message: "Got it — check your inbox." };

  const parsed = diagnosticSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error), values };
  }

  const limit = rateLimit(await clientKey("diagnostic"), 3, 10 * 60_000);
  if (!limit.ok) {
    return { status: "error", message: `Too many requests — try again in ${Math.ceil(limit.retryAfterS / 60)} min.`, values };
  }

  const lead: DiagnosticLead = parsed.data;
  // Always leave a trace in the server log, so a lead survives even a total email outage.
  console.info("[diagnostic] new request", JSON.stringify({ ...lead, at: new Date().toISOString() }));

  if (!emailConfigured()) {
    console.error("[diagnostic] RESEND_API_KEY missing — request only in logs");
    return { status: "error", message: FALLBACK, values };
  }

  const receivedAt = new Date();
  // Every field is in the key: an edited resubmission is a new email, an identical one is not.
  const key = idempotencyKey("diagnostic", lead.name, lead.email, lead.appUrl, lead.builder, lead.interest, lead.worry, today());

  // The request reaching Darsh is what matters — that send decides success.
  const notified = await sendMail(emailConfig.notify, diagnosticOwnerEmail(lead, receivedAt), {
    tag: "diagnostic-lead",
    replyTo: lead.email,
    idempotencyKey: `${key}-owner`,
  });
  if (!notified.ok) return { status: "error", message: FALLBACK, values };

  const confirmed = await sendMail(lead.email, diagnosticConfirmEmail(lead), {
    tag: "diagnostic-confirm",
    replyTo: site.email,
    idempotencyKey: `${key}-confirm`,
  });

  after(() =>
    trackLead({
      email: lead.email,
      firstName: lead.name.split(/\s+/)[0],
      segmentId: emailConfig.segments.diagnostic,
      event: "diagnostic.requested",
      payload: { app_url: lead.appUrl, builder: lead.builder, interest: lead.interest, source: site.domain },
    }),
  );

  const first = lead.name.split(/\s+/)[0];
  return {
    status: "success",
    message: confirmed.ok
      ? `Got it, ${first}. A confirmation is on its way to ${lead.email} — your video lands within 2 working days.`
      : `Got it, ${first}. Your request reached me — your video lands within 2 working days.`,
  };
}
