"use client";

import NextLink from "next/link";
import { useParams, usePathname } from "next/navigation";
import { switchLocalePath, toLocale } from "@/lib/i18n";

/** Compact EN / ع switch styled for the Invita shell; keeps the current page. */
export function InvitaLocaleToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const params = useParams<{ locale?: string }>();
  const pathname = usePathname() || "/";
  const locale = toLocale(params?.locale ?? "");
  const next = locale === "ar" ? "en" : "ar";

  return (
    <NextLink
      href={switchLocalePath(pathname, next)}
      hrefLang={next}
      aria-label={next === "ar" ? "التبديل إلى العربية" : "Switch to English"}
      className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
        tone === "dark"
          ? "text-[var(--iv-cream)] ring-1 ring-white/25 hover:bg-white/10"
          : "text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)] hover:bg-[var(--iv-cream)]"
      }`}
    >
      {next === "ar" ? "ع" : "EN"}
    </NextLink>
  );
}
