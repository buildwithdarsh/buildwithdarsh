import {
  checklistEmail,
  checklistLeadEmail,
  diagnosticConfirmEmail,
  diagnosticOwnerEmail,
  type DiagnosticLead,
} from "@/lib/email/templates";

/**
 * Development-only previews of the lead emails:
 *   /dev/emails/checklist · checklist-lead · diagnostic-owner · diagnostic-confirm
 * Append ?text to see the plain-text twin. 404s in production.
 */

const sample: DiagnosticLead = {
  name: "Alex Rivera",
  email: "alex@example.com",
  appUrl: "https://myapp.lovable.app",
  builder: "Lovable",
  interest: "Launch-Ready Sprint",
  worry: "Stripe says paid but users stay on the free plan.\nAlso not sure RLS is set up right.",
};

const at = new Date("2026-10-12T09:30:00Z");

const templates = {
  checklist: () => checklistEmail(),
  "checklist-lead": () => checklistLeadEmail(sample.email, at),
  "diagnostic-owner": () => diagnosticOwnerEmail(sample, at),
  "diagnostic-confirm": () => diagnosticConfirmEmail(sample),
};

export async function GET(request: Request, ctx: RouteContext<"/dev/emails/[name]">) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });

  const { name } = await ctx.params;
  const render = templates[name as keyof typeof templates];
  if (!render) {
    const links = Object.keys(templates)
      .map((t) => `<li><a href="/dev/emails/${t}">${t}</a> · <a href="/dev/emails/${t}?text">text</a></li>`)
      .join("");
    return new Response(`<ul style="font:16px system-ui;line-height:2">${links}</ul>`, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const mail = render();
  const wantsText = new URL(request.url).searchParams.has("text");
  return new Response(wantsText ? `Subject: ${mail.subject}\n\n${mail.text}` : mail.html, {
    headers: { "content-type": `${wantsText ? "text/plain" : "text/html"}; charset=utf-8` },
  });
}
