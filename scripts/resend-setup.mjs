/**
 * One-time Resend setup for build.withdarsh.com lead automation.
 *
 *   npm run resend:setup
 *
 * Idempotent: finds or creates the two segments and the two events the site
 * sends, then prints the env lines to paste into .env.local and Vercel.
 * Touches nothing else in the Resend account.
 */
import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
if (!key) {
  console.error("RESEND_API_KEY is not set. Add it to .env.local first.");
  process.exit(1);
}

const resend = new Resend(key);

const SEGMENTS = {
  RESEND_SEGMENT_CHECKLIST: "build · checklist downloads",
  RESEND_SEGMENT_DIAGNOSTIC: "build · diagnostic requests",
};

const EVENTS = {
  "checklist.requested": { source: "string" },
  "diagnostic.requested": { app_url: "string", builder: "string", interest: "string", source: "string" },
};

function fail(step, error) {
  console.error(`✗ ${step}: ${error.name} — ${error.message}`);
  process.exit(1);
}

// Segments
const listed = await resend.segments.list();
if (listed.error) fail("list segments", listed.error);
const existing = new Map(listed.data.data.map((s) => [s.name, s.id]));

const env = {};
for (const [envName, name] of Object.entries(SEGMENTS)) {
  let id = existing.get(name);
  if (id) {
    console.log(`✓ segment exists   ${name}`);
  } else {
    const created = await resend.segments.create({ name });
    if (created.error) fail(`create segment "${name}"`, created.error);
    id = created.data.id;
    console.log(`+ segment created  ${name}`);
  }
  env[envName] = id;
}

// Events (so Automations can trigger on them, with typed payloads)
for (const [name, schema] of Object.entries(EVENTS)) {
  const created = await resend.events.create({ name, schema });
  if (created.error) {
    // Already defined is fine; anything else is worth seeing.
    console.log(`✓ event ${name} — ${created.error.message}`);
  } else {
    console.log(`+ event created    ${name}`);
  }
}

console.log("\nAdd these to .env.local and to Vercel (Project → Settings → Environment Variables):\n");
for (const [k, v] of Object.entries(env)) console.log(`${k}=${v}`);
console.log("\nThen build follow-ups in Resend → Automations, triggered by the events above.");
