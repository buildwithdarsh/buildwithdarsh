"use client";

import { useActionState } from "react";
import { requestChecklist, type FormState } from "@/app/actions";
import { checklist } from "@/lib/content";
import { FormStatus, SpamGuards, inputClass, submitClass } from "@/components/form-bits";
import { Check } from "@/components/ui";

const initial: FormState = { status: "idle" };

/** Emails the full checklist via Resend (see app/actions.ts). */
export function ChecklistForm() {
  const [state, action, pending] = useActionState(requestChecklist, initial);

  if (state.status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-md border-2 border-ink bg-paper-2 p-4 shadow-btn-soft" role="status">
        <span className="inline-flex size-8 flex-none items-center justify-center rounded-full border-2 border-ink bg-teal">
          <Check size={18} />
        </span>
        <p className="m-0 text-base leading-relaxed text-ink">{state.message}</p>
      </div>
    );
  }

  const error = state.fieldErrors?.email;

  return (
    <form action={action} className="relative flex flex-col gap-2 pt-2" noValidate>
      <SpamGuards />
      <label htmlFor="checklist-email" className="font-display text-base font-bold text-ink">
        {checklist.emailLabel}
      </label>
      <div className="flex flex-wrap gap-2.5">
        <input
          id="checklist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={checklist.emailPlaceholder}
          defaultValue={state.values?.email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "checklist-email-error" : undefined}
          className={`flex-[1_1_220px] ${inputClass}`}
        />
        <button type="submit" disabled={pending} className={`flex-[0_0_auto] ${submitClass}`}>
          {pending ? "Sending…" : checklist.cta}
        </button>
      </div>
      {error ? (
        <p id="checklist-email-error" className="m-0 font-mono text-xs text-coral-deep">
          {error}
        </p>
      ) : null}
      {state.status === "error" && !error ? <FormStatus tone="error">{state.message}</FormStatus> : null}
    </form>
  );
}
