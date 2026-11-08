import type { ElementType } from "react";

/**
 * Shared pieces of the clinical layer: the two-tone slab headline with its
 * short rule, the long arrow, and the notched button styles.
 */

// Arabic letters reach further below the line than Latin, so RTL headlines
// get more leading to keep descenders off the rule and the next line.
const SIZES = {
  xl: "text-[clamp(2.4rem,1.4rem+3.8vw,4.25rem)] leading-[1.06] rtl:leading-[1.3]",
  lg: "text-[clamp(1.9rem,1.25rem+2.4vw,3rem)] leading-[1.12] rtl:leading-[1.35]",
  md: "text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-[1.15] rtl:leading-[1.4]",
} as const;

export function SlabHeading({
  as: Tag = "h2",
  lead,
  accent,
  tail,
  size = "lg",
  center = false,
  tone = "light",
  bar = true,
  className = "",
  id,
}: {
  as?: ElementType;
  lead?: string;
  accent?: string;
  tail?: string;
  size?: keyof typeof SIZES;
  center?: boolean;
  tone?: "light" | "dark";
  bar?: boolean;
  className?: string;
  id?: string;
}) {
  const ink = tone === "dark" ? "text-white" : "text-[var(--iv-navy)]";
  const gold = tone === "dark" ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-deep)]";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <Tag id={id} className={`iv-slab text-balance ${SIZES[size]} ${ink}`}>
        {lead}
        {accent ? <span className={gold}>{accent}</span> : null}
        {tail}
      </Tag>
      {bar ? <span className={`iv-bar mt-5 ${center ? "mx-auto" : ""}`} aria-hidden /> : null}
    </div>
  );
}

/** Long arrow, flipped for right-to-left pages. */
export function ArrowLong({ className = "h-3 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={`${className} rtl:-scale-x-100`}>
      <path d="M0 6h26M21 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The clipped corner would also clip an outline, so focus is an inset ring.
// Size and colour come in separate tables so no caller has to override a
// class: two Tailwind utilities for one property win by stylesheet order,
// not by the order they are written in.
const NOTCH_SIZE = {
  md: "h-12 px-6 text-[13px] ltr:tracking-[0.12em]",
  sm: "h-10 px-4 text-xs ltr:tracking-[0.08em]",
} as const;

const NOTCH_TONE = {
  gold: "bg-[var(--iv-gold)] text-[var(--iv-navy)] hover:bg-[var(--iv-gold-soft)] focus-visible:shadow-[inset_0_0_0_3px_var(--iv-navy)]",
  navy: "bg-[var(--iv-navy)] text-white hover:bg-[var(--iv-night)] focus-visible:shadow-[inset_0_0_0_3px_var(--iv-gold)]",
  line: "bg-white text-[var(--iv-navy)] shadow-[inset_0_0_0_1px_var(--iv-line)] hover:bg-[var(--iv-mist)] focus-visible:shadow-[inset_0_0_0_3px_var(--iv-navy)]",
  ghost: "bg-transparent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] hover:bg-white/10 focus-visible:shadow-[inset_0_0_0_3px_var(--iv-gold)]",
} as const;

export function notch(tone: keyof typeof NOTCH_TONE, size: keyof typeof NOTCH_SIZE = "md") {
  return `iv-notch inline-flex items-center justify-center gap-3 font-semibold transition ltr:uppercase focus-visible:outline-none ${NOTCH_SIZE[size]} ${NOTCH_TONE[tone]}`;
}

/** Small caption above a headline: tracked capitals in Latin, plain in Arabic. */
export const CAPTION = "text-xs font-semibold text-[var(--iv-gold-ink)] ltr:uppercase ltr:tracking-[0.22em]";
