import type { Metadata, Viewport } from "next";
import { Alexandria } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { InvitaFooter, InvitaHeader } from "@/components/invita-shell";
import "../globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
});

type LayoutProps = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0f2341" };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const isAr = (await params).locale === "ar";
  const name = isAr ? "مختبر Invita للحمض النووي" : "Invita DNA Lab";
  const description = isAr
    ? "من فحوصات اللوحات الجينية إلى تسلسل الجينوم الكامل — عيّنة منزلية واحدة وتقارير واضحة ومراجعة طبية خاصة."
    : "From DNA panels to whole genome sequencing — one at-home sample, clear reports and a private medical walkthrough.";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: name, template: `%s · ${name}` },
    description,
    applicationName: name,
    openGraph: {
      type: "website",
      siteName: name,
      title: name,
      description,
      locale: isAr ? "ar_IQ" : "en_US",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: name }],
    },
    twitter: { card: "summary_large_image", title: name, description, images: ["/og.jpg"] },
  };
}

/** Invita DNA Lab shell: brand scope, header, footer, skip link. */
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={alexandria.variable}>
      <body className="invita flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--iv-navy)] focus:px-4 focus:py-2 focus:text-[var(--iv-cream)]"
        >
          {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
        </a>
        <InvitaHeader locale={locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <InvitaFooter locale={locale} />
      </body>
    </html>
  );
}
