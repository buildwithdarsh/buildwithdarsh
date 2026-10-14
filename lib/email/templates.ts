import { checklist, checklistCount, checklistSubtitle, checklistTitle } from "@/lib/checklist";
import { site, steps, type Interest } from "@/lib/content";
import type { Mail } from "@/lib/email/resend";

/**
 * Lead emails, rendered as inline-styled HTML with a plain-text twin.
 *
 * Same cut-down paper look as the work.withdarsh.com store emails: cream card,
 * ink border, coral accent, serif headings. Tables only — no flexbox, grid,
 * external fonts or images, which Gmail and Outlook strip.
 */

export type DiagnosticLead = {
  name: string;
  email: string;
  appUrl: string;
  builder: string;
  interest: Interest;
  worry: string;
};

const INK = "#1a1a1a";
const MUTE = "#6e665b";
const PAPER = "#fbf8ef";
const PAPER_2 = "#f3ecdb";
const BOARD = "#f1ead6";
const CORAL = "#f47c5c";
const CORAL_DEEP = "#c4502e";

const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";

const eyebrow = (text: string) =>
  `<p style="margin:0;font-family:${MONO};font-size:12px;letter-spacing:0.08em;color:${MUTE};">${esc(text)}</p>`;

const button = (href: string, label: string) =>
  `<a href="${esc(href)}" style="display:inline-block;padding:12px 22px;background:${CORAL};color:${INK};border:2px solid ${INK};border-radius:6px;font-family:${SERIF};font-weight:bold;font-size:16px;text-decoration:none;">${esc(label)}</a>`;

const para = (html: string, color = INK) =>
  `<p style="margin:16px 0 0;font-size:16px;line-height:1.65;color:${color};">${html}</p>`;

/** Wraps content in the paper card every email shares. */
function shell(title: string, body: string, footer: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light only"><title>${esc(title)}</title></head>
<body style="margin:0;padding:24px 12px;background:${BOARD};color:${INK};font-family:${SERIF};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:580px;margin:0 auto;">
    <tr><td style="padding-bottom:14px;font-family:${MONO};font-size:12px;letter-spacing:0.08em;color:${MUTE};">
      withdarsh <span style="color:${CORAL_DEEP};">/ ${esc(site.section)}</span>
    </td></tr>
    <tr><td style="background:${PAPER};border:2px solid ${INK};border-radius:10px;padding:0;">
      <div style="height:4px;background:${CORAL};border-radius:8px 8px 0 0;"></div>
      <div style="padding:28px 26px;">${body}</div>
    </td></tr>
    <tr><td style="padding:16px 4px 0;font-family:${MONO};font-size:11px;line-height:1.7;color:${MUTE};">
      ${footer}
    </td></tr>
  </table>
</body></html>`;
}

function detailsTable(rows: [label: string, value: string][]): string {
  const row = ([label, value]: [string, string]) =>
    value
      ? `<tr>
          <td style="padding:6px 14px 6px 0;font-family:${MONO};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTE};vertical-align:top;white-space:nowrap;">${esc(label)}</td>
          <td style="padding:6px 0;font-size:15px;line-height:1.55;white-space:pre-wrap;word-break:break-word;">${esc(value)}</td>
        </tr>`
      : "";
  return `<div style="margin:22px 0 0;padding:16px 18px;background:${PAPER_2};border:1px dashed rgba(26,26,26,0.45);border-radius:8px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows.map(row).join("")}</table>
  </div>`;
}

const signOff = `<p style="margin:26px 0 0;font-size:16px;line-height:1.6;">— Darsh<br>
  <span style="font-family:${MONO};font-size:12px;color:${MUTE};">${esc(site.name)} · ${esc(site.brand)} · ${esc(site.location)}</span></p>`;

const diagnosticUrl = `${site.url}/#diagnostic`;

/* ── 1. The checklist, to the person who asked ───────── */

export function checklistEmail(): Mail {
  let n = 0;
  const sections = checklist
    .map(
      (section) => `
      <p style="margin:26px 0 8px;font-family:${MONO};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${CORAL_DEEP};">${esc(section.title)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        ${section.items
          .map((item) => {
            n += 1;
            return `<tr>
              <td style="width:22px;padding:7px 10px 7px 0;vertical-align:top;">
                <div style="width:14px;height:14px;border:2px solid ${INK};border-radius:3px;background:#ffffff;"></div>
              </td>
              <td style="width:26px;padding:7px 6px 7px 0;vertical-align:top;font-family:${MONO};font-size:12px;color:${MUTE};">${String(n).padStart(2, "0")}</td>
              <td style="padding:6px 0;border-bottom:1px dashed rgba(26,26,26,0.2);font-size:15px;line-height:1.55;">${esc(item)}</td>
            </tr>`;
          })
          .join("")}
      </table>`,
    )
    .join("");

  const body = `
    ${eyebrow(`FREE DOWNLOAD · ${checklistCount} CHECKS`)}
    <h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;font-weight:normal;">
      ${esc(checklistTitle)} <span style="color:${CORAL_DEEP};">${esc(checklistSubtitle.split(" — ")[0])}.</span>
    </h1>
    ${para("Here&rsquo;s the full list. Run it top to bottom against your <strong>live</strong> app &mdash; it takes about 30 minutes. Anything you can&rsquo;t tick is a risk worth fixing before real users and real money go through it.")}
    ${sections}
    ${para("Stuck on one, or not sure what you&rsquo;re looking at? Reply with your results &mdash; or send me your app link and I&rsquo;ll record a free 10-minute video of what&rsquo;s wrong.")}
    <p style="margin:20px 0 0;">${button(diagnosticUrl, "Get a free diagnostic")}</p>
    ${signOff}`;

  let m = 0;
  const text = [
    `${checklistTitle.toUpperCase()} ${checklistSubtitle}`,
    "",
    "Run it top to bottom against your live app — about 30 minutes.",
    "Anything you can't tick is a risk worth fixing before real users and real money go through it.",
    ...checklist.flatMap((section) => [
      "",
      section.title.toUpperCase(),
      ...section.items.map((item) => `[ ] ${String(++m).padStart(2, "0")}  ${item}`),
    ]),
    "",
    "Stuck on one? Reply with your results, or get a free 10-minute video diagnostic:",
    diagnosticUrl,
    "",
    "— Darsh",
    `${site.name} · ${site.brand}`,
  ].join("\n");

  return {
    subject: `Your ${checklistCount}-point production checklist`,
    html: shell(
      checklistTitle,
      body,
      `Sent because you asked for the checklist at ${esc(site.domain)}. Reply any time — it reaches me directly.`,
    ),
    text,
  };
}

/* ── 2. Heads-up to Darsh: someone took the checklist ── */

export function checklistLeadEmail(email: string, receivedAt: Date): Mail {
  const when = receivedAt.toUTCString();
  const body = `
    ${eyebrow("NEW CHECKLIST DOWNLOAD")}
    <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;font-weight:normal;">
      <span style="color:${CORAL_DEEP};">${esc(email)}</span> took the checklist.
    </h1>
    ${para("They have the full list in their inbox. Reply to this email to reach them directly &mdash; it&rsquo;s addressed to them.", MUTE)}
    ${detailsTable([
      ["Email", email],
      ["Received", when],
    ])}`;

  return {
    subject: `Checklist download — ${email}`,
    html: shell("New checklist download", body, `Sent by ${esc(site.domain)} · lead form`),
    text: `NEW CHECKLIST DOWNLOAD\n\n${email} took the checklist.\nReceived: ${when}\n\nReply to reach them directly.`,
  };
}

/* ── 3. Diagnostic request, to Darsh ─────────────────── */

export function diagnosticOwnerEmail(lead: DiagnosticLead, receivedAt: Date): Mail {
  const host = new URL(lead.appUrl).host;
  const due = addWorkingDays(receivedAt, 2).toUTCString().replace(/ \d\d:\d\d:\d\d GMT$/, "");

  const body = `
    ${eyebrow("NEW DIAGNOSTIC REQUEST")}
    <h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;font-weight:normal;">
      ${esc(firstName(lead.name))} wants a diagnostic for <span style="color:${CORAL_DEEP};">${esc(host)}.</span>
    </h1>
    ${detailsTable([
      ["Name", lead.name],
      ["Email", lead.email],
      ["App", lead.appUrl],
      ["Built with", lead.builder],
      ["Interested in", lead.interest],
      ["Worried about", lead.worry],
      ["Video due", `${due} (2 working days)`],
    ])}
    ${para(`Reply to this email to reach ${esc(firstName(lead.name))} directly &mdash; it&rsquo;s addressed to them. They&rsquo;ve had a confirmation promising the video within 2 working days.`, MUTE)}
    <p style="margin:18px 0 0;">${button(lead.appUrl, "Open the app")}</p>`;

  const text = [
    "NEW DIAGNOSTIC REQUEST",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `App: ${lead.appUrl}`,
    `Built with: ${lead.builder}`,
    `Interested in: ${lead.interest}`,
    `Worried about:\n${lead.worry}`,
    "",
    `Video due: ${due} (2 working days)`,
    "Reply to reach them directly.",
  ].join("\n");

  return {
    subject: `${lead.interest === "Free diagnostic" || lead.interest === "Not sure yet" ? "Diagnostic request" : lead.interest} — ${host} (${lead.builder})`,
    html: shell("New diagnostic request", body, `Sent by ${esc(site.domain)} · received ${esc(receivedAt.toUTCString())}`),
    text,
  };
}

/* ── 4. Confirmation, to the founder ─────────────────── */

export function diagnosticConfirmEmail(lead: DiagnosticLead): Mail {
  const name = firstName(lead.name);
  const next = steps.items.slice(1, 4);
  // Paid packages still start with the free video — it ends with a fixed quote for the one they picked.
  const packageLine =
    lead.interest === "Free diagnostic" || lead.interest === "Not sure yet"
      ? ""
      : `You picked the ${lead.interest}. Every engagement starts with this free video — it ends with a fixed quote for the ${lead.interest}, so you know the price before any work starts.`;

  const body = `
    ${eyebrow("DIAGNOSTIC REQUEST RECEIVED")}
    <h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;font-weight:normal;">
      Got it, ${esc(name)}. <span style="color:${CORAL_DEEP};">Your video is on its way.</span>
    </h1>
    ${para(`I&rsquo;ll look at <strong>${esc(lead.appUrl)}</strong> and send you a 10-minute video within <strong>2 working days</strong>: your top risks, ranked, and the order to fix them. If your app is in good shape, I&rsquo;ll tell you that too.`)}
    ${packageLine ? para(esc(packageLine)) : ""}
    <p style="margin:24px 0 8px;font-family:${MONO};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${CORAL_DEEP};">What happens next</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${next
        .map(
          (step, i) => `<tr>
            <td style="width:30px;padding:8px 8px 8px 0;vertical-align:top;font-family:${MONO};font-size:13px;color:${CORAL_DEEP};">${String(i + 1).padStart(2, "0")}</td>
            <td style="padding:7px 0;border-bottom:1px dashed rgba(26,26,26,0.2);font-size:15px;line-height:1.55;">
              <strong>${esc(step.title)}</strong> <span style="font-family:${MONO};font-size:11px;color:${MUTE};">· ${esc(step.when)}</span><br>
              <span style="color:${MUTE};">${esc(step.text)}</span>
            </td>
          </tr>`,
        )
        .join("")}
    </table>
    ${para("No passwords, ever. If the video needs a closer look, I&rsquo;ll ask for read-only collaborator access &mdash; with your written OK &mdash; and you remove it when we&rsquo;re done.", MUTE)}
    ${detailsTable([
      ["App", lead.appUrl],
      ["Built with", lead.builder],
      ["Interested in", lead.interest],
      ["Your note", lead.worry],
    ])}
    ${para("Want to add anything? Just reply &mdash; it comes straight to me.")}
    ${signOff}`;

  const text = [
    `Got it, ${name}. Your video is on its way.`,
    "",
    `I'll look at ${lead.appUrl} and send you a 10-minute video within 2 working days:`,
    "your top risks, ranked, and the order to fix them. If your app is in good shape, I'll tell you that too.",
    ...(packageLine ? ["", packageLine] : []),
    "",
    "WHAT HAPPENS NEXT",
    ...next.map((step, i) => `${String(i + 1).padStart(2, "0")}  ${step.title} (${step.when}) — ${step.text}`),
    "",
    "No passwords, ever. If I need a closer look I'll ask for read-only collaborator access, with your written OK.",
    "",
    `App: ${lead.appUrl}`,
    `Built with: ${lead.builder}`,
    `Interested in: ${lead.interest}`,
    `Your note: ${lead.worry}`,
    "",
    "Want to add anything? Just reply.",
    "",
    "— Darsh",
    `${site.name} · ${site.brand}`,
  ].join("\n");

  return {
    subject: "Got it — your free diagnostic is on its way",
    html: shell(
      "Diagnostic request received",
      body,
      `Sent because you requested a diagnostic at ${esc(site.domain)}. Reply any time — it reaches me directly.`,
    ),
    text,
  };
}

/** Mon–Fri only. Good enough for a promise date; ignores public holidays. */
function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setUTCDate(d.getUTCDate() + 1);
    const day = d.getUTCDay();
    if (day !== 0 && day !== 6) left -= 1;
  }
  return d;
}
