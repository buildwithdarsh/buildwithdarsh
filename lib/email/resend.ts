import { Resend } from "resend";
import { site } from "@/lib/content";

/**
 * Thin Resend layer. Nothing here throws — callers decide what a failed send
 * means. Mirrors the conventions of the work.withdarsh.com store mailer.
 */

export const emailConfig = {
  /** Sender. Its domain MUST be verified at https://resend.com/domains or every send fails 403. */
  from: process.env.LEAD_FROM_EMAIL || "withdarsh <onboarding@resend.dev>",
  /** Where new leads land. */
  notify: process.env.LEAD_NOTIFY_EMAIL || site.email,
  segments: {
    checklist: process.env.RESEND_SEGMENT_CHECKLIST || null,
    diagnostic: process.env.RESEND_SEGMENT_DIAGNOSTIC || null,
  },
};

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY);

let client: Resend | null = null;
let trackingUnavailable = false;

function resend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}

export type Mail = { subject: string; html: string; text: string };

export type SendResult = { ok: true; id: string } | { ok: false; error: string };

export async function sendMail(
  to: string,
  mail: Mail,
  opts: { replyTo?: string; tag: string; idempotencyKey?: string },
): Promise<SendResult> {
  const api = resend();
  if (!api) return { ok: false, error: "RESEND_API_KEY is not set" };

  try {
    const { data, error } = await api.emails.send(
      {
        from: emailConfig.from,
        to,
        replyTo: opts.replyTo ?? site.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        tags: [
          { name: "site", value: "build" },
          { name: "kind", value: opts.tag },
        ],
      },
      opts.idempotencyKey ? { idempotencyKey: opts.idempotencyKey } : undefined,
    );

    // Same idempotency key already used today → this exact email already went out.
    if (error?.name === "invalid_idempotent_request") {
      console.info(`[email] ${opts.tag} already sent today (idempotency key reused) — treating as delivered`);
      return { ok: true, id: "duplicate" };
    }
    if (error) {
      console.error(`[email] resend rejected ${opts.tag}:`, error.name, error.statusCode, error.message);
      return { ok: false, error: `${error.name}: ${error.message}` };
    }
    console.info(`[email] sent ${opts.tag} · resend id ${data.id}`);
    return { ok: true, id: data.id };
  } catch (err) {
    console.error(`[email] send failed ${opts.tag}:`, err);
    return { ok: false, error: String(err) };
  }
}

/**
 * Records the lead in Resend: upserts the contact, adds it to a segment, and
 * fires an event that dashboard Automations can trigger on (follow-ups, drips).
 * Best effort — run it after the response, and it only logs on failure.
 */
export async function trackLead(lead: {
  email: string;
  firstName?: string;
  segmentId: string | null;
  event: string;
  payload: Record<string, string>;
}): Promise<void> {
  const api = resend();
  if (!api || trackingUnavailable) return;

  try {
    const created = await api.contacts.create({
      email: lead.email,
      firstName: lead.firstName || undefined,
      segments: lead.segmentId ? [{ id: lead.segmentId }] : undefined,
    });

    // A "sending access" key can't touch contacts or events. Say so once, then stop trying.
    if (created.error?.name === "restricted_api_key") {
      trackingUnavailable = true;
      console.warn(
        "[email] RESEND_API_KEY is sending-only — emails work, but leads aren't saved as contacts and no automation events fire. Use a full-access key to enable them.",
      );
      return;
    }

    // Already a contact (e.g. took the checklist, now wants a diagnostic) — just add the segment.
    if (created.error && lead.segmentId) {
      const added = await api.contacts.segments.add({ email: lead.email, segmentId: lead.segmentId });
      if (added.error) console.warn("[email] segment add failed:", added.error.name, added.error.message);
    }

    const sent = await api.events.send({ event: lead.event, email: lead.email, payload: lead.payload });
    if (sent.error) console.warn(`[email] event ${lead.event} failed:`, sent.error.name, sent.error.message);
  } catch (err) {
    console.warn("[email] trackLead failed:", err);
  }
}
