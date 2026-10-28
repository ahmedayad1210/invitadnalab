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

const NAV = {
  en: {
    links: [
      { href: "/#plans", label: "Tests" },
      { href: "/#genome", label: "Whole genome" },
      { href: "/#reports", label: "Reports" },
      { href: "/#how", label: "How it works" },
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
      { href: "/#how", label: "كيف نعمل" },
    ],
    register: "احجز مسحة منزلية",
    order: "اطلب",
    orderMsg: "مرحبًا Invita، أرغب بطلب فحص الحمض النووي. أي فحص تنصحونني به؟",
    lab: "مختبر DNA",
    home: "الصفحة الرئيسية لمختبر Invita للحمض النووي",
  },
} as const;

/** Official Invita lockup (gold mark + wordmark) with a "DNA Lab" tag. */
export function InvitaLogo({
  lab,
  tone = "light",
}: {
  lab: string;
  tone?: "light" | "dark";
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
        }`}
      >
        {lab}
      </span>
    </span>
  );
}

export function InvitaHeader({ locale }: { locale: Locale }) {
  const t = NAV[locale];
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--iv-line)]/70 bg-[color-mix(in_srgb,var(--iv-paper)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" aria-label={t.home} className="shrink-0">
          <InvitaLogo lab={t.lab} />
        </Link>
        <nav aria-label="Invita DNA" className="hidden items-center gap-1 lg:flex">
          {t.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--iv-navy)]/80 transition hover:bg-[var(--iv-cream)] hover:text-[var(--iv-navy)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <InvitaLocaleToggle />
          <Link
            href="/book"
            className="hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)] transition hover:bg-[var(--iv-cream)] sm:inline-flex"
          >
            {t.register}
          </Link>
          <a
            href={invitaWhatsappUrl(t.orderMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--iv-navy)] px-5 text-sm font-semibold text-[var(--iv-cream)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-night)]"
          >
            <WhatsAppGlyph />
            {t.order}
          </a>
        </div>
      </div>
      {/* Section links stay reachable on small screens as a scrollable row. */}
      <nav
        aria-label="Invita DNA"
        className="flex gap-1 overflow-x-auto border-t border-[var(--iv-line)]/60 px-3 py-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {t.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--iv-navy)]/80 hover:bg-[var(--iv-cream)]"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/book"
          className="shrink-0 rounded-full px-3 py-1.5 text-[13px] font-semibold text-[var(--iv-gold-ink)] hover:bg-[var(--iv-cream)] sm:hidden"
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
  const linkCls = "text-sm text-[var(--iv-cream)]/70 transition hover:text-[var(--iv-cream)]";
  return (
    <footer className="iv-grain bg-[var(--iv-night)] text-[var(--iv-cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <InvitaLogo lab={lab} tone="dark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--iv-cream)]/70">{t.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={invitaWhatsappUrl(t.contactMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--iv-gold)] px-4 py-2 text-sm font-semibold text-[var(--iv-navy)] hover:bg-[var(--iv-gold-soft)]"
            >
              <WhatsAppGlyph />
              WhatsApp
            </a>
            <a
              href={INVITA_DNA_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/25 hover:bg-white/10"
              dir="ltr"
            >
              <InstagramGlyph />
              @invitadnalab
            </a>
            <a
              href={`mailto:${INVITA_EMAIL}`}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/25 hover:bg-white/10"
              dir="ltr"
            >
              {INVITA_EMAIL}
            </a>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--iv-cream)]/70">
            <PinIcon className="h-4 w-4 text-[var(--iv-gold)]" />
            {INVITA_ADDRESS[locale]}
          </p>
        </div>
        <FooterCol title={t.tests}>
          {DNA_SINGLE_REPORTS.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`} className={linkCls}>
                {r.title[locale]}
              </Link>
            </li>
          ))}
        </FooterCol>
        <FooterCol title={t.help}>
          <li><Link href="/book" className={linkCls}>{t.register}</Link></li>
          <li>
            <a href={invitaWhatsappUrl(t.uploadMsg)} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {t.upload}
            </a>
          </li>
          <li><Link href="/#faq" className={linkCls}>{t.faq}</Link></li>
        </FooterCol>
        <FooterCol title={t.company}>
          <li>
            <a href={INVITA_IV_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {t.iv}
            </a>
          </li>
          <li>
            <a href={invitaWhatsappUrl(t.partnerMsg)} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {t.partner}
            </a>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-[var(--iv-cream)]/55 sm:px-6 md:flex-row md:items-center md:justify-between">
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iv-gold)]">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}
