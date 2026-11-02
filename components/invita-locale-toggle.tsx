"use client";

import NextLink from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { switchLocalePath, toLocale } from "@/lib/i18n";

/**
 * Compact EN / ع switch styled for the Invita shell. Keeps the current page,
 * and the section too: `usePathname()` has no hash, so a visitor on
 * `/ar#reports` would otherwise land at the top of `/en`.
 */
export function InvitaLocaleToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const params = useParams<{ locale?: string }>();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = toLocale(params?.locale ?? "");
  const next = locale === "ar" ? "en" : "ar";
  const href = switchLocalePath(pathname, next);

  return (
    <NextLink
      href={href}
      hrefLang={next}
      onClick={(event) => {
        const { hash } = window.location;
        if (!hash || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        router.push(`${href}${hash}`);
      }}
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
