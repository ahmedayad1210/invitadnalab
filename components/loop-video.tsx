"use client";

import { useEffect, useRef } from "react";
import type { DnaVideo } from "@/lib/imagery";

/**
 * A silent, decorative loop. It plays only while on screen, so the file is
 * fetched when a visitor scrolls to it rather than with the page, and it
 * stays on its poster for visitors who ask for reduced motion.
 */
export function LoopVideo({
  video,
  className = "",
  position,
}: {
  video: DnaVideo;
  className?: string;
  position?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Browsers only autoplay muted media; set the property as well as the
    // attribute, since React does not always reflect `muted` to the DOM.
    el.muted = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !still.matches) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={video.poster}
      width={video.width}
      height={video.height}
      aria-hidden
      className={className}
      style={{ objectPosition: position }}
    >
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
