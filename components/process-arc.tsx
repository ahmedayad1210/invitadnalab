import type { ComponentType } from "react";

type Step = { title: string; body: string; Icon: ComponentType<{ className?: string }> };

/**
 * The route a sample takes, as a row of stations joined by dashed arcs that
 * alternate above and below the line. On narrow screens the row becomes a
 * column joined by one dashed rule.
 */
export function ProcessArc({ steps, numerals }: { steps: Step[]; numerals: string[] }) {
  const last = steps.length - 1;
  return (
    <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
      {steps.map(({ title, body, Icon }, i) => (
        <li key={title} className="relative flex gap-5 lg:block">
          {/* Mobile and tablet: dashed rule down to the next station. */}
          {i < last ? (
            <span
              className="absolute start-7 top-14 -bottom-8 border-s-2 border-dashed border-[var(--iv-sky-deep)] lg:hidden"
              aria-hidden
            />
          ) : null}
          <div className="relative flex shrink-0 items-center lg:h-36">
            <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-white text-[var(--iv-navy)] shadow-[0_10px_24px_-14px_rgba(15,35,65,0.55)] ring-1 ring-[var(--iv-line)]">
              <Icon className="h-6 w-6" />
            </span>
            {i < last ? <Arc up={i % 2 === 0} /> : null}
          </div>
          <div className="pt-1 lg:pt-0">
            <p className="text-sm font-semibold tabular-nums text-[var(--iv-gold-ink)]">{numerals[i]}</p>
            <h3 className="mt-1 text-lg font-semibold leading-snug text-[var(--iv-navy)]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--iv-muted)]">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Dashed half-ellipse from this station's centre to the next one's. */
function Arc({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
      aria-hidden
      className={`absolute start-7 hidden h-1/2 w-[calc(100%+1.5rem)] text-[var(--iv-sky-deep)] lg:block ${up ? "top-0" : "top-1/2"}`}
    >
      <path
        d={up ? "M0 50 C 18 0, 82 0, 100 50" : "M0 0 C 18 50, 82 50, 100 0"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="5 6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
