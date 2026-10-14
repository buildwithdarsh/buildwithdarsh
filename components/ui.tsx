import type { ComponentProps, ReactNode } from "react";

/* ---------- Icons (inline, stroke = currentColor) ---------- */

type IconProps = { size?: number; strokeWidth?: number; className?: string };

export function ArrowRight({ size = 18, strokeWidth = 2.2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Slightly wobbly, hand-drawn check. */
export function Check({ size = 18, strokeWidth = 2.6, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.5 12.5c1.6 1.2 3 2.7 4.2 4.6C11.5 11.6 15 7.6 19.8 5" />
    </svg>
  );
}

/** Hand-drawn cross. */
export function Cross({ size = 16, strokeWidth = 2.6, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 6.5c4 3.6 8 7.4 12.2 11" />
      <path d="M17.6 5.8C13.7 9.6 9.8 13.6 6.2 18" />
    </svg>
  );
}

export function ChevronDown({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ---------- Surfaces ---------- */

/** Paper card with an ink outline (no shadow — pair with a shadow-* utility). */
export const cardFrame = "rounded-[10px] border-2 border-ink bg-paper";

/** Paper card with an ink outline and a hard offset shadow. */
export const card = `${cardFrame} shadow-card`;

/** Hover: the card lifts toward the light and its shadow grows. Uses `translate`, so it composes with `.reveal`. */
export const hoverLift =
  "transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-hover";

/** Mustard · teal · coral — the withdarsh window dots. */
export function TrafficDots({ size = "size-3" }: { size?: string }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-1.5">
      <span className={`${size} rounded-full border-[1.5px] border-ink bg-mustard`} />
      <span className={`${size} rounded-full border-[1.5px] border-ink bg-teal`} />
      <span className={`${size} rounded-full border-[1.5px] border-ink bg-coral`} />
    </span>
  );
}

const windowAccent = {
  mustard: "before:bg-mustard",
  coral: "before:bg-coral",
  teal: "before:bg-teal",
  none: "before:hidden",
} as const;

/**
 * An app "window" — the signature withdarsh frame: chrome title bar with
 * three dots, a file-name title, a dashed rule, and a coloured top edge.
 */
export function Window({
  title,
  accent = "none",
  className = "",
  bodyClassName = "",
  children,
  ...props
}: Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode;
  accent?: keyof typeof windowAccent;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-[10px] border-2 border-ink bg-paper shadow-window before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-[3px] ${windowAccent[accent]} ${className}`}
      {...props}
    >
      <div className="relative flex items-center border-b-2 border-dashed border-ink bg-chrome px-3 py-2">
        <TrafficDots />
        <span className="absolute inset-x-16 truncate text-center font-display text-base font-bold">
          {title}
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/** 1160px column with 24px gutters — the page's single grid. */
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-[1160px] px-6 ${className}`} {...props} />;
}

/* ---------- Type ---------- */

/** Typewriter-style meta label ("02 / one sprint"). */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`m-0 font-mono text-xs tracking-[0.06em] text-mute ${className}`}>{children}</p>
  );
}

/** Section label + heading + optional lede. */
export function SectionIntro({
  id,
  label,
  title,
  lede,
}: {
  id: string;
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="reveal flex max-w-[680px] flex-col gap-2.5">
      {label ? <Eyebrow>{label}</Eyebrow> : null}
      <h2 id={id} className="m-0 font-display text-3xl leading-[1.05] font-bold md:text-4xl">
        {title}
      </h2>
      {lede ? <p className="m-0 text-lg leading-[1.6] text-ink-2">{lede}</p> : null}
    </div>
  );
}

/* ---------- Small pieces ---------- */

const stickerColors = {
  mustard: "bg-mustard",
  coral: "bg-coral",
  teal: "bg-teal",
  paper: "bg-paper",
} as const;

/** A slightly crooked label slapped on a card ("real client build", "core offer"). */
export function Sticker({
  children,
  color = "mustard",
  className = "",
}: {
  children: ReactNode;
  color?: keyof typeof stickerColors;
  className?: string;
}) {
  return (
    <span
      className={`inline-block -rotate-2 rounded-[4px] border-[1.5px] border-ink px-2 py-0.5 font-mono text-xs text-ink shadow-chip ${stickerColors[color]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Outlined pill with a coral dot, used above hero and final CTA. */
export function DotPill({
  children,
  pulse = false,
  className = "",
}: {
  children: ReactNode;
  /** Adds a soft "live" ping around the dot. */
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-mono text-xs text-ink-2 shadow-chip ${className}`}
    >
      <span aria-hidden="true" className="relative inline-flex size-2">
        {pulse ? (
          <span className="absolute inset-0 rounded-full bg-coral opacity-70 motion-safe:animate-ping" />
        ) : null}
        <span className="relative size-2 rounded-full bg-coral-deep" />
      </span>
      {children}
    </span>
  );
}

/** Small outlined tag — stack names, chips. */
export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-[4px] border border-dashed border-ink/60 bg-paper-2 px-2 py-0.5 font-mono text-xs text-ink-2 ${className}`}
    >
      {children}
    </span>
  );
}

/** Check bullet in coral. */
export function CheckDot() {
  return <Check size={20} className="mt-0.5 flex-[0_0_20px] text-coral-deep" />;
}

/* ---------- Buttons ---------- */

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "lg" | "md";

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-md border-ink font-display no-underline transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "border-2 bg-coral font-bold text-ink shadow-btn hover:shadow-btn-hover",
  secondary: "border-[1.5px] bg-paper font-semibold text-ink shadow-btn-soft hover:shadow-btn",
};

const buttonSizes: Record<ButtonSize, string> = {
  lg: "min-h-[52px] px-6 text-lg",
  md: "min-h-12 px-4 text-base",
};

/** Trailing arrow that nudges right when its button is hovered. */
export function ButtonArrow() {
  return <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />;
}

export function ButtonLink({
  variant = "primary",
  size = "lg",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <a
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}
