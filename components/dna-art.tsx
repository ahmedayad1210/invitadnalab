import type { DnaTone } from "@/lib/reports";

/**
 * Invita DNA Lab vector art — original illustrations built from the brand
 * palette, used alongside Invita's own imagery (lib/imagery.ts). Colours
 * resolve from the `.invita` scope tokens in app/globals.css.
 */

/** Solid card colour + readable text colour for each tone. */
export const DNA_TONE_CLASS: Record<DnaTone, string> = {
  night: "bg-[var(--iv-night)] text-[var(--iv-cream)]",
  navy: "bg-[var(--iv-navy)] text-[var(--iv-cream)]",
  gold: "bg-[var(--iv-gold)] text-[var(--iv-navy)]",
  sand: "bg-[var(--iv-sand)] text-[var(--iv-navy)]",
  sky: "bg-[var(--iv-sky)] text-[var(--iv-navy)]",
};

/** Accent stroke used for gauges / highlights on each tone's card. */
export const DNA_TONE_ACCENT: Record<DnaTone, string> = {
  night: "var(--iv-gold)",
  navy: "var(--iv-gold)",
  gold: "var(--iv-navy)",
  sand: "var(--iv-gold-ink)",
  sky: "var(--iv-navy)",
};

/** Deterministic PRNG so server and client render identical art. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BASES = ["A", "C", "G", "T"] as const;
const BASE_FILL: Record<(typeof BASES)[number], string> = {
  A: "var(--iv-gold)",
  C: "var(--iv-sky)",
  G: "var(--iv-cream)",
  T: "var(--iv-sky-deep)",
};

/**
 * Sequencing-read field: staggered rows of short "reads" made of base ticks,
 * aligned to a reference, with one variant column lit in gold — a visual
 * shorthand for whole genome sequencing.
 */
export function GenomeField({ className = "" }: { className?: string }) {
  const rand = mulberry32(20261026);
  const cols = 44;
  const rows = 15;
  const cell = 12;
  const gap = 3;
  const variantCol = 27;
  const reference = Array.from({ length: cols }, () => BASES[Math.floor(rand() * 4)]);
  const width = cols * (cell + gap);
  const height = (rows + 2) * (cell + gap * 2) + 10;

  const readRows = Array.from({ length: rows }, (_, r) => {
    const start = Math.floor(rand() * 12);
    const len = 18 + Math.floor(rand() * 20);
    return { r, start, end: Math.min(cols, start + len) };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden fill="none">
      {/* reference strand */}
      {reference.map((b, c) => (
        <rect
          key={`ref-${c}`}
          x={c * (cell + gap)}
          y={0}
          width={cell}
          height={cell}
          rx={3}
          style={{ fill: BASE_FILL[b] }}
          opacity={0.95}
        />
      ))}
      <line
        x1={0}
        x2={width}
        y1={cell + gap * 2.5}
        y2={cell + gap * 2.5}
        strokeDasharray="2 6"
        strokeWidth={1}
        style={{ stroke: "var(--iv-gold)" }}
        opacity={0.5}
      />
      {/* aligned reads */}
      {readRows.map(({ r, start, end }) => {
        const y = (r + 1.6) * (cell + gap * 2);
        return Array.from({ length: end - start }, (_, i) => {
          const c = start + i;
          const isVariant = c === variantCol && r % 2 === 0;
          const base = isVariant ? "A" : reference[c];
          return (
            <rect
              key={`${r}-${c}`}
              x={c * (cell + gap)}
              y={y}
              width={cell}
              height={cell * 0.62}
              rx={2}
              style={{ fill: isVariant ? "var(--iv-gold)" : BASE_FILL[base] }}
              opacity={isVariant ? 1 : 0.18 + ((r * 7 + c) % 5) * 0.06}
            />
          );
        });
      })}
      {/* variant highlight */}
      <rect
        className="iv-pulse"
        x={variantCol * (cell + gap) - 4}
        y={-4}
        width={cell + 8}
        height={height}
        rx={8}
        strokeWidth={1.5}
        style={{ stroke: "var(--iv-gold)", fill: "rgba(217,179,68,0.08)" }}
      />
    </svg>
  );
}

/**
 * Percentile gauge (270° arc). Purely illustrative — every use is labelled
 * as an example in the UI, and the value is also rendered as text.
 */
export function Gauge({
  value,
  label,
  accent = "var(--iv-gold)",
  track = "rgba(255,255,255,0.18)",
  size = 112,
  className = "",
}: {
  value: number;
  label: string;
  accent?: string;
  track?: string;
  size?: number;
  className?: string;
}) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const arc = circumference * 0.75;
  const filled = arc * Math.max(0, Math.min(100, value)) / 100;
  // The label sits in the arc's open gap at the bottom; small gauges are too
  // narrow for it, so they keep it for screen readers only.
  const showLabel = size >= 80;
  return (
    <div className={`relative grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-[225deg]" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${arc} ${circumference}`} style={{ stroke: track }} />
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${filled} ${circumference}`} style={{ stroke: accent }} />
      </svg>
      <span className="relative block text-2xl font-bold leading-none tabular-nums">{value}</span>
      <span
        className={
          showLabel
            ? "absolute inset-x-0 bottom-[4%] text-center text-[8px] font-semibold uppercase leading-none tracking-[0.14em] opacity-70"
            : "sr-only"
        }
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Coverage strip — a row of genome "letters". `coverage` is the share of
 * ticks lit; a low value scatters a few lit ticks (panel), 1 lights them all
 * (whole genome).
 */
export function CoverageStrip({
  coverage,
  seed,
  className = "",
}: {
  coverage: number;
  seed: number;
  className?: string;
}) {
  const rand = mulberry32(seed);
  const n = 96;
  return (
    <svg viewBox={`0 0 ${n * 6} 28`} preserveAspectRatio="none" className={className} aria-hidden>
      {Array.from({ length: n }, (_, i) => {
        const lit = coverage >= 1 || rand() < coverage;
        const h = 10 + ((i * 37) % 18);
        return (
          <rect
            key={i}
            x={i * 6}
            y={(28 - h) / 2}
            width={3.2}
            height={h}
            rx={1.6}
            style={{ fill: lit ? "var(--iv-gold)" : "var(--iv-line)" }}
            opacity={lit ? 1 : 0.7}
          />
        );
      })}
    </svg>
  );
}

/**
 * Double helix drawn from two phase-shifted sine waves; rungs fade with depth.
 * `idPrefix` keeps gradient ids unique when several helices share a page.
 */
export function HelixArt({
  className = "",
  idPrefix = "dna",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const strandA = `${idPrefix}-strand-a`;
  const strandB = `${idPrefix}-strand-b`;
  const height = 520;
  const width = 220;
  const mid = width / 2;
  const amp = 78;
  const turns = 2.6;
  const steps = 64;
  const rungs = 26;

  const strand = (phase: number) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const y = (i / steps) * height;
      const x = mid + amp * Math.sin((i / steps) * turns * 2 * Math.PI + phase);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id={strandA} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--iv-gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--iv-cream)" }} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={strandB} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--iv-cream)" }} stopOpacity="0.85" />
          <stop offset="1" style={{ stopColor: "var(--iv-gold)" }} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {Array.from({ length: rungs }, (_, i) => {
        const t = (i + 0.5) / rungs;
        const y = t * height;
        const angle = t * turns * 2 * Math.PI;
        const x1 = mid + amp * Math.sin(angle);
        const x2 = mid + amp * Math.sin(angle + Math.PI);
        const depth = Math.abs(Math.cos(angle));
        return (
          <g key={i} opacity={0.2 + depth * 0.6}>
            <line x1={x1.toFixed(1)} y1={y.toFixed(1)} x2={x2.toFixed(1)} y2={y.toFixed(1)} strokeWidth={2.5} strokeLinecap="round" style={{ stroke: "var(--iv-cream)" }} />
            <circle cx={x1.toFixed(1)} cy={y.toFixed(1)} r={4} style={{ fill: "var(--iv-gold)" }} />
            <circle cx={x2.toFixed(1)} cy={y.toFixed(1)} r={4} style={{ fill: "var(--iv-cream)" }} />
          </g>
        );
      })}
      <path d={strand(0)} stroke={`url(#${strandA})`} strokeWidth={5} strokeLinecap="round" />
      <path d={strand(Math.PI)} stroke={`url(#${strandB})`} strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
}

/** Home-swab collection set — box, sample tube and consent card. */
export function KitArt({ className = "" }: { className?: string }) {
  const ink = { stroke: "var(--iv-navy)" };
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden fill="none">
      <ellipse cx="160" cy="214" rx="132" ry="12" opacity="0.1" style={{ fill: "var(--iv-navy)" }} />
      <path d="M40 92 160 60l120 32v96l-120 30-120-30z" strokeWidth="3" strokeLinejoin="round" style={{ ...ink, fill: "var(--iv-paper)" }} />
      <path d="M40 92 160 124v94L40 188z" style={{ fill: "var(--iv-sand)" }} />
      <path d="M40 92l120 32 120-32" strokeWidth="3" strokeLinejoin="round" style={ink} />
      <path d="M160 124v94" strokeWidth="3" style={ink} />
      <text x="214" y="160" fontSize="15" fontWeight="700" letterSpacing="1" style={{ fill: "var(--iv-navy)" }} transform="skewY(-14) translate(0 52)">
        invita
      </text>
      <circle cx="270" cy="158" r="2.6" style={{ fill: "var(--iv-gold)" }} transform="skewY(-14) translate(0 52)" />
      <rect x="66" y="22" width="78" height="96" rx="8" strokeWidth="2.5" transform="rotate(-10 105 70)" style={{ stroke: "var(--iv-gold)", fill: "#fff" }} />
      <g strokeWidth="2.5" strokeLinecap="round" transform="rotate(-10 105 70)" style={{ stroke: "var(--iv-gold)" }}>
        <path d="M80 44h48M80 58h38M80 72h44M80 86h30" />
      </g>
      <g transform="rotate(14 250 70)">
        <rect x="236" y="14" width="30" height="20" rx="5" style={{ fill: "var(--iv-navy)" }} />
        <path d="M240 34h22v76a11 11 0 0 1-22 0z" strokeWidth="3" style={{ ...ink, fill: "#fff" }} />
        <path d="M242 78h18v32a9 9 0 0 1-18 0z" opacity="0.8" style={{ fill: "var(--iv-gold)" }} />
      </g>
    </svg>
  );
}
