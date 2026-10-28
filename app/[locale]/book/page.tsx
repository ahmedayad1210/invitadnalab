import type { Metadata } from "next";
import { Link } from "@/components/locale-link";
import { toLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { DNA_BUNDLE_SLUG, DNA_PLANS, DNA_REPORTS } from "@/lib/reports";
import { KitArt } from "@/components/dna-art";
import { BookSwabForm, type BookSwabCopy } from "@/components/book-swab-form";

type PageProps = { params: Promise<{ locale: string }> };

const COPY = {
  en: {
    metaTitle: "Book a Home DNA Swab",
    metaDescription:
      "Book an Invita specialist to take a painless cheek swab at your home. Your sample is analysed by our laboratory partner, 24Genetics.",
    back: "Invita DNA Lab",
    eyebrow: "Home swab collection",
    title: "Book your home swab",
    sub: "Tell us where and when. An Invita specialist will visit, take a painless cheek swab and send it to our laboratory partner, 24Genetics, in Madrid for analysis.",
    swabTitle: "A painless cheek swab",
    swabBody: "No needles and no blood — just a quick swab inside the cheek. Your sample is sealed with a unique ID before it leaves your home.",
    afterTitle: "What happens next",
    after: [
      "We confirm your visit on WhatsApp.",
      "Please avoid eating, drinking or smoking for 30 minutes before the swab — we'll remind you.",
      "An Invita specialist visits, confirms consent and takes your swab.",
      "We ship your sample by DHL cold-chain to 24Genetics in Madrid and message you when your reports are ready.",
    ],
    genome: "Invita Genome — whole genome sequencing",
    form: {
      name: "Full name of the person being tested",
      nameError: "Please enter the full name.",
      phone: "WhatsApp number",
      phoneHint: "We'll confirm your visit and send your reports here.",
      phoneError: "Enter a valid Iraqi mobile number (e.g. +9647XXXXXXXXX).",
      area: "City & area",
      areaPlaceholder: "e.g. Baghdad — Al-Mansour",
      areaError: "Please tell us where the visit should take place.",
      test: "Test",
      time: "Preferred time",
      times: [
        { value: "morning", label: "Morning" },
        { value: "afternoon", label: "Afternoon" },
        { value: "evening", label: "Evening" },
        { value: "any", label: "Any time" },
      ],
      consent:
        "I confirm the sample will be mine — or that of a child or person I'm the legal guardian of — and I consent to Invita collecting it and to its analysis by Invita's laboratory partner, 24Genetics, for the test selected above.",
      consentError: "Please confirm consent to continue.",
      submit: "Book via WhatsApp",
      successTitle: "Almost done — send the WhatsApp message",
      successBody: "We've opened WhatsApp with your booking details. Press send and our team will confirm your visit.",
      reopen: "Open WhatsApp again",
      another: "Book another swab",
      message:
        "Hi Invita, I'd like to book a home DNA swab.\nName: {name}\nWhatsApp: {phone}\nArea: {area}\nTest: {test}\nPreferred time: {time}\nI consent to collection by Invita and analysis by 24Genetics.",
    } satisfies BookSwabCopy,
  },
  ar: {
    metaTitle: "احجز مسحة DNA منزلية",
    metaDescription:
      "احجز زيارة مختص من Invita لأخذ مسحة خدّ بلا ألم في منزلك. تُحلَّل عيّنتك لدى شريكنا المخبري 24Genetics.",
    back: "مختبر Invita للحمض النووي",
    eyebrow: "جمع العيّنة في المنزل",
    title: "احجز مسحتك المنزلية",
    sub: "أخبرنا بالمكان والوقت. سيزورك مختص من Invita ويأخذ مسحة خدّ بلا ألم، ثم يرسلها إلى شريكنا المخبري 24Genetics في مدريد لتحليلها.",
    swabTitle: "مسحة خدّ بلا ألم",
    swabBody: "بدون إبر وبدون دم — مجرد مسحة سريعة من داخل الخدّ. تُختم عيّنتك برقم خاص قبل أن تغادر منزلك.",
    afterTitle: "ماذا يحدث بعد ذلك",
    after: [
      "نؤكّد زيارتك على واتساب.",
      "يرجى تجنّب الأكل والشرب والتدخين لمدة ٣٠ دقيقة قبل المسحة — وسنذكّرك بذلك.",
      "يزورك مختص من Invita، ويتأكّد من موافقتك، ويأخذ المسحة.",
      "نشحن عيّنتك بالتبريد عبر DHL إلى 24Genetics في مدريد ونراسلك عند جاهزية تقاريرك.",
    ],
    genome: "Invita جينوم — تسلسل الجينوم الكامل",
    form: {
      name: "الاسم الكامل للشخص المفحوص",
      nameError: "يرجى إدخال الاسم الكامل.",
      phone: "رقم واتساب",
      phoneHint: "سنؤكّد زيارتك ونرسل تقاريرك إلى هذا الرقم.",
      phoneError: "أدخل رقم موبايل عراقي صحيح (مثل ‎+9647XXXXXXXXX).",
      area: "المدينة والمنطقة",
      areaPlaceholder: "مثال: بغداد — المنصور",
      areaError: "يرجى إخبارنا بمكان الزيارة.",
      test: "الفحص",
      time: "الوقت المفضّل",
      times: [
        { value: "morning", label: "صباحًا" },
        { value: "afternoon", label: "بعد الظهر" },
        { value: "evening", label: "مساءً" },
        { value: "any", label: "أي وقت" },
      ],
      consent:
        "أؤكّد أن العيّنة ستكون لي — أو لطفل أو شخص أنا وصيّه القانوني — وأوافق على أن تجمعها Invita وأن يحلّلها شريكها المخبري 24Genetics لإجراء الفحص المختار أعلاه.",
      consentError: "يرجى تأكيد الموافقة للمتابعة.",
      submit: "احجز عبر واتساب",
      successTitle: "اقتربت — أرسل رسالة واتساب",
      successBody: "فتحنا واتساب ببيانات حجزك. اضغط إرسال وسيؤكّد فريقنا موعد زيارتك.",
      reopen: "افتح واتساب مرة أخرى",
      another: "احجز مسحة أخرى",
      message:
        "مرحبًا Invita، أرغب بحجز مسحة DNA منزلية.\nالاسم: {name}\nواتساب: {phone}\nالمنطقة: {area}\nالفحص: {test}\nالوقت المفضّل: {time}\nأوافق على الجمع من قبل Invita والتحليل لدى 24Genetics.",
    } satisfies BookSwabCopy,
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale === "ar" ? "ar" : "en"];
  return pageMetadata({
    locale: toLocale(locale),
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/book",
  });
}

export default async function BookDnaSwabPage({ params }: PageProps) {
  const { locale } = await params;
  const loc = (locale === "ar" ? "ar" : "en") as Locale;
  const copy = COPY[loc];
  const isRtl = loc === "ar";
  const genome = DNA_PLANS.find((p) => p.id === "genome")!;
  const tests = [
    ...DNA_REPORTS.map((r) => ({ value: r.slug, label: r.title[loc] })),
    { value: genome.id, label: copy.genome },
  ];

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:py-20">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--iv-muted)] hover:text-[var(--iv-navy)]"
        >
          <span aria-hidden>{isRtl ? "→" : "←"}</span> {copy.back}
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iv-gold-ink)]">{copy.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(2.2rem,1.5rem+2.8vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-[var(--iv-muted)] sm:text-lg">{copy.sub}</p>
        <div className="mt-10 rounded-[var(--iv-radius)] bg-white p-6 shadow-[0_30px_70px_-45px_var(--iv-night)] ring-1 ring-[var(--iv-line)] sm:p-8">
          <BookSwabForm copy={copy.form} tests={tests} defaultTest={DNA_BUNDLE_SLUG} />
        </div>
      </div>

      <aside className="space-y-5 lg:pt-28">
        <div className="rounded-[var(--iv-radius)] bg-[var(--iv-cream)] p-7">
          <KitArt className="mx-auto w-full max-w-[17rem]" />
          <p className="mt-5 text-lg font-semibold tracking-[-0.01em]">{copy.swabTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--iv-muted)]">{copy.swabBody}</p>
        </div>
        <div className="iv-grain overflow-hidden rounded-[var(--iv-radius)] bg-[var(--iv-night)] p-7 text-[var(--iv-cream)]">
          <p className="text-lg font-semibold">{copy.afterTitle}</p>
          <ol className="mt-5 space-y-4">
            {copy.after.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--iv-cream)]/80">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--iv-gold)] text-xs font-bold text-[var(--iv-navy)]">
                  {loc === "ar" ? (i + 1).toLocaleString("ar-IQ") : i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
