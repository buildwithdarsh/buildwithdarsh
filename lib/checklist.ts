/**
 * The lead magnet: the 25-point production checklist for Lovable + Supabase apps.
 *
 * Delivered in full by email (lib/email/templates.ts). The landing page shows
 * the four `preview` items and sells the rest.
 *
 * DRAFT — written around the four items the page already promised.
 * Review and edit before going live; the email renders whatever is here.
 */

export type ChecklistSection = { title: string; items: string[] };

export const checklistTitle = "The 25-point production checklist";

export const checklistSubtitle = "for Lovable + Supabase apps — run it in about 30 minutes";

export const checklist: ChecklistSection[] = [
  {
    title: "Data access",
    items: [
      "RLS enabled on every table that holds user data",
      "Every policy compares auth.uid() to an owner column — no “using (true)” on anything private.",
      "Policies exist for all four verbs: select, insert, update, delete. A missing one is either a bug or a hole.",
      "Storage buckets with user files are private, with policies on storage.objects.",
      "Views use security_invoker, and every security definer function has been read line by line.",
    ],
  },
  {
    title: "Keys and secrets",
    items: [
      "No service-role key in the client bundle",
      "Search the built JavaScript for service_role, sk_live and secret — rotate anything you find.",
      "Calls to OpenAI, Stripe and email providers run in an edge function or server route, never the browser.",
      "Secrets live in your host's environment settings; .env is in .gitignore and was never committed.",
      "Staging and production use different keys and different databases.",
    ],
  },
  {
    title: "Auth",
    items: [
      "Email confirmation is on, and the allowed redirect URLs list only your real domains.",
      "Password reset works on the production domain, not just localhost.",
      "Admin screens are protected in the database or server, not just hidden in the UI.",
      "Auth rate limits are on for sign-up, login and OTP.",
      "Deleting a user removes or anonymises their rows and files.",
    ],
  },
  {
    title: "Payments",
    items: [
      "Stripe webhook signature verified",
      "Plan state is set by the webhook, never by the success-page redirect.",
      "The webhook handler is idempotent — the same event twice changes nothing.",
      "Cancellations, failed payments and refunds remove paid access.",
      "Test-mode and live-mode keys never share an environment.",
    ],
  },
  {
    title: "Deploys and recovery",
    items: [
      "Backups on, and restored once",
      "Errors reach you (Sentry or similar) before a customer emails you.",
      "An uptime check watches the homepage, login and checkout.",
      "Deploys come from Git, and you have rolled one back at least once.",
      "Schema changes are migrations in the repo, not clicks in the dashboard.",
    ],
  },
];

export const checklistCount = checklist.reduce((n, s) => n + s.items.length, 0);

/** The four items the landing page shows — the first of each of the first sections. */
export const checklistPreview = [
  checklist[0].items[0],
  checklist[1].items[0],
  checklist[3].items[0],
  checklist[4].items[0],
];
