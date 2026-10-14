import { symptoms, why } from "@/lib/content";
import { Container, Cross, SectionIntro, Window, card, hoverLift } from "@/components/ui";

export function Symptoms() {
  return (
    <Container className="flex flex-col gap-9 pt-20 pb-12">
      <section aria-labelledby="symptoms-h" className="flex flex-col gap-9">
        <SectionIntro
          id="symptoms-h"
          label={symptoms.label}
          title={symptoms.title}
          lede={symptoms.lede}
        />
        <ul className="m-0 flex list-none flex-wrap gap-5 p-0">
          {symptoms.items.map((item) => (
            <li
              key={item.code}
              className={`reveal flex min-w-0 flex-[1_1_320px] flex-col gap-3.5 p-5 ${card} ${hoverLift}`}
            >
              <span className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 flex-[0_0_32px] items-center justify-center rounded-full border-[1.5px] border-ink bg-coral-soft text-ink"
                >
                  <Cross />
                </span>
                <code className="rounded-md border-[1.5px] border-dashed border-ink/70 bg-paper-2 px-2 py-1 font-mono text-[13px] leading-snug text-coral-deep shadow-code">
                  {item.code}
                </code>
              </span>
              <span className="text-[17px] leading-normal text-ink-2">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

const noteStyles = ["bg-mustard -rotate-1", "bg-coral-soft rotate-1"];

export function Why() {
  return (
    <Container className="py-12">
      <Window
        aria-labelledby="why-h"
        title="why-it-breaks.md"
        accent="coral"
        className="reveal"
        bodyClassName="flex flex-wrap items-center gap-12 p-[clamp(24px,4vw,52px)]"
      >
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
          <h2 id="why-h" className="m-0 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.1] font-bold">
            {why.title}
          </h2>
          <p className="m-0 text-lg leading-[1.6] text-ink-2">{why.lede}</p>
        </div>
        <div className="flex min-w-0 flex-[1_1_500px] flex-wrap gap-6">
          {why.stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex min-w-0 flex-[1_1_220px] flex-col gap-3 rounded-[4px] border-2 border-ink p-6 shadow-card transition-[rotate,translate] duration-200 hover:rotate-0 hover:-translate-y-0.5 ${noteStyles[i % noteStyles.length]}`}
            >
              <span className="font-display text-[clamp(3rem,5vw,4.4rem)] leading-[0.95] font-bold">
                {stat.value}
              </span>
              <p className="m-0 text-base leading-normal text-ink">{stat.text}</p>
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-xs text-ink underline decoration-dashed underline-offset-4"
              >
                {stat.source}
              </a>
            </div>
          ))}
        </div>
      </Window>
    </Container>
  );
}
