"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Fired by package buttons so the diagnostic form can pre-select what was clicked. */
export const INTEREST_EVENT = "diagnostic:interest";

/**
 * Invisible spam guards shared by the lead forms: a honeypot field humans never
 * see, and the time the form became interactive (bots submit instantly).
 */
export function SpamGuards() {
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  return (
    <>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}

export const inputClass =
  "min-h-[52px] w-full min-w-0 rounded-md border-[1.5px] border-ink bg-paper-2 px-4 font-sans text-base text-ink shadow-[inset_2px_2px_0_rgba(26,26,26,0.08)] placeholder:text-mute focus:bg-paper focus:outline-2 focus:outline-offset-2 focus:outline-coral-deep focus:outline-dashed aria-[invalid=true]:border-coral-deep aria-[invalid=true]:bg-coral-soft/30";

export const submitClass =
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-md border-2 border-ink bg-coral px-5 font-display text-base font-bold text-ink shadow-btn transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-btn-hover active:translate-0.5 active:shadow-none disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-0 disabled:hover:shadow-btn";

export function Field({
  id,
  label,
  hint,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="flex items-baseline gap-2 font-display text-base font-bold text-ink">
        {label}
        {hint ? <span className="font-mono text-xs font-normal text-mute">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="m-0 font-mono text-xs text-coral-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormStatus({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`m-0 rounded-md border-[1.5px] border-dashed px-3 py-2 font-mono text-xs leading-relaxed ${
        tone === "error" ? "border-coral-deep bg-coral-soft/30 text-ink" : "border-teal bg-teal/15 text-ink"
      }`}
    >
      {children}
    </p>
  );
}
