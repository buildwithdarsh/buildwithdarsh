"use client";

import type { ComponentProps } from "react";
import type { Interest } from "@/lib/content";
import { INTEREST_EVENT } from "@/components/form-bits";
import { ButtonLink } from "@/components/ui";

/** Jumps to the diagnostic form and pre-selects this package as "Interested in". */
export function PackageCta({
  interest,
  ...props
}: Omit<ComponentProps<typeof ButtonLink>, "href" | "onClick"> & { interest: Interest }) {
  return (
    <ButtonLink
      href="#diagnostic"
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }))}
      {...props}
    />
  );
}
