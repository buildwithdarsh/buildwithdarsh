import { beforeAfter, packages, steps, type Package } from "@/lib/content";
import { PackageCta } from "@/components/package-cta";
import {
  Check,
  CheckDot,
  Container,
  Cross,
  Eyebrow,
  SectionIntro,
  Sticker,
  Window,
  cardFrame,
  hoverLift,
} from "@/components/ui";

export function BeforeAfter() {
  const { before, after } = beforeAfter;
  return (
    <Container className="py-12">
      <section aria-labelledby="change-h" className="flex flex-col gap-9">
        <SectionIntro id="change-h" label={beforeAfter.label} title={beforeAfter.title} lede={beforeAfter.lede} />
        <div className="flex flex-wrap items-stretch gap-6">
          <div className="reveal flex min-w-0 flex-[1_1_440px] flex-col gap-5 rounded-[10px] border-2 border-dashed border-ink/60 bg-paper-2 p-8">
            <div className="flex flex-col gap-1.5">
              <Eyebrow className="text-coral-deep">{before.label}</Eyebrow>
              <h3 className="m-0 font-display text-[28px] font-bold">{before.title}</h3>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-base leading-normal text-ink-2">
              {before.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Cross size={20} className="mt-0.5 flex-[0_0_20px] text-coral-deep" />
                  <span className="line-through decoration-coral-deep/40">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`reveal relative flex min-w-0 flex-[1_1_440px] flex-col gap-5 p-8 ${cardFrame} shadow-window`}>
            <Sticker color="teal" className="absolute -top-3.5 right-6">
              shipped
            </Sticker>
            <div className="flex flex-col gap-1.5">
              <Eyebrow className="text-ink">{after.label}</Eyebrow>
              <h3 className="m-0 font-display text-[28px] font-bold">{after.title}</h3>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-base leading-normal text-ink">
              {after.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckDot />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}

export function Packages() {
  return (
    <Container className="pt-16 pb-12">
      <section id="packages" aria-labelledby="packages-h" className="flex scroll-mt-4 flex-col gap-10">
        <SectionIntro id="packages-h" label={packages.label} title={packages.title} lede={packages.lede} />
        <div className="flex flex-wrap items-stretch gap-6">
          {packages.items.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
        <Eyebrow>{packages.footnote}</Eyebrow>
      </section>
    </Container>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article
      className={`reveal relative flex min-w-0 flex-col gap-5 px-6 py-7 ${cardFrame} ${hoverLift} ${
        pkg.featured
          ? "flex-[1_1_260px] shadow-window before:absolute before:inset-x-0 before:top-0 before:h-[5px] before:rounded-t-[8px] before:bg-coral lg:-translate-y-2 lg:hover:-translate-y-2.5"
          : "flex-[1_1_240px] shadow-card"
      }`}
    >
      {pkg.badge ? (
        <Sticker color="coral" className="absolute -top-3.5 left-5">
          {pkg.badge}
        </Sticker>
      ) : null}

      <div className="flex flex-col gap-1">
        <h3 className="m-0 font-display text-[22px] leading-tight font-bold">{pkg.name}</h3>
        <Eyebrow>{pkg.timing}</Eyebrow>
      </div>

      <span className="font-display text-[44px] leading-none font-bold">
        {pkg.pricePrefix ? <span className="font-sans text-base font-normal text-mute">{pkg.pricePrefix}</span> : null}
        {pkg.price}
        {pkg.priceSuffix ? <span className="font-sans text-base font-normal text-mute">{pkg.priceSuffix}</span> : null}
      </span>

      <ul className="m-0 flex flex-auto list-none flex-col gap-2.5 border-t-2 border-dashed border-ink/25 p-0 pt-4 text-[15px] leading-[1.45] text-ink-2">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <Check className="mt-0.5 flex-[0_0_18px] text-coral-deep" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <PackageCta interest={pkg.interest} size="md" variant={pkg.featured ? "primary" : "secondary"}>
        {pkg.cta}
      </PackageCta>
    </article>
  );
}

export function HowItWorks() {
  const last = steps.items.length - 1;
  return (
    <Container className="py-12">
      <Window
        id="how"
        aria-labelledby="how-h"
        title="how-it-works.mdx"
        accent="teal"
        className="reveal scroll-mt-4"
        bodyClassName="flex flex-col gap-10 p-[clamp(24px,4vw,52px)]"
      >
        <div className="flex flex-col gap-2.5">
          <Eyebrow>{steps.label}</Eyebrow>
          <h2 id="how-h" className="m-0 font-display text-3xl leading-[1.05] font-bold md:text-4xl">
            {steps.title}
          </h2>
        </div>
        <ol className="m-0 flex list-none flex-wrap gap-y-9 p-0">
          {steps.items.map((step, i) => (
            <li
              key={step.title}
              className={`flex min-w-0 flex-[1_1_190px] flex-col gap-2.5 ${i === last ? "" : "pr-6"}`}
            >
              <span className="flex items-center">
                {i === last ? (
                  <span className="inline-flex size-11 flex-[0_0_44px] items-center justify-center rounded-full border-2 border-ink bg-coral shadow-chip">
                    <Check size={22} strokeWidth={2.8} />
                    <span className="sr-only">Step {i + 1}</span>
                  </span>
                ) : (
                  <>
                    <span className="inline-flex size-11 flex-[0_0_44px] items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-sm shadow-chip">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="ml-3 h-0 flex-auto border-t-2 border-dashed border-ink/40" />
                  </>
                )}
              </span>
              <Eyebrow className="text-coral-deep">{step.when}</Eyebrow>
              <h3 className="m-0 font-display text-xl font-bold">{step.title}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </Window>
    </Container>
  );
}
