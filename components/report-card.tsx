"use client";

import { useState, type ReactNode } from "react";
import { report, type Severity } from "@/lib/content";
import { Window } from "@/components/ui";

const sevStamp: Record<Severity, string> = {
  CRITICAL: "bg-coral",
  HIGH: "bg-mustard",
  MEDIUM: "bg-paper-2",
};

type View = "before" | "after";

export function ReportCard() {
  const [view, setView] = useState<View>("before");
  const after = view === "after";

  return (
    <Window
      title={report.file}
      accent={after ? "teal" : "coral"}
      className="w-full"
      bodyClassName="flex flex-col gap-4 p-5 font-mono"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-mute">{report.note}</span>
        <div role="group" aria-label="Report view" className="inline-flex gap-2">
          <Toggle pressed={!after} onClick={() => setView("before")}>
            before
          </Toggle>
          <Toggle pressed={after} onClick={() => setView("after")}>
            after sprint
          </Toggle>
        </div>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[13.5px] leading-[1.45]" aria-live="polite">
        {report.issues.map((issue, i) => (
          <li
            key={issue.before}
            className="flex items-start gap-3 rounded-md border-[1.5px] border-dashed border-ink/50 bg-paper-2 px-3 py-2.5"
          >
            <span
              className={`flex-[0_0_78px] -rotate-1 rounded-[3px] border-[1.5px] border-ink px-1 py-px text-center text-[10.5px] tracking-[0.06em] text-ink transition-colors duration-200 ${
                after ? "bg-teal" : sevStamp[issue.sev]
              }`}
            >
              {after ? "FIXED" : issue.sev}
            </span>
            {/* Re-keyed on toggle so each row replays a short staggered swap-in */}
            <span
              key={view}
              className="text-ink motion-safe:animate-swap"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              {after ? issue.after : issue.before}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-between gap-2 border-t-2 border-dashed border-ink/40 pt-3.5 text-[13px]">
        <span className="text-ink-2">{after ? report.afterSummary : report.beforeSummary}</span>
        <span className={`font-display text-base font-bold ${
            after ? "text-ink underline decoration-teal decoration-[3px] underline-offset-4" : "text-coral-deep"
          }`}
        >
          {after ? report.afterVerdict : report.beforeVerdict}
        </span>
      </div>
    </Window>
  );
}

function Toggle({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-9 cursor-pointer rounded-full border border-ink px-3.5 font-display text-sm transition-[background-color,box-shadow,translate] duration-150 ${
        pressed ? "bg-coral shadow-chip" : "bg-paper hover:-translate-y-px hover:shadow-chip"
      }`}
    >
      {children}
    </button>
  );
}
