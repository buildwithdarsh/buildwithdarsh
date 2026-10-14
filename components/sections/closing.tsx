import { checklist, faq, finalCta, footer, site } from "@/lib/content";
import { ChecklistForm } from "@/components/checklist-form";
import { DiagnosticForm } from "@/components/diagnostic-form";
import {
  Container,
  DotPill,
  Eyebrow,
  Sticker,
  TrafficDots,
  Window,
} from "@/components/ui";

export function Checklist() {
  return (
    <Container className="py-12">
      <Window
        aria-labelledby="checklist-h"
        title="checklist.md"
        accent="teal"
        className="reveal"
        bodyClassName="flex flex-wrap items-center gap-x-14 gap-y-10 p-[clamp(24px,4vw,52px)]"
      >
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
          <Sticker color="mustard" className="self-start">
            {checklist.badge}
          </Sticker>
          <h2 id="checklist-h" className="m-0 font-display text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.1] font-bold">
            {checklist.title}
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ink-2">{checklist.lede}</p>
          <ChecklistForm />
        </div>

        <div className="flex min-w-0 flex-[1_1_340px] rotate-1 flex-col gap-3.5 rounded-md border-[1.5px] border-dashed border-ink bg-paper-2 p-6 font-mono shadow-code">
          <span className="text-xs text-mute">{checklist.previewFile} — preview</span>
          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[13.5px] leading-[1.45] text-ink">
            {checklist.preview.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-px size-[18px] flex-[0_0_18px] -rotate-3 rounded-[3px] border-2 border-ink bg-paper"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <span className="text-xs text-coral-deep">{checklist.more}</span>
        </div>
      </Window>
    </Container>
  );
}

export function Faq() {
  return (
    <Container className="max-w-[880px] pt-16 pb-12">
      <section id="faq" aria-labelledby="faq-h" className="flex scroll-mt-4 flex-col gap-8">
        <div className="flex flex-col gap-2.5">
          <Eyebrow>{faq.label}</Eyebrow>
          <h2 id="faq-h" className="m-0 font-display text-3xl leading-[1.05] font-bold md:text-4xl">
            {faq.title}
          </h2>
        </div>
        <div className="reveal flex flex-col border-t-2 border-dashed border-ink/40">
          {faq.items.map((item, i) => (
            <details key={item.q} open={i === 0} className="group border-b-2 border-dashed border-ink/40 py-1">
              <summary className="flex min-h-[60px] items-center justify-between gap-4 font-display text-[19px] font-bold transition-colors duration-200 hover:text-coral-deep">
                {item.q}
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 flex-none items-center justify-center rounded-full border-[1.5px] border-ink bg-paper font-display text-xl leading-none transition-[rotate,background-color] duration-200 group-open:rotate-45 group-open:bg-coral"
                >
                  +
                </span>
              </summary>
              <p className="m-0 mb-5 max-w-[700px] text-base leading-[1.65] text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </Container>
  );
}

export function FinalCta() {
  const callHref =
    site.bookingUrl ?? `mailto:${site.email}?subject=${encodeURIComponent("15-minute call")}`;

  return (
    <Container className="pt-12 pb-16">
      <Window
        id="diagnostic"
        aria-labelledby="cta-h"
        title="diagnostic.mdx"
        accent="coral"
        className="reveal scroll-mt-4"
        bodyClassName="relative isolate flex flex-col items-center gap-6 px-6 py-[clamp(40px,6vw,88px)] text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(26,26,26,0.12)_1px,transparent_1.4px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent_85%)]"
        />
        <DotPill pulse>{finalCta.badge}</DotPill>
        <h2
          id="cta-h"
          className="m-0 max-w-[820px] font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-bold text-balance"
        >
          {finalCta.title}
        </h2>
        <p className="m-0 max-w-[560px] text-lg leading-[1.6] text-ink-2">{finalCta.lede}</p>
        <div className="w-full pt-2">
          <div className="mx-auto max-w-[720px]">
            <DiagnosticForm />
          </div>
        </div>
        <p className="m-0 font-mono text-xs text-mute">
          prefer to talk?{" "}
          <a
            href={callHref}
            className="text-ink underline decoration-dashed underline-offset-4"
            {...(site.bookingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {finalCta.secondary.toLowerCase()}
          </a>{" "}
          · or email{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline decoration-dashed underline-offset-4">
            {site.email}
          </a>{" "}
          · {site.replyTime}
        </p>
      </Window>
    </Container>
  );
}

export function Footer() {
  const links = [
    { label: "work.withdarsh.com", href: site.portfolio },
    { label: "store", href: site.store },
    { label: "github", href: site.social.github },
    { label: "linkedin", href: site.social.linkedin },
    ...(site.legal.terms ? [{ label: "terms", href: site.legal.terms }] : []),
    ...(site.legal.privacy ? [{ label: "privacy", href: site.legal.privacy }] : []),
  ];

  return (
    <footer className="border-t-2 border-dashed border-ink/40 bg-paper/60">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8">
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-2.5">
            <TrafficDots size="size-2.5" />
            <span className="font-display text-lg font-bold">{site.brand}</span>
            <span className="font-mono text-xs font-bold text-coral-deep">/ {site.section}</span>
          </span>
          <Eyebrow>
            © {site.year} {site.name} · {site.location} · {footer.note}
          </Eyebrow>
        </div>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-display text-[15px] text-mute hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
