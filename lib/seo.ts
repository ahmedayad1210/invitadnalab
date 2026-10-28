import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

/**
 * Absolute origin for canonical URLs, hreflang, share images and the sitemap.
 * The site's home is invitadnalab.com; deploy previews and local builds
 * advertise it too, so a preview is never indexed as the canonical copy.
 * NEXT_PUBLIC_SITE_URL overrides it if the domain ever changes.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://invitadnalab.com").replace(/\/$/, "");

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Path after the locale, e.g. `/book`, or empty for the home page. */
  path?: string;
};

/** Per-page title and description with canonical + hreflang alternates. */
export function pageMetadata({ locale, title, description, path = "" }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        ar: `${SITE_URL}/ar${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/ar${path}`,
      },
    },
  };
}
