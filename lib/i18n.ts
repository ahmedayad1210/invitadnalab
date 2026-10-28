/** Two locales, Arabic first. Every route is prefixed: `/ar/...`, `/en/...`. */
export const LOCALES = ["ar", "en"] as const;
export const DEFAULT_LOCALE: Locale = "ar";

export type Locale = (typeof LOCALES)[number];
export type Localized = { en: string; ar: string };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Coerces a route param to a supported locale (defaults to Arabic). */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Prefixes an in-site path with the locale: `/book` → `/ar/book`,
 * `/#plans` → `/ar#plans`. Hash-only and absolute URLs pass through.
 */
export function localeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Same path in the other locale: `/ar/health` → `/en/health`. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
    return parts.join("/");
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-IQ" : "en-IQ", {
    numberingSystem: locale === "ar" ? "arab" : "latn",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrency(value: number, locale: Locale): string {
  const formatted = formatNumber(value, locale);
  if (locale === "ar") {
    return `‏${formatted} د.ع.‏`;
  }
  return `IQD ${formatted}`;
}
