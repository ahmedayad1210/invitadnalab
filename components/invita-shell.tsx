import Image from "next/image";
import { Link } from "@/components/locale-link";
import type { Locale } from "@/lib/i18n";
import {
  DNA_SINGLE_REPORTS,
  INVITA_ADDRESS,
  INVITA_DNA_INSTAGRAM,
  INVITA_EMAIL,
  INVITA_IV_SITE,
  invitaWhatsappUrl,
} from "@/lib/reports";
import { INVITA_LOGO } from "@/lib/imagery";
import { InvitaLocaleToggle } from "@/components/invita-locale-toggle";
import { InstagramGlyph, PinIcon, WhatsAppGlyph } from "@/components/dna-icons";
import { notch } from "@/components/brand-ui";

const NAV = {
  en: {
    links: [
      { href: "/#plans", label: "Tests" },
      { href: "/#genome", label: "Whole genome" },
      { href: "/#reports", label: "Reports" },
      { href: "/#process", label: "How it works" },
    ],
    register: "Book home swab",
    order: "Order",
    orderMsg: "Hi Invita, I'd like to order a DNA test. Which one do you recommend for me?",
    lab: "DNA Lab",
    home: "Invita DNA Lab home",
  },
  ar: {
    links: [
      { href: "/#plans", label: "الفحوصات" },
      { href: "/#genome", label: "الجينوم الكامل" },
      { href: "/#reports", label: "التقارير" },
      { href: "/#process", label: "كيف نعمل" },
    ],
    register: "احجز مسحة منزلية",
    order: "اطلب",
    orderMsg: "مرحبًا Invita، أرغب بطلب فحص الحمض النووي. أي فحص تنصحونني به؟",
    lab: "مختبر DNA",
    home: "الصفحة الرئيسية لمختبر Invita للحمض النووي",
  },
} as const;

/**
 * Official Invita lockup (gold mark + wordmark) with a "DNA Lab" tag.
 * `compact` drops the tag on phones narrower than 420px, where the header
 * row has no room for it beside the language toggle and Order button.
 */
export function InvitaLogo({
  lab,
  tone = "light",
  compact = false,
}: {
  lab: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const wordmark = tone === "dark" ? INVITA_LOGO.wordmarkIvory : INVITA_LOGO.wordmarkNavy;
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <Image
        src={INVITA_LOGO.mark.src}
        width={INVITA_LOGO.mark.width}
        height={INVITA_LOGO.mark.height}
        alt=""
        className="h-8 w-auto sm:h-9"
        loading="eager"
      />
      <Image
        src={wordmark.src}
        width={wordmark.width}
        height={wordmark.height}
        alt="Invita"
        className="h-[1.35rem] w-auto sm:h-6"
        loading="eager"
      />
      <span
        dir="auto"
        className={`rounded-full border border-[var(--iv-gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
          tone === "dark" ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-ink)]"
        } ${compact ? "hidden min-[420px]:inline" : ""}`}
      >
        {lab}
      </span>
    </span>
  );
}

export function InvitaHeader({ locale }: { locale: Locale }) {
  const t = NAV[locale];
  return (
    <header className="sticky top-0 z-40 border-t-[3px] border-b border-t-[var(--iv-navy)] border-b-[var(--iv-line)] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" aria-label={t.home} className="shrink-0">
          <InvitaLogo lab={t.lab} compact />
        </Link>
        {/* Each link sits under a hairline that turns gold on hover. */}
        <nav aria-label="Invita DNA" className="hidden items-stretch gap-2 self-stretch lg:flex">
          {t.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative flex items-center px-4 text-sm font-medium text-[var(--iv-navy)]/75 transition before:absolute before:inset-x-2 before:top-0 before:h-px before:bg-[var(--iv-line)] before:transition-all hover:text-[var(--iv-navy)] hover:before:h-[3px] hover:before:bg-[var(--iv-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <InvitaLocaleToggle />
          <Link href="/book" className={`${notch("line", "sm")} max-sm:hidden`}>
            {t.register}
          </Link>
          <a
            href={invitaWhatsappUrl(t.orderMsg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.order}
            className={notch("navy", "sm")}
          >
            <WhatsAppGlyph />
            {/* Icon-only below 400px so the header row fits a narrow phone. */}
            <span className="hidden min-[400px]:inline">{t.order}</span>
          </a>
        </div>
      </div>
      {/* Section links stay reachable on small screens as a scrollable row. */}
      <nav
        aria-label="Invita DNA"
        className="flex gap-1 overflow-x-auto border-t border-[var(--iv-line)] px-3 py-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {t.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 px-3 py-1.5 text-[13px] font-medium text-[var(--iv-navy)]/80 hover:text-[var(--iv-navy)]"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/book"
          className="shrink-0 px-3 py-1.5 text-[13px] font-semibold text-[var(--iv-gold-ink)] sm:hidden"
        >
          {t.register}
        </Link>
      </nav>
    </header>
  );
}

const FOOT = {
  en: {
    blurb:
      "Genomic intelligence from Invita — home swab collection, DNA panels and whole genome sequencing analysed in Madrid by our laboratory partner 24Genetics, explained privately by our medical team.",
    tests: "Reports",
    help: "Help",
    company: "Invita",
    register: "Book a home swab",
    upload: "Results from another test",
    uploadMsg: "Hi Invita, I took a DNA test elsewhere and would like your team to explain my results.",
    faq: "Questions",
    iv: "Invita IV therapy",
    partner: "Partner with us",
    partnerMsg: "Hi Invita, I'm interested in offering Invita DNA tests at my clinic.",
    contactMsg: "Hi Invita, I have a question about DNA testing.",
    disclaimer:
      "Invita DNA reports are for information and wellness. They are not a diagnosis and do not replace medical advice.",
    rights: "All rights reserved.",
  },
  ar: {
    blurb:
      "الذكاء الجيني من Invita — جمع العيّنة في المنزل، وفحوصات اللوحات الجينية وتسلسل الجينوم الكامل يحلّلها شريكنا المخبري 24Genetics في مدريد، ويشرحها فريقنا الطبي بخصوصية تامة.",
    tests: "التقارير",
    help: "المساعدة",
    company: "Invita",
    register: "احجز مسحة منزلية",
    upload: "نتائج فحص سابق",
    uploadMsg: "مرحبًا Invita، أجريت فحص الحمض النووي في مكان آخر وأرغب بأن يشرح فريقكم نتائجي.",
    faq: "الأسئلة الشائعة",
    iv: "علاجات Invita الوريدية",
    partner: "كن شريكًا",
    partnerMsg: "مرحبًا Invita، أرغب بتقديم فحوصات Invita للحمض النووي في عيادتي.",
    contactMsg: "مرحبًا Invita، لدي سؤال عن فحوصات الحمض النووي.",
    disclaimer:
      "تقارير Invita للحمض النووي لأغراض المعرفة والعافية. وهي ليست تشخيصًا ولا تغني عن الاستشارة الطبية.",
    rights: "جميع الحقوق محفوظة.",
  },
} as const;

export function InvitaFooter({ locale }: { locale: Locale }) {
  const t = FOOT[locale];
  const lab = NAV[locale].lab;
  const linkCls = "group inline-flex items-start gap-2 text-sm text-[var(--iv-muted)] transition hover:text-[var(--iv-navy)]";
  const chip =
    "inline-flex items-center gap-2 rounded-[var(--iv-radius)] px-4 py-2 text-sm font-semibold text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)] hover:bg-[var(--iv-mist)]";
  return (
    <footer className="border-t border-[var(--iv-line)] bg-white text-[var(--iv-navy)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <InvitaLogo lab={lab} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--iv-muted)]">{t.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={invitaWhatsappUrl(t.contactMsg)} target="_blank" rel="noopener noreferrer" className={notch("navy", "sm")}>
              <WhatsAppGlyph />
              WhatsApp
            </a>
            <a href={INVITA_DNA_INSTAGRAM} target="_blank" rel="noopener noreferrer" className={chip} dir="ltr">
              <InstagramGlyph />
              @invitadnalab
            </a>
            <a href={`mailto:${INVITA_EMAIL}`} className={chip} dir="ltr">
              {INVITA_EMAIL}
            </a>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--iv-muted)]">
            <PinIcon className="h-4 w-4 text-[var(--iv-gold-deep)]" />
            {INVITA_ADDRESS[locale]}
          </p>
        </div>
        <FooterCol title={t.tests}>
          {DNA_SINGLE_REPORTS.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`} className={linkCls}>
                <Caret />
                {r.title[locale]}
              </Link>
            </li>
          ))}
        </FooterCol>
        <FooterCol title={t.help}>
          <li>
            <Link href="/book" className={linkCls}>
              <Caret />
              {t.register}
            </Link>
          </li>
          <li>
            <a href={invitaWhatsappUrl(t.uploadMsg)} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <Caret />
              {t.upload}
            </a>
          </li>
          <li>
            <Link href="/#faq" className={linkCls}>
              <Caret />
              {t.faq}
            </Link>
          </li>
        </FooterCol>
        <FooterCol title={t.company}>
          <li>
            <a href={INVITA_IV_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <Caret />
              {t.iv}
            </a>
          </li>
          <li>
            <a href={invitaWhatsappUrl(t.partnerMsg)} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <Caret />
              {t.partner}
            </a>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-[var(--iv-line)] bg-[var(--iv-mist)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-[var(--iv-muted)] sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>{t.disclaimer}</p>
          <p>© {new Date().getFullYear()} Invita. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="iv-slab text-lg text-[var(--iv-navy)]">{title}</p>
      <span className="iv-bar mt-3 w-10" aria-hidden />
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

/** Small pointer before each footer link, turned to face the reading direction. */
function Caret() {
  return (
    <svg viewBox="0 0 8 10" aria-hidden className="mt-[0.4em] h-2 w-1.5 shrink-0 fill-[var(--iv-gold-deep)] rtl:-scale-x-100">
      <path d="M0 0l8 5-8 5z" />
    </svg>
  );
}
