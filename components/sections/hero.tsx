import { hero, tools } from "@/lib/content";
import { ReportCard } from "@/components/report-card";
import { ButtonArrow, ButtonLink, Container, DotPill, Eyebrow, Window } from "@/components/ui";

/** Staggered entrance for hero pieces; skipped for reduced-motion visitors. */
const rise = "motion-safe:animate-rise";

export function Hero() {
  return (
    <Container className="pt-6 md:pt-10">
      <Window
        id="top"
        aria-labelledby="hero-h"
        title="build.mdx"
        accent="mustard"
        className={`scroll-mt-24 ${rise}`}
        bodyClassName="flex flex-wrap items-center gap-x-12 gap-y-10 p-[clamp(20px,4.5vw,52px)]"
      >
        <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-6">
          <DotPill pulse className={`self-start ${rise} [animation-delay:80ms]`}>
            {hero.eyebrow}
          </DotPill>

          <h1
            id="hero-h"
            className={`m-0 font-display text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.04] font-bold text-balance ${rise} [animation-delay:140ms]`}
          >
            {/* keep "AI-built" from breaking at its hyphen on narrow screens */}
            {hero.titleBefore.split(/(AI-built)/).map((part, i) =>
              part === "AI-built" ? (
                <span key={i} className="whitespace-nowrap">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
            <span className="text-coral-deep underline decoration-coral decoration-wavy decoration-[3px] underline-offset-[0.2em] [text-decoration-skip-ink:none]">
              {hero.titleHighlight}
            </span>
            {hero.titleAfter}
          </h1>

          <p className={`m-0 max-w-[580px] text-lg leading-[1.65] text-ink-2 md:text-xl ${rise} [animation-delay:200ms]`}>
            {hero.lede}
          </p>

          <div className={`flex flex-wrap gap-3.5 pt-1 ${rise} [animation-delay:260ms]`}>
            <ButtonLink href="#diagnostic">
              {hero.primaryCta}
              <ButtonArrow />
            </ButtonLink>
            <ButtonLink href="#packages" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <Eyebrow className={`${rise} [animation-delay:320ms]`}>{hero.footnote}</Eyebrow>

          <dl
            className={`m-0 grid grid-cols-2 gap-x-6 gap-y-4 border-t-2 border-dashed border-ink/30 pt-5 sm:grid-cols-4 ${rise} [animation-delay:380ms]`}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-xs text-mute">{stat.label}</dt>
                <dd className="m-0 font-display text-3xl leading-none font-bold text-coral-deep">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`relative min-w-0 flex-[1_1_420px] ${rise} [animation-delay:240ms]`}>
          <p
            aria-hidden="true"
            className="m-0 mb-3 -rotate-2 text-right font-display text-lg text-coral-deep"
          >
            flip it — click &ldquo;after sprint&rdquo; ↓
          </p>
          <div className="lg:rotate-[0.6deg]">
            <ReportCard />
          </div>
        </div>
      </Window>

      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-8 pb-2">
        <Eyebrow className="uppercase">works with apps built on</Eyebrow>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-display text-lg text-mute">
          {tools.map((tool) => (
            <li key={tool} className="transition-colors duration-200 hover:text-ink">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
