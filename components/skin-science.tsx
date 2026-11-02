import Image from "next/image";
import type { Locale, Localized } from "@/lib/i18n";
import { DNA_IMAGES, DNA_VIDEOS } from "@/lib/imagery";
import { LoopVideo } from "@/components/loop-video";

/**
 * The science behind the Skin report, from Invita's "Your DNA, Your Skin"
 * talk: the four gene stories the report reads, why DNA is not destiny, and
 * an honest account of what a skin DNA result can and cannot tell you.
 */
const COPY = {
  en: {
    eyebrow: "The science",
    title: "Four stories written in your skin's genes",
    intro:
      "Your skin is your largest organ, and part of how it ages is written in your DNA. The Skin report reads the genes behind four of those stories.",
    clockEyebrow: "DNA is not destiny",
    clockTitle: "Your skin also has a biological age",
    clockBody:
      "Genes set the starting point. Sun, sleep, stress and smoking then write on top of them, through chemical marks on your DNA that scientists can now read like a clock. Much of what speeds that clock up is in your hands.",
    clockHabit: "The habit with the strongest evidence for slowing visible skin ageing: sunscreen, every day.",
    proofEyebrow: "For the science",
    proofTitle: "Promise vs proof",
    proofNote: "Your report guides your choices. It does not diagnose.",
  },
  ar: {
    eyebrow: "العلم",
    title: "أربع قصص مكتوبة في جينات بشرتك",
    intro:
      "بشرتك أكبر أعضاء جسمك، وجزء من طريقة تقدّمها في العمر مكتوب في حمضك النووي. يقرأ تقرير البشرة الجينات التي تقف وراء أربع من هذه القصص.",
    clockEyebrow: "الجينات ليست قدرًا",
    clockTitle: "لبشرتك أيضًا عمر بيولوجي",
    clockBody:
      "تضع الجينات نقطة البداية، ثم تكتب الشمس والنوم والضغط والتدخين فوقها عبر علامات كيميائية على حمضك النووي، يستطيع العلماء اليوم قراءتها كالساعة. وكثير مما يُسرّع هذه الساعة بين يديك.",
    clockHabit: "العادة الأقوى دليلًا على إبطاء شيخوخة البشرة الظاهرة: الواقي الشمسي، كل يوم.",
    proofEyebrow: "للعلم",
    proofTitle: "بين الوعد والدليل",
    proofNote: "تقريرك يوجّه اختياراتك، ولا يشخّص.",
  },
} as const;

const STORIES: { title: Localized; genes: string[]; body: Localized }[] = [
  {
    title: { en: "Build vs break", ar: "البناء والهدم" },
    genes: ["COL1A1", "MMP1"],
    body: {
      en: "How fast you build collagen, and how fast you break it down.",
      ar: "سرعة بناء الكولاجين، وسرعة تكسّره.",
    },
  },
  {
    title: { en: "Defence", ar: "الدفاع" },
    genes: ["SOD2", "GPX1", "NQO1"],
    body: {
      en: "Your built-in antioxidant power against everyday oxidative stress.",
      ar: "قدرتك الذاتية المضادة للأكسدة في مواجهة الإجهاد التأكسدي اليومي.",
    },
  },
  {
    title: { en: "Protection", ar: "الحماية" },
    genes: ["MC1R"],
    body: {
      en: "UV sensitivity, sunburn risk and a tendency to dark spots.",
      ar: "الحساسية للأشعة فوق البنفسجية، وقابلية الحروق الشمسية، والميل إلى البقع الداكنة.",
    },
  },
  {
    title: { en: "Supply", ar: "الإمداد" },
    genes: ["SLC23A1"],
    body: {
      en: "Vitamin C transport, and how well your skin barrier holds on to water.",
      ar: "نقل فيتامين C إلى البشرة، ومدى قدرة حاجزها على الاحتفاظ بالماء.",
    },
  },
];

const PROOF: { title: Localized; body: Localized }[] = [
  {
    title: { en: "What it is", ar: "ما هو" },
    body: {
      en: "Skincare matched to your DNA: gene panels for collagen, antioxidant, pigment and barrier genes.",
      ar: "عناية بالبشرة مبنية على حمضك النووي: لوحات جينية للكولاجين ومضادات الأكسدة والتصبّغ وحاجز البشرة.",
    },
  },
  {
    title: { en: "Real, but modest", ar: "حقيقي، لكنه متواضع" },
    body: {
      en: "Reading a gene is reliable. The links from genes to skin traits are real but small, and each trait involves many genes. A result is a tendency, not a diagnosis.",
      ar: "قراءة الجين دقيقة. أما الصلة بين الجينات وصفات البشرة فحقيقية لكنها صغيرة، وكل صفة تشترك فيها جينات كثيرة. النتيجة ميلٌ وليست تشخيصًا.",
    },
  },
  {
    title: { en: "The evidence gap", ar: "فجوة الأدلة" },
    body: {
      en: "Few trials yet show that DNA-guided skincare beats a good standard routine.",
      ar: "قليلة هي التجارب التي تُثبت حتى الآن أن العناية الموجّهة بالجينات تتفوّق على روتين جيد معتاد.",
    },
  },
  {
    title: { en: "What helps everyone", ar: "ما يفيد الجميع" },
    body: {
      en: "Daily SPF, barrier care, retinoids and niacinamide help nearly everyone. Real skin symptoms come before any genetic label: see a dermatologist.",
      ar: "الواقي الشمسي يوميًا، والعناية بحاجز البشرة، والريتينويدات، والنياسيناميد تفيد الجميع تقريبًا. وأعراض البشرة الحقيقية تسبق أي تصنيف جيني: راجع طبيب جلدية.",
    },
  },
];

const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6";
const eyebrowCls = "text-xs font-semibold uppercase tracking-[0.18em]";
const h2Cls = "text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]";

export function SkinScience({ loc }: { loc: Locale }) {
  const copy = COPY[loc];
  const clock = DNA_IMAGES.skinClock;
  const moss = DNA_IMAGES.skinMoss;

  return (
    <>
      {/* Four gene stories ---------------------------------------------- */}
      <section className={`${wrap} pb-16 sm:pb-20`}>
        <p className={`${eyebrowCls} text-[var(--iv-gold-ink)]`}>{copy.eyebrow}</p>
        <h2 className={`mt-3 max-w-2xl ${h2Cls}`}>{copy.title}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-[var(--iv-muted)]">{copy.intro}</p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORIES.map((story, i) => (
            <li key={story.title.en} className="flex flex-col rounded-[var(--iv-radius)] bg-white p-6 ring-1 ring-[var(--iv-line)]">
              <p className="text-sm font-semibold tabular-nums text-[var(--iv-gold-ink)]">
                {loc === "ar" ? (i + 1).toLocaleString("ar-IQ") : String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{story.title[loc]}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5" dir="ltr">
                {story.genes.map((gene) => (
                  <li key={gene} className="rounded-full bg-[var(--iv-navy)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] text-[var(--iv-gold)]">
                    {gene}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[var(--iv-muted)]">{story.body[loc]}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Biological age ------------------------------------------------- */}
      <section className="iv-grain relative overflow-hidden bg-[var(--iv-night)] py-16 text-[var(--iv-cream)] sm:py-24">
        <div
          className="pointer-events-none absolute -top-40 end-[-8%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,68,0.2),transparent_65%)]"
          aria-hidden
        />
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]`}>
          <div>
            <p className={`${eyebrowCls} text-[var(--iv-gold)]`}>{copy.clockEyebrow}</p>
            <h2 className={`mt-3 ${h2Cls}`}>{copy.clockTitle}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--iv-cream)]/75 sm:text-lg">{copy.clockBody}</p>
            <p className="mt-8 max-w-xl border-s-2 border-[var(--iv-gold)] ps-5 text-lg font-semibold leading-snug">{copy.clockHabit}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/5] overflow-hidden rounded-[var(--iv-radius)] ring-1 ring-white/10">
              <LoopVideo video={DNA_VIDEOS.skinLight} className="h-full w-full object-cover" position="45% 40%" />
            </div>
            <div className="relative mt-12 aspect-[3/5] overflow-hidden rounded-[var(--iv-radius)] ring-1 ring-white/10">
              <Image
                src={clock.src}
                alt={clock.alt[loc]}
                fill
                sizes="(min-width: 1024px) 26vw, 50vw"
                className="object-cover"
                style={{ objectPosition: clock.position }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promise vs proof ----------------------------------------------- */}
      <section className={`${wrap} grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--iv-radius)] ring-1 ring-[var(--iv-line)] lg:aspect-[3/4]">
          <Image
            src={moss.src}
            alt={moss.alt[loc]}
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover"
            style={{ objectPosition: moss.position }}
          />
        </div>
        <div>
          <p className={`${eyebrowCls} text-[var(--iv-gold-ink)]`}>{copy.proofEyebrow}</p>
          <h2 className={`mt-3 ${h2Cls}`}>{copy.proofTitle}</h2>
          <dl className="mt-8 space-y-6">
            {PROOF.map((item) => (
              <div key={item.title.en} className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--iv-gold)]" aria-hidden />
                <div>
                  <dt className="text-lg font-semibold tracking-[-0.01em]">{item.title[loc]}</dt>
                  <dd className="mt-1 leading-relaxed text-[var(--iv-muted)]">{item.body[loc]}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-8 inline-flex rounded-full bg-[var(--iv-sand)] px-4 py-2 text-sm font-semibold">{copy.proofNote}</p>
        </div>
      </section>
    </>
  );
}
