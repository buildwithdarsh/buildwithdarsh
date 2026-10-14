"use client";

import { useActionState, useEffect, useRef } from "react";
import { requestDiagnostic, type FormState } from "@/app/actions";
import { builders, diagnosticForm as copy, interests, site } from "@/lib/content";
import { Field, FormStatus, INTEREST_EVENT, SpamGuards, inputClass, submitClass } from "@/components/form-bits";
import { ButtonArrow, Check } from "@/components/ui";

const initial: FormState = { status: "idle" };

/** The free-diagnostic request: notifies Darsh and confirms to the founder via Resend. */
export function DiagnosticForm() {
  const [state, action, pending] = useActionState(requestDiagnostic, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select "Interested in" from a package button click, or from ?interest= on arrival.
  useEffect(() => {
    const select = (value: string | null) => {
      if (!value || !(interests as readonly string[]).includes(value)) return;
      const radio = formRef.current?.querySelector<HTMLInputElement>(
        `input[name="interest"][value="${CSS.escape(value)}"]`,
      );
      if (radio) radio.checked = true;
    };
    select(new URLSearchParams(window.location.search).get("interest"));
    const onPick = (e: Event) => select((e as CustomEvent<string>).detail);
    window.addEventListener(INTEREST_EVENT, onPick);
    return () => window.removeEventListener(INTEREST_EVENT, onPick);
  }, []);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex w-full max-w-[640px] flex-col items-center gap-4 rounded-[10px] border-2 border-ink bg-paper p-8 text-center shadow-card"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full border-2 border-ink bg-teal shadow-chip">
          <Check size={26} strokeWidth={2.8} />
        </span>
        <p className="m-0 font-display text-2xl font-bold">Request received.</p>
        <p className="m-0 text-lg leading-relaxed text-ink-2">{state.message}</p>
        <p className="m-0 font-mono text-xs text-mute">
          Anything to add? Reply to the confirmation, or write to{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline decoration-dashed underline-offset-4">
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const a11y = (name: string) =>
    err[name] ? { "aria-invalid": true as const, "aria-describedby": `dx-${name}-error` } : {};

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="relative grid w-full max-w-[720px] grid-cols-1 gap-4 rounded-[10px] border-2 border-ink bg-paper p-5 text-left shadow-card sm:grid-cols-2 sm:p-7"
    >
      <SpamGuards />

      <Field id="dx-name" label={copy.name.label} error={err.name}>
        <input
          id="dx-name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          placeholder={copy.name.placeholder}
          defaultValue={v.name}
          className={inputClass}
          {...a11y("name")}
        />
      </Field>

      <Field id="dx-email" label={copy.email.label} error={err.email}>
        <input
          id="dx-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={copy.email.placeholder}
          defaultValue={v.email}
          className={inputClass}
          {...a11y("email")}
        />
      </Field>

      <Field id="dx-appUrl" label={copy.appUrl.label} error={err.appUrl}>
        <input
          id="dx-appUrl"
          name="appUrl"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          maxLength={300}
          placeholder={copy.appUrl.placeholder}
          defaultValue={v.appUrl}
          className={inputClass}
          {...a11y("appUrl")}
        />
      </Field>

      <Field id="dx-builder" label={copy.builder.label} error={err.builder}>
        <select
          // Remount on each result: a <select> ignores a changed defaultValue, so
          // without this the post-action form reset would drop the visitor's pick.
          key={`builder-${v.builder ?? ""}`}
          id="dx-builder"
          name="builder"
          required
          defaultValue={v.builder || ""}
          className={`${inputClass} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='14'%20height='14'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%231a1a1a'%20stroke-width='2.5'%20stroke-linecap='round'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[position:right_14px_center] bg-no-repeat pr-10`}
          {...a11y("builder")}
        >
          <option value="" disabled>
            Pick one…
          </option>
          {builders.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      <fieldset
        // Remount on each result so the post-action form reset keeps the visitor's pick.
        key={`interest-${v.interest ?? ""}`}
        className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0 sm:col-span-2"
      >
        <legend className="mb-1.5 p-0 font-display text-base font-bold text-ink">{copy.interest.label}</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((option) => (
            <label
              key={option}
              className="cursor-pointer rounded-full border border-ink bg-paper px-3.5 py-1.5 font-display text-sm transition-[background-color,box-shadow,translate] duration-150 select-none hover:-translate-y-px hover:shadow-chip has-[:checked]:bg-coral has-[:checked]:shadow-chip has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-coral-deep has-[:focus-visible]:outline-dashed"
            >
              <input
                type="radio"
                name="interest"
                value={option}
                defaultChecked={(v.interest || interests[0]) === option}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="dx-worry" label={copy.worry.label} hint={copy.worry.hint} error={err.worry} className="sm:col-span-2">
        <textarea
          id="dx-worry"
          name="worry"
          rows={3}
          maxLength={1500}
          placeholder={copy.worry.placeholder}
          defaultValue={v.worry}
          className={`${inputClass} min-h-24 resize-y py-3 leading-relaxed`}
          {...a11y("worry")}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2">
        {state.status === "error" ? <FormStatus tone="error">{state.message}</FormStatus> : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="submit" disabled={pending} className={`group ${submitClass} text-lg`}>
            {pending ? copy.pending : copy.submit}
            {pending ? null : <ButtonArrow />}
          </button>
          <span className="font-mono text-xs text-mute">{copy.promise}</span>
        </div>
      </div>
    </form>
  );
}
