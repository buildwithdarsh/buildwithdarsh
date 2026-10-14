import Image from "next/image";
import { about, libraries, site, work, type Project } from "@/lib/content";
import {
  Container,
  Eyebrow,
  SectionIntro,
  Sticker,
  Tag,
  Window,
  cardFrame,
  hoverLift,
} from "@/components/ui";

export function About() {
  const links = [
    { label: "github", href: site.social.github },
    { label: "linkedin", href: site.social.linkedin },
    { label: "work.withdarsh.com", href: site.portfolio },
  ];

  return (
    <Container className="pt-16 pb-12">
      <section aria-labelledby="about-h" className="reveal flex flex-wrap items-center gap-12">
        {site.photo ? (
          <div className="flex-[0_0_260px] -rotate-2 border-2 border-ink bg-paper p-3 pb-10 shadow-window">
            <Image
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              width={260}
              height={300}
              className="h-[300px] w-full object-cover"
            />
          </div>
        ) : (
          <Window
            title="zsh — whoami"
            className="min-w-0 flex-[1_1_320px] -rotate-1 md:max-w-[400px]"
            bodyClassName="flex flex-col gap-3 bg-paper p-5 font-mono text-[13.5px] leading-relaxed"
          >
            {about.whoami.map((line) => (
              <div key={line.cmd}>
                <p className="m-0 text-mute">
                  <span className="text-coral-deep">$</span> {line.cmd}
                </p>
                <p className="m-0 text-ink">{line.out}</p>
              </div>
            ))}
            <p className="m-0 text-coral-deep">
              $ <span className="inline-block h-4 w-2 translate-y-0.5 bg-ink motion-safe:animate-pulse" />
            </p>
          </Window>
        )}

        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
          <Eyebrow>{about.label}</Eyebrow>
          <h2 id="about-h" className="m-0 font-display text-4xl leading-[1.05] font-bold md:text-5xl">
            {about.title}
          </h2>
          <p className="m-0 -mt-1 -rotate-1 self-start font-display text-xl text-coral-deep">{about.tagline}</p>
          {about.paragraphs.map((p) => (
            <p key={p} className="m-0 text-lg leading-[1.65] text-ink-2">
              {p}
            </p>
          ))}
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {about.chips.map((chip) => (
              <li key={chip}>
                <Tag>{chip}</Tag>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-display text-base font-bold underline decoration-coral decoration-2 underline-offset-4 hover:decoration-ink"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

export function Work() {
  return (
    <Container className="py-12">
      <section id="work" aria-labelledby="work-h" className="flex scroll-mt-4 flex-col gap-10">
        <SectionIntro id="work-h" label={work.label} title={work.title} lede={work.lede} />
        <div className="flex flex-wrap gap-6">
          {work.items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <a
          href={work.more.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 self-start font-display text-lg text-coral-deep no-underline"
        >
          <span className="underline decoration-dashed underline-offset-4">{work.more.label}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>

        <Libraries />
      </section>
    </Container>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`reveal flex min-w-0 flex-[1_1_320px] flex-col overflow-hidden ${cardFrame} shadow-card ${hoverLift}`}
    >
      <div className="relative border-b-2 border-ink bg-paper-2">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.kind} website screenshot`}
          width={1440}
          height={829}
          sizes="(min-width: 1160px) 360px, (min-width: 720px) 50vw, 100vw"
          className="aspect-[16/10] h-auto w-full object-cover object-top"
        />
        <Sticker className="absolute top-3 left-3">{project.sticker}</Sticker>
      </div>

      <div className="flex flex-auto flex-col gap-3 p-5">
        <Eyebrow>{project.kind}</Eyebrow>
        <h3 className="m-0 font-display text-2xl leading-tight font-bold">{project.name}</h3>
        <p className="m-0 text-[15px] leading-[1.55] text-ink-2">{project.summary}</p>
        <p className="m-0 font-mono text-xs text-coral-deep">{project.proof}</p>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4 border-t-2 border-dashed border-ink/25 pt-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center font-display text-base text-coral-deep"
          >
            live demo ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function Libraries() {
  return (
    <Window
      title="libraries/"
      accent="mustard"
      className="reveal mt-4"
      bodyClassName="flex flex-col gap-6 p-[clamp(20px,3.5vw,40px)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 font-display text-2xl font-bold">{libraries.title}</h3>
        <Eyebrow>{libraries.lede}</Eyebrow>
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {libraries.items.map((lib) => (
          <li key={lib.name}>
            <a
              href={lib.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-full flex-col gap-1 rounded-md border-[1.5px] border-ink bg-paper-2 px-4 py-3 no-underline shadow-btn-soft transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-btn`}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-lg font-bold">{lib.name}</span>
                <span className="font-mono text-xs text-mute">{lib.size} · 0 deps</span>
              </span>
              <span className="text-sm text-ink-2">{lib.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </Window>
  );
}
