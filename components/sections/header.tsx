"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { TrafficDots } from "@/components/ui";

/** Sticky header in the withdarsh store style, with scroll-spy on section links. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    // A section counts as "current" while it crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
          else setActive((current) => (current === `#${entry.target.id}` ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b-2 border-dashed backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-ink/40 bg-paper/92 shadow-[0_4px_20px_-12px_rgba(26,26,26,0.4)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1160px] items-center justify-between gap-x-6 px-6 py-3.5"
      >
        <a href="#top" className="flex min-h-11 items-center gap-2.5 no-underline">
          <TrafficDots />
          <span className="font-display text-xl font-bold">{site.brand}</span>
          <span className="hidden font-mono text-xs font-bold text-coral-deep min-[420px]:inline">/ {site.section}</span>
        </a>

        <div className="flex items-center gap-x-1">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`hidden min-h-11 items-center rounded px-2.5 font-display text-[15px] no-underline transition-colors duration-200 hover:text-ink md:inline-flex ${
                  isActive ? "text-ink underline decoration-coral decoration-2 underline-offset-[6px]" : "text-mute"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={site.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded px-2.5 font-display text-[15px] text-mute no-underline transition-colors hover:text-ink lg:inline-flex"
          >
            portfolio ↗
          </a>
          <a
            href="#diagnostic"
            className="ml-2 inline-flex min-h-11 items-center rounded-md border-2 border-ink bg-coral px-3 font-display text-sm font-bold whitespace-nowrap sm:px-4 sm:text-[15px] text-ink no-underline shadow-btn transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-btn-hover active:translate-0.5 active:shadow-none"
          >
            Free diagnostic
          </a>
        </div>
      </nav>
    </header>
  );
}
