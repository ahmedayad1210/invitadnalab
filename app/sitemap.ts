import type { MetadataRoute } from "next";
import { DNA_REPORTS } from "@/lib/reports";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/book", ...DNA_REPORTS.map((r) => `/${r.slug}`)];
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
