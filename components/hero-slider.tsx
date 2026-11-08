"use client";

import { useState } from "react";
import { Link } from "@/components/locale-link";
import { ArrowLong, notch } from "@/components/brand-ui";
import { KitIcon, WhatsAppGlyph } from "@/components/dna-icons";

export type HeroSlide = {
  lead: string;
  accent: string;
  tail: string;
  body: string;
  cta: { label: string; href: string; icon?: "whatsapp" | "kit" };
};

/**
 * The hero's message, one slide at a time, stepped with the round buttons
 * beside the counter. Nothing advances on its own: each slide is a short
 * read, and a moving headline is hard to finish.
 */
export function HeroSlider({
  slides,
  locale,
  labels,
}: {
  slides: HeroSlide[];
  locale: "ar" | "en";
  labels: { region: string; prev: string; next: string; slide: string };
}) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const total = slides.length;
  const pad = (n: number) =>
    locale === "ar" ? n.toLocaleString("ar-IQ", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0");
  const go = (step: number) => setIndex((i) => (i + step + total) % total);
  const external = slide.cta.href.startsWith("http");

  return (
    <section aria-roledescription="carousel" aria-label={labels.region}>
      <p className="iv-slab text-[var(--iv-gold-deep)]" aria-hidden>
        <span className="text-4xl font-semibold tabular-nums">{pad(index + 1)}</span>
        <span className="text-lg font-semibold text-[var(--iv-muted)]">/{pad(total)}</span>
      </p>
      <div
        key={index}
        className="iv-fade mt-6 border-s-2 border-[var(--iv-gold)] ps-6 sm:ps-8"
        aria-roledescription="slide"
        aria-label={`${labels.slide} ${index + 1} / ${total}`}
        aria-live="polite"
      >
        <h1 className="iv-slab text-balance text-[clamp(2.4rem,1.4rem+3.8vw,4.25rem)] leading-[1.06] text-[var(--iv-navy)]">
          {slide.lead}
          <span className="text-[var(--iv-gold-deep)]">{slide.accent}</span>
          {slide.tail}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--iv-muted)] sm:text-lg">{slide.body}</p>
        <div className="mt-8">
          {external ? (
            <a href={slide.cta.href} target="_blank" rel="noopener noreferrer" className={notch("navy")}>
              {slide.cta.icon === "whatsapp" ? <WhatsAppGlyph /> : null}
              {slide.cta.label}
              <ArrowLong />
            </a>
          ) : (
            <Link href={slide.cta.href} className={notch("navy")}>
              {slide.cta.icon === "kit" ? <KitIcon className="h-4 w-4" /> : null}
              {slide.cta.label}
              <ArrowLong />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={labels.prev}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-[var(--iv-navy)] shadow-[0_6px_18px_-8px_rgba(15,35,65,0.45)] ring-1 ring-[var(--iv-line)] transition hover:bg-[var(--iv-mist)]"
        >
          <ArrowLong className="h-3 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={labels.next}
          className="grid h-11 w-11 place-items-center rounded-full bg-[var(--iv-navy)] text-[var(--iv-gold)] shadow-[0_8px_20px_-8px_rgba(15,35,65,0.6)] transition hover:bg-[var(--iv-night)]"
        >
          <ArrowLong className="h-3 w-5" />
        </button>
        <ol className="ms-3 flex gap-1.5" aria-hidden>
          {slides.map((s, i) => (
            <li
              key={s.accent}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[var(--iv-gold)]" : "w-1.5 bg-[var(--iv-line)]"}`}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
