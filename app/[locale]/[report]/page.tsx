import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/locale-link";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import {
  DNA_BUNDLE_SLUG,
  DNA_PLANS,
  DNA_REPORTS,
  DNA_SINGLE_REPORTS,
  dnaOrderWhatsappUrl,
  dnaPlanWhatsappUrl,
  formatDnaPrice,
  getDnaReport,
  isExternalHref,
  resolveDnaExtraHref,
} from "@/lib/reports";
import { DNA_REPORT_COVER } from "@/lib/imagery";
import { DNA_TONE_ACCENT, DNA_TONE_CLASS, Gauge, HelixArt } from "@/components/dna-art";
import { CheckIcon, DnaReportIcon, HelixIcon, KitIcon, WhatsAppGlyph } from "@/components/dna-icons";
import { SkinScience } from "@/components/skin-science";

type PageProps = { params: Promise<{ locale: string; report: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DNA_REPORTS.map((r) => ({ report: r.slug }));
}

const COPY = {
  en: {
    back: "All tests",
    order: "Order this report",
    askPrice: "Ask for today's price",
    register: "Book a home swab",
    discoverTitle: "What you'll discover",
    goodForTitle: "Made for",
    previewTitle: "A glimpse of your report",
    previewNote: "Example layout — illustrative values, not real results.",
    example: "Example",
    includedTitle: "Every Invita test includes",
    included: [
      "Home cheek-swab collection by an Invita specialist",
      "DHL cold-chain shipping to our laboratory partner, 24Genetics, in Madrid",
      "Arabic & English digital report on WhatsApp",
      "More reports later without another swab, subject to sample quality",
    ],
    cautionTitle: "Please note",
    upsellEyebrow: "Go further",
    upsellTitle: "Same sample. More answers.",
    upsellBody:
      "Unlock all seven reports with Invita Seven — or read nearly your entire genome with Invita Genome.",
    bundleIncludesTitle: "Included in Invita Seven",
    planCta: "Order on WhatsApp",
    moreTitle: "Explore other reports",
  },
  ar: {
    back: "كل الفحوصات",
    order: "اطلب هذا التقرير",
    askPrice: "اسأل عن سعر اليوم",
    register: "احجز مسحة منزلية",
    discoverTitle: "ماذا ستكتشف",
    goodForTitle: "مصمّم لـ",
    previewTitle: "لمحة عن تقريرك",
    previewNote: "تصميم توضيحي — قيم افتراضية وليست نتائج حقيقية.",
    example: "مثال",
    includedTitle: "كل فحص من Invita يشمل",
    included: [
      "جمع مسحة الخدّ في منزلك على يد مختص من Invita",
      "شحن مبرّد عبر DHL إلى شريكنا المخبري 24Genetics في مدريد",
      "تقرير رقمي بالعربية والإنجليزية على واتساب",
      "تقارير إضافية لاحقًا دون مسحة جديدة، حسب جودة العيّنة",
    ],
    cautionTitle: "يرجى الانتباه",
    upsellEyebrow: "اذهب أبعد",
    upsellTitle: "العيّنة نفسها. إجابات أكثر.",
    upsellBody:
      "افتح التقارير السبعة كاملة مع Invita سفن — أو اقرأ جينومك بأكمله تقريبًا مع Invita جينوم.",
    bundleIncludesTitle: "يشمل Invita سفن",
    planCta: "اطلب عبر واتساب",
    moreTitle: "استكشف تقارير أخرى",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, report: slug } = await params;
  const report = getDnaReport(slug);
  if (!report) return {};
  const loc = (locale === "ar" ? "ar" : "en") as Locale;
  return pageMetadata({
    locale: loc,
    title: report.title[loc],
    description: report.summary[loc],
    path: `/${report.slug}`,
  });
}

export default async function DnaReportPage({ params }: PageProps) {
  const { locale, report: slug } = await params;
  const report = getDnaReport(slug);
  if (!report) notFound();
  const loc = (locale === "ar" ? "ar" : "en") as Locale;
  const copy = COPY[loc];
  const isRtl = loc === "ar";
  const arrow = isRtl ? "←" : "→";
  const isBundle = report.slug === DNA_BUNDLE_SLUG;
  const others = DNA_REPORTS.filter((r) => r.slug !== report.slug);
  const upsellPlans = DNA_PLANS.filter((p) => p.id !== "single");
  const extraHref = report.extra ? resolveDnaExtraHref(report.extra.href, loc, report.title[loc]) : null;
  const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6";
  const cover = DNA_REPORT_COVER[report.slug];

  return (
    <div className="overflow-x-clip">
      {/* Hero ----------------------------------------------------------- */}
      <section className="iv-grain relative overflow-hidden bg-[var(--iv-night)] text-[var(--iv-cream)]">
        <HelixArt
          idPrefix={`report-${report.slug}`}
          className="pointer-events-none absolute -end-6 -top-20 -z-10 h-[150%] opacity-[0.14]"
        />
        <div
          className="pointer-events-none absolute -bottom-40 start-[-10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,68,0.22),transparent_65%)]"
          aria-hidden
        />
        <div className={`${wrap} py-12 sm:py-16 lg:py-20`}>
          <Link
            href="/#reports"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--iv-cream)]/70 hover:text-[var(--iv-cream)]"
          >
            <span aria-hidden>{isRtl ? "→" : "←"}</span> {copy.back}
          </Link>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className={`grid h-16 w-16 place-items-center rounded-2xl ${DNA_TONE_CLASS[report.tone]} ring-1 ring-white/15`}>
                <DnaReportIcon slug={report.slug} className="h-8 w-8" />
              </span>
              <h1 className="mt-6 text-[clamp(2.2rem,1.4rem+3.4vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
                {report.title[loc]}
              </h1>
              <p className="mt-3 text-lg font-medium text-[var(--iv-gold)]">{report.tagline[loc]}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--iv-cream)]/75">{report.summary[loc]}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={dnaOrderWhatsappUrl(report, loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--iv-gold)] px-7 text-sm font-semibold text-[var(--iv-navy)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-gold-soft)]"
                >
                  <WhatsAppGlyph />
                  {report.priceIqd ? `${copy.order} · ${formatDnaPrice(report.priceIqd, loc, report.priceFrom)}` : copy.askPrice}
                </a>
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--iv-cream)]/85 ring-1 ring-white/25 transition hover:bg-white/10"
                >
                  <KitIcon className="h-4 w-4" />
                  {copy.register}
                </Link>
              </div>
            </div>
            {cover ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--iv-radius)] ring-1 ring-white/10 lg:aspect-[4/5] lg:max-w-sm lg:justify-self-center">
                <Image
                  src={cover.src}
                  alt={cover.alt[loc]}
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                  style={{ objectPosition: cover.position }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--iv-night),transparent_60%)]" aria-hidden />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl bg-[color-mix(in_srgb,var(--iv-night)_72%,transparent)] p-3 ring-1 ring-white/10 backdrop-blur-sm sm:inset-x-5 sm:bottom-5">
                  <Gauge value={report.sample[0].level} label={copy.example} size={88} accent="var(--iv-gold)" />
                  <p className="text-sm font-medium text-[var(--iv-cream)]/85">{report.sample[0].label[loc]}</p>
                </div>
              </div>
            ) : (
              <div className="hidden justify-self-center rounded-[var(--iv-radius)] bg-white/[0.04] p-8 ring-1 ring-white/10 lg:block">
                <Gauge
                  value={report.sample[0].level}
                  label={copy.example}
                  size={200}
                  accent="var(--iv-gold)"
                  className="[&_span:first-child]:text-5xl"
                />
                <p className="mt-4 text-center text-sm text-[var(--iv-cream)]/70">{report.sample[0].label[loc]}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Discover + preview --------------------------------------------- */}
      <section className={`${wrap} grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr]`}>
        <div>
          <h2 className="text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] font-semibold tracking-[-0.03em]">{copy.discoverTitle}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {report.discover.map((item) => (
              <li key={item.en} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-[var(--iv-line)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--iv-navy)] text-[var(--iv-gold)]">
                  <CheckIcon />
                </span>
                <span className="text-sm font-medium leading-relaxed">{item[loc]}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-14 text-xl font-semibold tracking-[-0.02em]">{copy.goodForTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {report.goodFor.map((item) => (
              <li key={item.en} className="flex items-start gap-3 text-[var(--iv-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--iv-gold)]" aria-hidden />
                {item[loc]}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-5">
          <div className="overflow-hidden rounded-[var(--iv-radius)] bg-white ring-1 ring-[var(--iv-line)]">
            <div className={`flex items-center gap-3 px-6 py-4 ${DNA_TONE_CLASS[report.tone]}`}>
              <DnaReportIcon slug={report.slug} className="h-5 w-5" />
              <p className="font-semibold">{copy.previewTitle}</p>
            </div>
            <dl className="space-y-5 p-6">
              {report.sample.map((row) => (
                <div key={row.label.en}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <dt className="font-medium">{row.label[loc]}</dt>
                    <dd className="font-semibold text-[var(--iv-gold-ink)]">{row.value[loc]}</dd>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--iv-cream)]" aria-hidden>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(4, Math.min(100, row.level))}%`,
                        background: `linear-gradient(${isRtl ? "270deg" : "90deg"}, var(--iv-gold-soft), ${DNA_TONE_ACCENT[report.tone] === "var(--iv-navy)" ? "var(--iv-navy)" : "var(--iv-gold)"})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </dl>
            <p className="border-t border-[var(--iv-line)] px-6 py-3 text-xs text-[var(--iv-muted)]">{copy.previewNote}</p>
          </div>
          <div className="rounded-[var(--iv-radius)] bg-[var(--iv-cream)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iv-gold-ink)]">{copy.includedTitle}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {copy.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--iv-gold-ink)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {report.slug === "skin" ? <SkinScience loc={loc} /> : null}

      {/* Caution + hand-off --------------------------------------------- */}
      {report.caution || report.extra ? (
        <section className={`${wrap} grid gap-5 pb-16 sm:pb-20 md:grid-cols-2`}>
          {report.caution ? (
            <div className="rounded-[var(--iv-radius)] bg-[var(--iv-sand)] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iv-gold-ink)]">{copy.cautionTitle}</p>
              <p className="mt-3 text-sm leading-relaxed">{report.caution[loc]}</p>
            </div>
          ) : null}
          {report.extra && extraHref ? (
            <ExtraLink
              href={extraHref}
              className={`group flex flex-col justify-between gap-5 rounded-[var(--iv-radius)] bg-[var(--iv-navy)] p-7 text-[var(--iv-cream)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-30px_var(--iv-night)] ${report.caution ? "" : "md:col-span-2"}`}
            >
              <div>
                <p className="text-xl font-semibold tracking-[-0.02em]">{report.extra.title[loc]}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--iv-cream)]/70">{report.extra.body[loc]}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--iv-gold)]">
                {report.extra.cta[loc]} <span aria-hidden>{arrow}</span>
              </span>
            </ExtraLink>
          ) : null}
        </section>
      ) : null}

      {/* Bundle contents / plan upsell --------------------------------- */}
      <section className="bg-[var(--iv-cream)] py-16 sm:py-20">
        <div className={wrap}>
          {isBundle ? (
            <>
              <h2 className="text-[clamp(1.6rem,1.2rem+1.6vw,2.25rem)] font-semibold tracking-[-0.03em]">{copy.bundleIncludesTitle}</h2>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {DNA_SINGLE_REPORTS.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/${r.slug}`}
                      className={`flex h-full flex-col items-center gap-3 rounded-2xl p-5 text-center text-sm font-semibold transition hover:-translate-y-0.5 ${DNA_TONE_CLASS[r.tone]}`}
                    >
                      <DnaReportIcon slug={r.slug} className="h-8 w-8" />
                      {r.tab[loc]}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iv-gold-ink)]">{copy.upsellEyebrow}</p>
                <h2 className="mt-3 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">{copy.upsellTitle}</h2>
                <p className="mt-3 text-[var(--iv-muted)]">{copy.upsellBody}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {upsellPlans.map((plan) => (
                  <article
                    key={plan.id}
                    className={`flex flex-col justify-between gap-5 rounded-[var(--iv-radius)] p-6 ${
                      plan.id === "genome" ? "iv-grain bg-[var(--iv-night)] text-[var(--iv-cream)]" : "bg-[var(--iv-navy)] text-[var(--iv-cream)]"
                    }`}
                  >
                    <div>
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--iv-gold)]">
                        <HelixIcon className="h-4 w-4" />
                        {plan.method[loc]}
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{plan.name[loc]}</p>
                      <p className="mt-2 text-sm text-[var(--iv-cream)]/70">{plan.tagline[loc]}</p>
                    </div>
                    <a
                      href={dnaPlanWhatsappUrl(plan, loc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--iv-gold)] text-sm font-semibold text-[var(--iv-navy)] transition hover:bg-[var(--iv-gold-soft)]"
                    >
                      <WhatsAppGlyph />
                      {plan.priceIqd ? formatDnaPrice(plan.priceIqd, loc, plan.priceFrom) : copy.planCta}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Other reports -------------------------------------------------- */}
      <section className={`${wrap} py-14 sm:py-16`}>
        <h2 className="text-lg font-semibold tracking-[-0.02em]">{copy.moreTitle}</h2>
        <ul className="mt-5 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {others.map((r) => (
            <li key={r.slug} className="shrink-0 snap-start">
              <Link
                href={`/${r.slug}`}
                className={`inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:brightness-110 ${DNA_TONE_CLASS[r.tone]}`}
              >
                <DnaReportIcon slug={r.slug} className="h-4 w-4" />
                {r.tab[loc]}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ExtraLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
