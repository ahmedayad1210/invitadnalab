import type { DnaReportSlug } from "@/lib/reports";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Line icon per DNA report — original Invita set, inherits `currentColor`. */
export function DnaReportIcon({
  slug,
  className = "h-6 w-6",
}: IconProps & { slug: DnaReportSlug }) {
  switch (slug) {
    case "ancestry":
      return (
        <svg {...base} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
      );
    case "health":
      return (
        <svg {...base} className={className}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          <path d="M8 11h2l1-2 2 4 1-2h2" />
        </svg>
      );
    case "nutrition":
      return (
        <svg {...base} className={className}>
          <path d="M12 8c-1.5-1.3-4-1.5-5.6.1C4.6 10 5 14 7 17c1.2 1.8 2.6 3 4 2.6.5-.1.7-.3 1-.3s.5.2 1 .3c1.4.4 2.8-.8 4-2.6 2-3 2.4-7 .6-8.9C16 6.5 13.5 6.7 12 8z" />
          <path d="M12 8c0-2 1-3.5 3-4" />
        </svg>
      );
    case "pharma":
      return (
        <svg {...base} className={className}>
          <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-45 12 12)" />
          <path d="m9.5 9.5 5 5" />
        </svg>
      );
    case "sports":
      return (
        <svg {...base} className={className}>
          <path d="M6.5 6.5v11" />
          <path d="M17.5 6.5v11" />
          <path d="M4 9v6" />
          <path d="M20 9v6" />
          <path d="M6.5 12h11" />
        </svg>
      );
    case "skin":
      return (
        <svg {...base} className={className}>
          <path d="M12 3s5.5 6.2 5.5 10.2A5.5 5.5 0 0 1 6.5 13.2C6.5 9.2 12 3 12 3z" />
          <path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2" />
        </svg>
      );
    case "personality":
      return (
        <svg {...base} className={className}>
          <path d="M9 21v-3.2A6.5 6.5 0 1 1 18.5 12l1.3 2.6h-1.8V17a2 2 0 0 1-2 2H14v2" />
          <path d="m11.6 7.5.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
        </svg>
      );
    case "all-in-one":
      return <HelixIcon className={className} />;
  }
}

export function HelixIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3c0 4.5 10 7.5 10 12s-3 6-3 6" />
      <path d="M17 3c0 4.5-10 7.5-10 12s3 6 3 6" />
      <path d="M8.5 6.5h7" />
      <path d="M10 11.5h4" />
      <path d="M8.5 17.5h7" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function KitIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 8 12 4l8.5 4v8L12 20l-8.5-4z" />
      <path d="M3.5 8 12 12l8.5-4" />
      <path d="M12 12v8" />
    </svg>
  );
}

export function ChatIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </svg>
  );
}

export function UploadIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

/** Petri dish with cells — sample collection. */
export function CellIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="14.2" cy="9" rx="2.6" ry="2" />
      <circle cx="8.6" cy="13.6" r="1.4" />
      <path d="M13.5 15.5c1 .2 1.8-.4 2.2-1.4" />
      <path d="M8 8.4h.01M11.4 17.2h.01" />
    </svg>
  );
}

/** One node branching into three — results branching into answers. */
export function NetworkIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="6" r="3" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="12" cy="18.6" r="1.6" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.2 8.4 6.4 16.2M12 9v8M13.8 8.4l3.8 7.8" />
    </svg>
  );
}

export function InstagramGlyph({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.8h.01" />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function WhatsAppGlyph({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12z" />
      <path d="M9.2 8.6c.2-.4.6-.4.9-.4.3 0 .5.5.7 1 .1.3 0 .6-.2.8l-.3.4c.5 1 1.3 1.8 2.3 2.3l.4-.3c.2-.2.5-.3.8-.2.5.2 1 .4 1 .7 0 .3 0 .7-.4.9-.7.5-1.6.5-2.5.1a7 7 0 0 1-3.2-3.2c-.4-.9-.4-1.8.1-2.5z" />
    </svg>
  );
}
