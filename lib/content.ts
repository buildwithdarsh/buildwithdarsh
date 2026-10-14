/**
 * Every word, price and link on the site lives here.
 * Edit this file to update the page — components only handle layout.
 *
 * Facts about Darsh (stats, projects, libraries, links) match
 * work.withdarsh.com — keep the two in sync.
 */

import { checklistCount, checklistPreview } from "@/lib/checklist";

export const site = {
  name: "Darsh Gupta",
  brand: "withdarsh",
  section: "build",
  domain: "build.withdarsh.com",
  url: "https://build.withdarsh.com",
  email: "withdarsh@gmail.com",
  location: "Mumbai, India",
  timezone: "IST · UTC+05:30",
  replyTime: "under 24h to first reply",
  title: "Production-safe in 7 days — Darsh Gupta · withdarsh",
  description:
    "I find and fix what the AI skipped — database access rules, auth, leaked keys, Stripe webhooks, deploys and monitoring — so you can put real users and real money through your AI-built app.",
  year: 2026,
  /** Set to a path in /public (e.g. "/darsh.jpg") to show a photo in the About section. */
  photo: null as string | null,
  /** Set to your Cal.com / Calendly link to enable the "Book a call" button. */
  bookingUrl: null as string | null,
  portfolio: "https://work.withdarsh.com",
  store: "https://work.withdarsh.com/store",
  social: {
    github: "https://github.com/buildwithdarsh",
    linkedin: "https://www.linkedin.com/in/workwithdarsh",
  },
  legal: {
    terms: null as string | null,
    privacy: null as string | null,
  },
};

export const nav = [
  { label: "packages", href: "#packages" },
  { label: "how it works", href: "#how" },
  { label: "work", href: "#work" },
  { label: "faq", href: "#faq" },
];

export const hero = {
  eyebrow: "withdarsh / build · production hardening for AI-built apps",
  titleBefore: "Your AI-built app, ",
  titleHighlight: "production-safe",
  titleAfter: " in 7 days.",
  lede: "I find and fix what the AI skipped — database access rules, auth, leaked keys, Stripe webhooks, deploys and monitoring — so you can put real users and real money through it.",
  primaryCta: "Get a free 10-minute diagnostic",
  secondaryCta: "See packages",
  footnote: "fixed prices · scope in writing · staging before production",
  stats: [
    { value: "06+", label: "years building" },
    { value: "24+", label: "production systems" },
    { value: "06", label: "MIT libraries" },
    { value: "<24h", label: "first reply" },
  ],
};

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM";

export const report = {
  file: "production-readiness.report",
  note: "sample · illustrative",
  issues: [
    {
      sev: "CRITICAL",
      before: "RLS off on 3 tables: profiles, orders, messages",
      after: "Owner-only policies on every table",
    },
    {
      sev: "CRITICAL",
      before: "Service-role key shipped in the browser bundle",
      after: "Key moved server-side and rotated",
    },
    {
      sev: "HIGH",
      before: "Stripe webhook signature never verified",
      after: "Signed webhooks, replay-tested",
    },
    {
      sev: "HIGH",
      before: "No database backups configured",
      after: "Daily backups, restore tested",
    },
    {
      sev: "MEDIUM",
      before: "No error monitoring — failures are silent",
      after: "Alerts to email and Slack",
    },
  ] satisfies { sev: Severity; before: string; after: string }[],
  beforeSummary: "5 issues · 2 critical",
  beforeVerdict: "est. sprint: 6 working days",
  afterSummary: "0 open issues · 5 fixed",
  afterVerdict: "ready for real users",
};

export const tools = [
  "Lovable",
  "Bolt",
  "Replit",
  "Base44",
  "v0",
  "Cursor",
  "Supabase",
  "Next.js",
  "Stripe",
  "Vercel",
];

export const symptoms = {
  label: "01 / symptoms",
  title: "Sound familiar?",
  lede: "If one of these happened this month, your app isn't ready for paying users yet.",
  items: [
    {
      code: "new row violates row-level security policy",
      text: "Saving fails for everyone — or worse, works for everyone.",
    },
    {
      code: "200 in preview · 500 in production",
      text: "It worked yesterday. It won't deploy today.",
    },
    {
      code: "checkout.session.completed → ???",
      text: 'Stripe took the money. Your app still says "Free plan".',
    },
    {
      code: "credits remaining: 3",
      text: "The AI fixed one bug and created two more.",
    },
    {
      code: "select * from profiles",
      text: "One user can read every other user's data.",
    },
    {
      code: "tests: 0 · alerts: 0",
      text: "You find out something broke when a customer emails you.",
    },
  ],
};

export const why = {
  title: "The AI ships the demo. It skips the parts that keep data safe.",
  lede: "Builders generate working screens fast. Access rules, secrets, payments and monitoring are where they cut corners — and where launches go wrong.",
  stats: [
    {
      value: "~10%",
      text: "of 1,645 scanned Lovable-built apps let anyone read or write database tables with the app's public key.",
      source: "source: CVE-2025-48757",
      href: "https://www.rapidevelopers.com/md/lovable-issues/lovable-security-guide",
    },
    {
      value: "23 of 26",
      text: "AI-built apps in one firm's audits were missing tests — the most common gap it found.",
      source: "source: AxonBuild audit data",
      href: "https://axonbuild.com/blog/vibe-coding-cleanup-specialist",
    },
  ],
};

export const beforeAfter = {
  label: "02 / one sprint",
  title: "What changes in one sprint",
  lede: "Same app, same features. Everything underneath is made safe to grow.",
  before: {
    label: "before",
    title: "Built fast",
    items: [
      "Anyone with your public key can read your tables",
      "Secret keys sitting in the browser",
      "Paying users stuck on the free plan",
      "Customers report bugs before you notice them",
      "Testing happens on the live database",
      '"Don\'t touch it, it works"',
    ],
  },
  after: {
    label: "after",
    title: "Built to last",
    items: [
      "Every table locked to the user who owns the row",
      "Keys server-side, leaked ones rotated",
      "Plan state always matches Stripe",
      "Alerts reach you before customers do",
      "Separate staging and production, deploys from Git",
      "Tests on sign-up, checkout and your core flow",
    ],
  },
};

/** What a diagnostic request can be "interested in". Package buttons pre-select theirs. */
export const interests = [
  "Free diagnostic",
  "Production Audit",
  "Launch-Ready Sprint",
  "Care Plan",
  "Not sure yet",
] as const;

export type Interest = (typeof interests)[number];

export type Package = {
  interest: Interest;
  name: string;
  timing: string;
  price: string;
  pricePrefix?: string;
  priceSuffix?: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const packages = {
  label: "03 / packages",
  title: "Fixed prices. No hourly meter.",
  lede: "Start free. Pay only once you've seen what's wrong and agreed the fix list.",
  footnote: "prices in USD · card or bank transfer · audit fee credited to your sprint",
  items: [
    {
      name: "Diagnostic",
      timing: "10-minute video",
      price: "Free",
      features: [
        "Read-only access, with your written OK",
        "Your top 3 risks, ranked",
        "Fix order and a fixed quote",
      ],
      cta: "Request diagnostic",
      interest: "Free diagnostic",
    },
    {
      name: "Production Audit",
      timing: "2–3 working days",
      price: "$490",
      features: [
        "25-point review: data, auth, payments, deploys",
        "Written report, ranked by severity",
        "Fee credited if you book the sprint",
      ],
      cta: "Book an audit",
      interest: "Production Audit",
    },
    {
      name: "Launch-Ready Sprint",
      timing: "5–7 working days",
      price: "$1,500",
      pricePrefix: "from ",
      features: [
        "Everything the audit finds, fixed",
        "Access rules and secrets locked down",
        "Stripe webhooks verified and tested",
        "Monitoring, backups, deploy pipeline",
        "Tests on your critical flows",
        "Handoff doc any developer can follow",
      ],
      cta: "Start with a diagnostic",
      interest: "Launch-Ready Sprint",
      featured: true,
      badge: "core offer",
    },
    {
      name: "Care Plan",
      timing: "after launch · monthly",
      price: "$350",
      priceSuffix: "/month",
      features: [
        "Uptime and error monitoring",
        "Security and dependency updates",
        "Up to 3 hours of fixes a month",
        "Monthly health report · cancel any month",
      ],
      cta: "Ask about care",
      interest: "Care Plan",
    },
  ] satisfies Package[],
};

export const steps = {
  label: "04 / how it works",
  title: "From link to launch",
  items: [
    {
      when: "2 minutes",
      title: "Send your link",
      text: "Your app URL and what's worrying you.",
    },
    {
      when: "≤ 2 working days",
      title: "Get the video",
      text: "Your top risks, ranked, and the order to fix them.",
    },
    {
      when: "before any work",
      title: "Approve a fixed quote",
      text: "Scope and acceptance criteria, in writing.",
    },
    {
      when: "5–7 working days",
      title: "Fixes land in staging",
      text: "You review before anything touches production.",
    },
    {
      when: "launch day",
      title: "Go live, with a record",
      text: "A plain-English handoff. Keep it, or add the Care Plan.",
    },
  ],
};

export const about = {
  label: "05 / who you're hiring",
  title: "Hi, I'm Darsh.",
  tagline: "AI engineer of unreal systems.",
  paragraphs: [
    "Full-stack engineer and platform architect, 6+ years in. I've shipped 24+ production systems — including real client builds for a restaurant, a salon and a boutique hotel — and built TechZunction, my own 63-module NestJS platform.",
    "One operator. Full stack. Zero hand-offs. Now I take what the AI built and make it hold up under real users. I've led 20+ developers and mentored 50+ engineers, and I work async from Mumbai with overlap for US mornings and UK afternoons.",
  ],
  chips: [
    "6+ years",
    "24+ production systems",
    "6 MIT libraries",
    "50+ engineers mentored",
    "Next.js · NestJS · Postgres",
    "US / UK overlap",
  ],
  /** The terminal card shown in place of a photo. */
  whoami: [
    { cmd: "whoami", out: "darsh gupta — full-stack · platform architect" },
    { cmd: "location", out: "mumbai, india · IST (UTC+05:30)" },
    { cmd: "stack", out: "next.js 16 · react 19 · nestjs · prisma · postgres" },
    { cmd: "status", out: "available for hire · replies < 24h" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  sticker: string;
  summary: string;
  proof: string;
  stack: string[];
  image: string;
  demo: string;
};

export const work = {
  label: "06 / shipped",
  title: "Real client builds",
  lede: "Live and clickable. This is the quality bar your app gets.",
  more: { label: "all 24+ systems on work.withdarsh.com", href: "https://work.withdarsh.com" },
  items: [
    {
      slug: "burgerempire",
      name: "Burger Empire",
      kind: "restaurant · f&b",
      sticker: "real client build",
      summary:
        "Aggregator-free food ordering with a two-brand theme engine — PetPooja POS sync, Razorpay, WhatsApp ordering, coin loyalty and referrals.",
      proof: "104 features · 130+ API routes · 13 modules",
      stack: ["next.js 15", "nestjs", "prisma", "razorpay"],
      image: "/work/burgerempire.jpg",
      demo: "https://burgerempire.work.withdarsh.com",
    },
    {
      slug: "velvet",
      name: "Velvet",
      kind: "premium salon",
      sticker: "real client build",
      summary:
        "Glamour Waves Unisex Salon — dark-and-gold site with CMS-driven services, WhatsApp booking fallback and LocalBusiness schema.",
      proof: "90+ Lighthouse on mobile and desktop",
      stack: ["next.js 16", "react 19", "framer motion"],
      image: "/work/velvet.jpg",
      demo: "https://velvet.work.withdarsh.com",
    },
    {
      slug: "vicity",
      name: "ViCity",
      kind: "boutique hotel",
      sticker: "real client build",
      summary:
        "Luxury hotel booking with hold-timer reservations, Razorpay checkout and ISR-powered booking pages.",
      proof: "12-screen admin · 50+ pages · Docker CI/CD",
      stack: ["next.js 16", "zod", "recharts", "docker"],
      image: "/work/vicity.jpg",
      demo: "https://vicity.work.withdarsh.com",
    },
  ] satisfies Project[],
};

export const libraries = {
  title: "Open source",
  lede: "Six MIT-licensed, zero-dependency JavaScript libraries.",
  items: [
    { name: "AuraJS", size: "11 KB", text: "20-module SPA framework", href: "https://github.com/buildwithdarsh/AuraJS" },
    { name: "KeyBoardJS", size: "3.2 KB", text: "hotkeys, chords, sequences", href: "https://github.com/buildwithdarsh/KeyBoardJS" },
    { name: "MousePadJS", size: "2.9 KB", text: "pointer + gesture library", href: "https://github.com/buildwithdarsh/MousePadJS" },
    { name: "CollideJS", size: "2.1 KB", text: "element collision engine", href: "https://github.com/buildwithdarsh/CollideJS" },
    { name: "TabJS", size: "3 KB", text: "cross-tab state + locks", href: "https://github.com/buildwithdarsh/TabJS" },
    { name: "HistoryJS", size: "3 KB", text: "typed History API wrapper", href: "https://github.com/buildwithdarsh/HistoryJS" },
  ],
};

export const checklist = {
  badge: "free download",
  title: "The 25-point production checklist for Lovable + Supabase apps",
  lede: "Run it yourself in about 30 minutes. If you get stuck, send me the result.",
  emailLabel: "Work email",
  emailPlaceholder: "you@company.com",
  cta: "Send me the checklist",
  previewFile: "checklist.md",
  preview: checklistPreview,
  more: `+ ${checklistCount - checklistPreview.length} more checks`,
};

export const faq = {
  label: "07 / faq",
  title: "Questions founders ask",
  items: [
    {
      q: "Do you need my passwords?",
      a: "No. You invite me as a collaborator to your repo, database and hosting — read-only for the diagnostic. You remove my access when we're done.",
    },
    {
      q: "Will you rebuild my app?",
      a: "No. I fix what you have. If moving off a builder makes sense, I'll say so and quote it separately.",
    },
    {
      q: "Is this a penetration test?",
      a: "No. It's a production-readiness review and hardening, not a formal security certification. If you need a certified pen test, I'll tell you.",
    },
    {
      q: "What if the problem is bigger than the package?",
      a: "You'll hear it before you pay for more. Scope is always agreed in writing first.",
    },
    {
      q: "Which tools do you work with?",
      a: "Apps built with Lovable, Bolt, Replit, Base44, v0 or Cursor, on React, Next.js, Supabase, Postgres, Vercel, Netlify and Stripe.",
    },
    {
      q: "How do I pay?",
      a: "Invoice in USD, payable by card or bank transfer. Sprints are 50% upfront, 50% on handoff.",
    },
  ],
};

export const finalCta = {
  badge: "free · no call needed",
  title: "Send me your app link. Get a 10-minute video of what's wrong.",
  lede: "If your app is in good shape, I'll tell you that too.",
  secondary: "Book a 15-minute call",
};

/** What the diagnostic form asks for. Options must stay in sync with the server schema (it imports this). */
export const builders = [
  "Lovable",
  "Bolt",
  "Replit",
  "Base44",
  "v0",
  "Cursor",
  "Hand-written",
  "Something else",
] as const;

export const diagnosticForm = {
  name: { label: "Your name", placeholder: "Alex" },
  email: { label: "Work email", placeholder: "you@company.com" },
  appUrl: { label: "App link", placeholder: "myapp.lovable.app" },
  builder: { label: "Built with" },
  interest: { label: "Interested in" },
  worry: {
    label: "What's worrying you?",
    placeholder: "e.g. Stripe says paid but users stay on free; not sure RLS is right…",
    hint: "optional",
  },
  submit: "Request free diagnostic",
  pending: "Sending…",
  promise: "Video within 2 working days · no passwords needed",
};

export const footer = {
  note: "fixed-scope engagements · liability limited to fees paid",
};
