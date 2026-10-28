import type { Locale, Localized } from "@/lib/i18n";
import { formatCurrency } from "@/lib/i18n";

/**
 * Invita DNA Lab catalogue — three plans (single panel report, all seven
 * panel reports, whole genome sequencing) and the seven reports behind them.
 * Powers the landing page (`/[locale]`), the report pages
 * (`/[locale]/[report]`) and the home-swab booking form (`/[locale]/book`).
 *
 * Invita collects the sample (home cheek swab) and ships it by DHL cold-chain
 * to its laboratory partner, 24Genetics, in Madrid, which runs the analysis and
 * produces the reports.
 *
 * Prices: `priceIqd: null` renders an "Ask for today's price" WhatsApp CTA.
 * `priceFrom: true` renders the number as a starting price ("From …").
 * Never ship placeholder numbers to the live site.
 */

/** Entry price confirmed by Invita: single-report tests start here. */
export const DNA_PRICE_FROM_IQD = 200_000;

/** Laboratory that analyses Invita-collected samples. */
export const DNA_LAB_PARTNER = "24Genetics";

/** Invita's public WhatsApp line (as listed on invitadrips.com). */
export const INVITA_WHATSAPP_NUMBER = "9647748885559";
export const INVITA_EMAIL = "info@invitadrips.com";
export const INVITA_IV_SITE = "https://invitadrips.com";
/** Invita DNA Lab's own Instagram account (@invitadnalab). */
export const INVITA_DNA_INSTAGRAM = "https://www.instagram.com/invitadnalab/";
/** Address as printed on Invita's Instagram posts. */
export const INVITA_ADDRESS = { en: "Al-Mansour, Baghdad, Iraq", ar: "المنصور، بغداد، العراق" } as const;

export function invitaWhatsappUrl(message: string): string {
  return `https://wa.me/${INVITA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type DnaReportSlug =
  | "ancestry"
  | "health"
  | "nutrition"
  | "pharma"
  | "sports"
  | "skin"
  | "personality"
  | "all-in-one";

/** Card colour family — drawn from the Invita navy / gold / cream palette. */
export type DnaTone = "night" | "navy" | "gold" | "sand" | "sky";

export type DnaSampleRow = {
  label: Localized;
  value: Localized;
  /** 0–100, drives the preview bar width. */
  level: number;
};

export type DnaReport = {
  slug: DnaReportSlug;
  tone: DnaTone;
  /** Short label for the tile bar / tabs. */
  tab: Localized;
  title: Localized;
  tagline: Localized;
  summary: Localized;
  discover: Localized[];
  goodFor: Localized[];
  /** Illustrative preview rows — always labelled "example" in the UI. */
  sample: DnaSampleRow[];
  /** Optional hand-off — an internal path or an absolute (WhatsApp / web) URL. */
  extra?: { title: Localized; body: Localized; href: string; cta: Localized };
  /** Report-specific safety note, shown on the detail page. */
  caution?: Localized;
  priceIqd: number | null;
  /** Render `priceIqd` as a starting price. */
  priceFrom?: boolean;
};

export const DNA_REPORTS: DnaReport[] = [
  {
    slug: "ancestry",
    tone: "night",
    tab: { en: "Ancestry", ar: "الأصول" },
    title: { en: "Ancestry DNA Report", ar: "تقرير الأصول الجينية" },
    tagline: {
      en: "Trace the journey written into your genes.",
      ar: "تتبّع الرحلة المكتوبة في جيناتك.",
    },
    summary: {
      en: "See which regions and populations your DNA most closely matches, and follow the ancient paths your maternal and paternal lines took to reach you.",
      ar: "اكتشف المناطق والشعوب الأقرب إلى حمضك النووي، وتتبّع المسارات القديمة التي سلكها خطّا الأم والأب حتى وصلا إليك.",
    },
    discover: [
      { en: "Regional ancestry breakdown by percentage", ar: "توزيع أصولك حسب المناطق بالنسب المئوية" },
      { en: "Maternal lineage (mitochondrial haplogroup)", ar: "سلالة الأم (المجموعة الفردانية للميتوكوندريا)" },
      { en: "Paternal lineage for male testers (Y haplogroup)", ar: "سلالة الأب للذكور (المجموعة الفردانية Y)" },
      { en: "Ancient migration routes mapped over time", ar: "خرائط طرق الهجرة القديمة عبر الزمن" },
      { en: "Population groups you share the most DNA with", ar: "الشعوب التي تتشارك معها أكبر قدر من الحمض النووي" },
    ],
    goodFor: [
      { en: "Curious about family roots beyond the paper records", ar: "من يريد معرفة جذور العائلة أبعد من السجلات الورقية" },
      { en: "A meaningful gift for parents and grandparents", ar: "هدية مميزة للوالدين والأجداد" },
      { en: "Families comparing results together", ar: "العائلات التي تقارن نتائجها معًا" },
    ],
    sample: [
      { label: { en: "Mesopotamia & Levant", ar: "بلاد الرافدين والشام" }, value: { en: "58%", ar: "٥٨٪" }, level: 58 },
      { label: { en: "Arabian Peninsula", ar: "شبه الجزيرة العربية" }, value: { en: "21%", ar: "٢١٪" }, level: 21 },
      { label: { en: "Anatolia & Caucasus", ar: "الأناضول والقوقاز" }, value: { en: "13%", ar: "١٣٪" }, level: 13 },
      { label: { en: "Iranian Plateau", ar: "الهضبة الإيرانية" }, value: { en: "8%", ar: "٨٪" }, level: 8 },
    ],
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "health",
    tone: "gold",
    tab: { en: "Health", ar: "الصحة" },
    title: { en: "Health DNA Report", ar: "تقرير الصحة الجيني" },
    tagline: {
      en: "Know your predispositions early, act on them calmly.",
      ar: "اعرف استعداداتك مبكرًا، وتصرّف بهدوء ووعي.",
    },
    summary: {
      en: "Understand genetic variants linked to common conditions and whether you carry genes you could pass to your children — then plan screening with a doctor who knows your results.",
      ar: "افهم المتغيرات الجينية المرتبطة بالحالات الشائعة، واعرف إن كنت تحمل جينات قد تنتقل لأطفالك — ثم خطّط للفحوصات مع طبيب يعرف نتائجك.",
    },
    discover: [
      { en: "Genetic predisposition to common conditions", ar: "الاستعداد الجيني للحالات المرضية الشائعة" },
      { en: "Carrier status for inherited conditions", ar: "حالة الحمل الجيني للأمراض الوراثية" },
      { en: "Heart, metabolic and blood-related markers", ar: "مؤشرات القلب والتمثيل الغذائي والدم" },
      { en: "Practical screening questions to raise with your doctor", ar: "أسئلة فحص عملية لمناقشتها مع طبيبك" },
    ],
    goodFor: [
      { en: "Couples planning a family", ar: "الأزواج المقبلون على تكوين عائلة" },
      { en: "Anyone with a strong family history of a condition", ar: "من لديه تاريخ عائلي قوي لحالة مرضية" },
      { en: "People who prefer prevention to surprises", ar: "من يفضّل الوقاية على المفاجآت" },
    ],
    sample: [
      { label: { en: "Iron overload risk", ar: "خطر تراكم الحديد" }, value: { en: "Typical", ar: "طبيعي" }, level: 30 },
      { label: { en: "Lactose tolerance", ar: "تحمّل اللاكتوز" }, value: { en: "Reduced", ar: "منخفض" }, level: 65 },
      { label: { en: "Clotting factor variant", ar: "متغير عامل التخثر" }, value: { en: "Not detected", ar: "غير موجود" }, level: 10 },
      { label: { en: "Carrier screen — thalassemia", ar: "فحص الحمل — الثلاسيميا" }, value: { en: "Not a carrier", ar: "غير حامل" }, level: 12 },
    ],
    extra: {
      title: { en: "Walk through it privately", ar: "راجع النتائج بخصوصية تامة" },
      body: {
        en: "Invita's medical team turns your report into a calm, clear screening plan — one-to-one, on your schedule.",
        ar: "يحوّل فريق Invita الطبي تقريرك إلى خطة فحص واضحة وهادئة — جلسة خاصة وفي الوقت الذي يناسبك.",
      },
      href: "medical-team",
      cta: { en: "Talk to the medical team", ar: "تحدّث مع الفريق الطبي" },
    },
    caution: {
      en: "A genetic predisposition is not a diagnosis. Most conditions depend on lifestyle and environment too — always discuss results with a doctor before making medical decisions.",
      ar: "الاستعداد الجيني ليس تشخيصًا. معظم الحالات تتأثر أيضًا بنمط الحياة والبيئة — ناقش النتائج دائمًا مع طبيب قبل اتخاذ أي قرار طبي.",
    },
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "nutrition",
    tone: "sand",
    tab: { en: "Nutrition", ar: "التغذية" },
    title: { en: "Nutrition DNA Report", ar: "تقرير التغذية الجيني" },
    tagline: {
      en: "Eat for the body you actually have.",
      ar: "تناول الطعام المناسب لجسمك أنت.",
    },
    summary: {
      en: "Learn how your genes shape the way you handle carbs, fats, caffeine and lactose, and which vitamins you may need more of — the foundation for a diet that finally fits.",
      ar: "تعرّف كيف تؤثر جيناتك على تعاملك مع الكربوهيدرات والدهون والكافيين واللاكتوز، وأي الفيتامينات قد تحتاج منها أكثر — أساس لنظام غذائي يناسبك فعلًا.",
    },
    discover: [
      { en: "Response to carbohydrates and dietary fats", ar: "استجابتك للكربوهيدرات والدهون" },
      { en: "Caffeine and lactose processing", ar: "طريقة تعامل جسمك مع الكافيين واللاكتوز" },
      { en: "Likely needs for vitamin D, B12, folate and iron", ar: "احتياجاتك المحتملة لفيتامين د وب١٢ والفولات والحديد" },
      { en: "Appetite and satiety tendencies", ar: "ميولك نحو الشهية والشعور بالشبع" },
      { en: "Food sensitivities worth watching", ar: "حساسيات غذائية تستحق الانتباه" },
    ],
    goodFor: [
      { en: "Weight goals that haven't responded to generic diets", ar: "أهداف الوزن التي لم تنجح معها الأنظمة العامة" },
      { en: "Building a long-term, sustainable meal plan", ar: "بناء خطة غذائية مستدامة على المدى الطويل" },
      { en: "Choosing supplements with a reason", ar: "اختيار المكملات الغذائية عن وعي" },
    ],
    sample: [
      { label: { en: "Caffeine metabolism", ar: "استقلاب الكافيين" }, value: { en: "Fast", ar: "سريع" }, level: 80 },
      { label: { en: "Saturated fat sensitivity", ar: "الحساسية للدهون المشبعة" }, value: { en: "Elevated", ar: "مرتفعة" }, level: 70 },
      { label: { en: "Vitamin D need", ar: "الحاجة لفيتامين د" }, value: { en: "Higher", ar: "أعلى" }, level: 75 },
      { label: { en: "Carb response", ar: "الاستجابة للكربوهيدرات" }, value: { en: "Typical", ar: "طبيعية" }, level: 45 },
    ],
    extra: {
      title: { en: "Turn your results into a plan", ar: "حوّل نتائجك إلى خطة" },
      body: {
        en: "Our clinicians translate your nutrition report into everyday choices that fit your goals and your kitchen.",
        ar: "يترجم أطباؤنا تقرير التغذية إلى اختيارات يومية تناسب أهدافك ومطبخك.",
      },
      href: "medical-team",
      cta: { en: "Talk to the medical team", ar: "تحدّث مع الفريق الطبي" },
    },
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "pharma",
    tone: "navy",
    tab: { en: "Pharma", ar: "الأدوية" },
    title: { en: "Pharmacogenetics Report", ar: "تقرير الاستجابة الجينية للأدوية" },
    tagline: {
      en: "How your genes may change the way medicines work for you.",
      ar: "كيف قد تغيّر جيناتك طريقة عمل الأدوية لديك.",
    },
    summary: {
      en: "Some people break down certain medicines faster or slower than average. This report highlights gene–drug interactions your doctor or pharmacist can factor in when choosing a medicine or a dose.",
      ar: "بعض الأشخاص يكسّرون أدوية معيّنة أسرع أو أبطأ من المعدّل. يوضّح هذا التقرير التداخلات بين الجينات والأدوية التي يمكن لطبيبك أو الصيدلي أخذها بالحسبان عند اختيار الدواء أو الجرعة.",
    },
    discover: [
      { en: "Metaboliser status for key liver enzymes", ar: "حالة الاستقلاب لإنزيمات الكبد الرئيسية" },
      { en: "Gene–drug notes for common pain, heart and mood medicines", ar: "ملاحظات الجينات والأدوية لأدوية الألم والقلب والمزاج الشائعة" },
      { en: "Sensitivity flags worth sharing with your prescriber", ar: "علامات حساسية تستحق مشاركتها مع الطبيب المعالج" },
      { en: "A summary card you can show any doctor or pharmacist", ar: "بطاقة ملخّصة يمكنك عرضها على أي طبيب أو صيدلي" },
    ],
    goodFor: [
      { en: "People on several long-term medicines", ar: "من يتناول عدة أدوية طويلة الأمد" },
      { en: "Anyone who has had unexpected side effects", ar: "من تعرّض لأعراض جانبية غير متوقعة" },
      { en: "Families with a history of medicine sensitivity", ar: "العائلات التي لديها تاريخ حساسية للأدوية" },
    ],
    sample: [
      { label: { en: "CYP2C19", ar: "CYP2C19" }, value: { en: "Rapid metaboliser", ar: "استقلاب سريع" }, level: 82 },
      { label: { en: "CYP2D6", ar: "CYP2D6" }, value: { en: "Normal", ar: "طبيعي" }, level: 50 },
      { label: { en: "SLCO1B1", ar: "SLCO1B1" }, value: { en: "Reduced function", ar: "وظيفة منخفضة" }, level: 30 },
      { label: { en: "VKORC1", ar: "VKORC1" }, value: { en: "Increased sensitivity", ar: "حساسية مرتفعة" }, level: 70 },
    ],
    extra: {
      title: { en: "Review it with a clinician", ar: "راجعه مع طبيب" },
      body: {
        en: "Share your report with Invita's medical team and go through your current medicines together.",
        ar: "شارك تقريرك مع فريق Invita الطبي وراجعوا أدويتك الحالية معًا.",
      },
      href: "medical-team",
      cta: { en: "Talk to the medical team", ar: "تحدّث مع الفريق الطبي" },
    },
    caution: {
      en: "Never start, stop or change the dose of a medicine based on this report alone. Share it with your doctor or pharmacist first.",
      ar: "لا تبدأ أو توقف أو تغيّر جرعة أي دواء بناءً على هذا التقرير وحده. شاركه مع طبيبك أو الصيدلي أولًا.",
    },
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "sports",
    tone: "sky",
    tab: { en: "Sports", ar: "الرياضة" },
    title: { en: "Sports & Fitness DNA Report", ar: "تقرير الرياضة واللياقة الجيني" },
    tagline: {
      en: "Train smarter with the body your genes built.",
      ar: "تمرّن بذكاء بالجسم الذي بنته جيناتك.",
    },
    summary: {
      en: "Find out whether your muscles lean towards power or endurance, how quickly you tend to recover, and which injuries deserve extra prevention work.",
      ar: "اكتشف إن كانت عضلاتك تميل للقوة أم للتحمّل، ومدى سرعة تعافيك، وأي الإصابات تستحق اهتمامًا وقائيًا إضافيًا.",
    },
    discover: [
      { en: "Power vs endurance muscle profile", ar: "ملف العضلات: قوة أم تحمّل" },
      { en: "Recovery speed and inflammation response", ar: "سرعة التعافي والاستجابة الالتهابية" },
      { en: "Tendon and ligament injury tendencies", ar: "الميل لإصابات الأوتار والأربطة" },
      { en: "Aerobic capacity potential (VO₂max trainability)", ar: "قابلية تطوير اللياقة الهوائية (VO₂max)" },
    ],
    goodFor: [
      { en: "Gym-goers who've hit a plateau", ar: "روّاد النوادي الذين وصلوا لمرحلة ثبات" },
      { en: "Runners, footballers and amateur athletes", ar: "العدّاؤون ولاعبو كرة القدم والرياضيون الهواة" },
      { en: "Coaches personalising training blocks", ar: "المدربون الذين يخصّصون برامج التدريب" },
    ],
    sample: [
      { label: { en: "Power profile", ar: "ملف القوة" }, value: { en: "High", ar: "مرتفع" }, level: 78 },
      { label: { en: "Endurance profile", ar: "ملف التحمّل" }, value: { en: "Moderate", ar: "متوسط" }, level: 52 },
      { label: { en: "Recovery speed", ar: "سرعة التعافي" }, value: { en: "Slower", ar: "أبطأ" }, level: 35 },
      { label: { en: "Soft-tissue injury tendency", ar: "الميل لإصابات الأنسجة الرخوة" }, value: { en: "Elevated", ar: "مرتفع" }, level: 68 },
    ],
    extra: {
      title: { en: "Recovery, clinician-led", ar: "تعافٍ بإشراف طبي" },
      body: {
        en: "Invita also offers performance and recovery IV protocols — each one starts with a medical consultation.",
        ar: "تقدّم Invita أيضًا بروتوكولات وريدية للأداء والتعافي — يبدأ كلٌّ منها باستشارة طبية.",
      },
      href: "https://invitadrips.com",
      cta: { en: "Explore Invita IV therapy", ar: "استكشف علاجات Invita الوريدية" },
    },
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "skin",
    tone: "gold",
    tab: { en: "Skin", ar: "البشرة" },
    title: { en: "Skin DNA Report", ar: "تقرير البشرة الجيني" },
    tagline: {
      en: "Skincare that starts beneath the surface.",
      ar: "عناية بالبشرة تبدأ من تحت السطح.",
    },
    summary: {
      en: "Discover how your genes influence collagen, hydration, sun sensitivity and signs of ageing — so every product on your shelf has a job to do.",
      ar: "اكتشف كيف تؤثر جيناتك على الكولاجين والترطيب والحساسية للشمس وعلامات التقدّم بالعمر — ليكون لكل منتج على رفّك دور واضح.",
    },
    discover: [
      { en: "Collagen breakdown and firmness", ar: "تكسّر الكولاجين ومرونة البشرة" },
      { en: "Natural hydration and barrier strength", ar: "الترطيب الطبيعي وقوة حاجز البشرة" },
      { en: "Sun sensitivity and pigmentation tendency", ar: "الحساسية للشمس والميل للتصبّغ" },
      { en: "Antioxidant protection and glycation", ar: "الحماية المضادة للأكسدة والتسكّر" },
      { en: "Ingredient suggestions matched to your profile", ar: "مكوّنات مقترحة تناسب ملفك" },
    ],
    goodFor: [
      { en: "Anyone tired of trial-and-error skincare", ar: "من سئم تجربة منتجات العناية عشوائيًا" },
      { en: "Planning a long-term anti-ageing routine", ar: "التخطيط لروتين طويل الأمد لمقاومة التقدّم بالعمر" },
      { en: "Sensitive or pigmentation-prone skin", ar: "البشرة الحساسة أو المعرّضة للتصبّغ" },
    ],
    sample: [
      { label: { en: "Collagen degradation", ar: "تكسّر الكولاجين" }, value: { en: "Elevated", ar: "مرتفع" }, level: 72 },
      { label: { en: "Hydration", ar: "الترطيب" }, value: { en: "Lower", ar: "أقل" }, level: 38 },
      { label: { en: "Sun sensitivity", ar: "الحساسية للشمس" }, value: { en: "High", ar: "عالية" }, level: 80 },
      { label: { en: "Antioxidant capacity", ar: "القدرة المضادة للأكسدة" }, value: { en: "Typical", ar: "طبيعية" }, level: 50 },
    ],
    extra: {
      title: { en: "Beauty from within", ar: "جمال من الداخل" },
      body: {
        en: "Pair your skin insights with Invita's clinician-led beauty IV protocols, starting with a free medical assessment.",
        ar: "اجمع نتائج بشرتك مع بروتوكولات Invita الوريدية للبشرة بإشراف طبي، بدءًا بتقييم طبي مجاني.",
      },
      href: "https://invitadrips.com",
      cta: { en: "Explore Invita IV therapy", ar: "استكشف علاجات Invita الوريدية" },
    },
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "personality",
    tone: "sand",
    tab: { en: "Personality", ar: "الشخصية" },
    title: { en: "Personality & Talent DNA Report", ar: "تقرير الشخصية والمواهب الجيني" },
    tagline: {
      en: "The genetic side of who you are.",
      ar: "الجانب الجيني من شخصيتك.",
    },
    summary: {
      en: "Explore genetic tendencies linked to traits like curiosity, focus, stress response and sleep patterns. Genes are only part of the story — but a fascinating part.",
      ar: "استكشف الميول الجينية المرتبطة بصفات مثل الفضول والتركيز والاستجابة للضغط وأنماط النوم. الجينات جزء من القصة فقط — لكنه جزء مدهش.",
    },
    discover: [
      { en: "Tendencies around curiosity and novelty-seeking", ar: "الميل للفضول والبحث عن الجديد" },
      { en: "Stress response and resilience markers", ar: "مؤشرات الاستجابة للضغط والمرونة النفسية" },
      { en: "Chronotype — morning lark or night owl", ar: "النمط الزمني — صباحي أم ليلي" },
      { en: "Memory, focus and learning-style tendencies", ar: "ميول الذاكرة والتركيز وأسلوب التعلّم" },
    ],
    goodFor: [
      { en: "Self-discovery and personal growth", ar: "اكتشاف الذات والتطوّر الشخصي" },
      { en: "Understanding sleep and energy rhythms", ar: "فهم إيقاعات النوم والطاقة" },
      { en: "A fun conversation starter for the whole family", ar: "موضوع حديث ممتع للعائلة كلها" },
    ],
    sample: [
      { label: { en: "Novelty seeking", ar: "البحث عن الجديد" }, value: { en: "High", ar: "مرتفع" }, level: 74 },
      { label: { en: "Stress resilience", ar: "المرونة تحت الضغط" }, value: { en: "Balanced", ar: "متوازنة" }, level: 55 },
      { label: { en: "Chronotype", ar: "النمط الزمني" }, value: { en: "Evening", ar: "مسائي" }, level: 66 },
      { label: { en: "Working memory", ar: "الذاكرة العاملة" }, value: { en: "Typical", ar: "طبيعية" }, level: 48 },
    ],
    caution: {
      en: "Personality is shaped mostly by upbringing, experience and choice. Treat this report as insight and entertainment, not a label.",
      ar: "تتشكّل الشخصية غالبًا بالتربية والتجربة والاختيار. تعامل مع هذا التقرير كمعرفة وتسلية، لا كتصنيف.",
    },
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    slug: "all-in-one",
    tone: "night",
    tab: { en: "All in One", ar: "الباقة الشاملة" },
    title: { en: "All-in-One DNA Bundle", ar: "باقة الحمض النووي الشاملة" },
    tagline: {
      en: "Seven reports. One sample. The complete picture.",
      ar: "سبعة تقارير. عيّنة واحدة. الصورة الكاملة.",
    },
    summary: {
      en: "Get every report — ancestry, health, nutrition, pharmacogenetics, sports, skin and personality — from a single sample, at a better price than buying them one by one.",
      ar: "احصل على كل التقارير — الأصول والصحة والتغذية والاستجابة للأدوية والرياضة والبشرة والشخصية — من عيّنة واحدة، وبسعر أفضل من شرائها منفردة.",
    },
    discover: [
      { en: "All seven Invita DNA reports", ar: "تقارير Invita السبعة كاملة" },
      { en: "One home swab, one lab analysis", ar: "مسحة منزلية واحدة وتحليل مختبري واحد" },
      { en: "Cross-report insights — e.g. nutrition × sports", ar: "رؤى مترابطة بين التقارير — مثل التغذية × الرياضة" },
      { en: "A specialist walkthrough of your full results", ar: "مراجعة شاملة لنتائجك مع أخصائي" },
    ],
    goodFor: [
      { en: "Getting the whole picture in one go", ar: "الحصول على الصورة كاملة دفعة واحدة" },
      { en: "Best value per report", ar: "أفضل قيمة لكل تقرير" },
      { en: "Gifting someone who has everything", ar: "هدية لشخص لديه كل شيء" },
    ],
    sample: [
      { label: { en: "Ancestry", ar: "الأصول" }, value: { en: "Ready", ar: "جاهز" }, level: 100 },
      { label: { en: "Health", ar: "الصحة" }, value: { en: "Ready", ar: "جاهز" }, level: 100 },
      { label: { en: "Nutrition", ar: "التغذية" }, value: { en: "Ready", ar: "جاهز" }, level: 100 },
      { label: { en: "Pharma · Sports · Skin · Personality", ar: "الأدوية · الرياضة · البشرة · الشخصية" }, value: { en: "Ready", ar: "جاهز" }, level: 100 },
    ],
    extra: {
      title: { en: "Your full results, explained", ar: "نتائجك الكاملة مشروحة" },
      body: {
        en: "A private session with Invita's medical team connects the dots across all seven reports.",
        ar: "جلسة خاصة مع فريق Invita الطبي تربط النتائج بين التقارير السبعة.",
      },
      href: "medical-team",
      cta: { en: "Talk to the medical team", ar: "تحدّث مع الفريق الطبي" },
    },
    caution: {
      en: "Includes the health and pharmacogenetics reports — results are not a diagnosis and should be reviewed with a doctor before any medical decision.",
      ar: "تتضمّن تقريري الصحة والاستجابة للأدوية — النتائج ليست تشخيصًا ويجب مراجعتها مع طبيب قبل أي قرار طبي.",
    },
    priceIqd: null,
  },
];

export const DNA_BUNDLE_SLUG: DnaReportSlug = "all-in-one";

/** The seven single reports, in tile order (bundle excluded). */
export const DNA_SINGLE_REPORTS = DNA_REPORTS.filter((r) => r.slug !== DNA_BUNDLE_SLUG);

const BY_SLUG = new Map(DNA_REPORTS.map((r) => [r.slug, r]));

export function getDnaReport(slug: string): DnaReport | undefined {
  return BY_SLUG.get(slug as DnaReportSlug);
}

export function isDnaReportSlug(slug: string): slug is DnaReportSlug {
  return BY_SLUG.has(slug as DnaReportSlug);
}

/** WhatsApp deep link for ordering (or pricing) a specific report. */
export function dnaOrderWhatsappUrl(report: DnaReport, locale: Locale): string {
  const name = report.title[locale];
  return invitaWhatsappUrl(
    locale === "ar"
      ? `مرحبًا Invita، أرغب بطلب فحص الحمض النووي: ${name}. ما السعر ومتى يمكنكم زيارتي لأخذ المسحة المنزلية؟`
      : `Hi Invita, I'd like to order a DNA test: ${name}. What's the price and when can you visit for the home swab?`,
  );
}

/** WhatsApp line to Invita's medical team for a private results walkthrough. */
export function dnaMedicalTeamUrl(locale: Locale, reportName?: string): string {
  return invitaWhatsappUrl(
    locale === "ar"
      ? `مرحبًا Invita، أرغب بمراجعة خاصة لنتائج الحمض النووي مع الفريق الطبي${reportName ? ` (${reportName})` : ""}.`
      : `Hi Invita, I'd like a private walkthrough of my DNA results with your medical team${reportName ? ` (${reportName})` : ""}.`,
  );
}

/** Resolves a report hand-off: `medical-team` → WhatsApp, else the href as-is. */
export function resolveDnaExtraHref(href: string, locale: Locale, reportName?: string): string {
  return href === "medical-team" ? dnaMedicalTeamUrl(locale, reportName) : href;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

// ── Plans ────────────────────────────────────────────────────────────────

export type DnaPlanId = "single" | "seven" | "genome";

export type DnaPlan = {
  id: DnaPlanId;
  name: Localized;
  tagline: Localized;
  /** Lab method shown as a small badge. */
  method: Localized;
  features: Localized[];
  /** Visually emphasised as the recommended plan. */
  featured?: boolean;
  priceIqd: number | null;
  /** Render `priceIqd` as a starting price. */
  priceFrom?: boolean;
};

export const DNA_PLANS: DnaPlan[] = [
  {
    id: "single",
    name: { en: "Invita Single", ar: "Invita سينغل" },
    tagline: {
      en: "One report you choose — start with what you're most curious about.",
      ar: "تقرير واحد تختاره — ابدأ بما يثير فضولك أكثر.",
    },
    method: { en: "DNA panel", ar: "فحص لوحة جينية" },
    features: [
      { en: "Any one of the seven reports", ar: "أيّ تقرير من التقارير السبعة" },
      { en: "Add more reports later — same sample", ar: "أضف تقارير لاحقًا — من العيّنة نفسها" },
      { en: "Arabic & English digital report", ar: "تقرير رقمي بالعربية والإنجليزية" },
    ],
    priceIqd: DNA_PRICE_FROM_IQD,
    priceFrom: true,
  },
  {
    id: "seven",
    name: { en: "Invita Seven", ar: "Invita سفن" },
    tagline: {
      en: "All seven reports from one sample, with insights that connect them.",
      ar: "التقارير السبعة كاملة من عيّنة واحدة، مع رؤى تربط بينها.",
    },
    method: { en: "DNA panel", ar: "فحص لوحة جينية" },
    features: [
      { en: "Ancestry, health, nutrition, medicines, sports, skin & personality", ar: "الأصول والصحة والتغذية والأدوية والرياضة والبشرة والشخصية" },
      { en: "Cross-report insights", ar: "رؤى مترابطة بين التقارير" },
      { en: "Private walkthrough with our medical team", ar: "مراجعة خاصة مع فريقنا الطبي" },
      { en: "Better value than single reports", ar: "قيمة أفضل من التقارير المنفردة" },
    ],
    featured: true,
    priceIqd: null,
  },
  {
    id: "genome",
    name: { en: "Invita Genome", ar: "Invita جينوم" },
    tagline: {
      en: "Your whole genome, sequenced — the deepest look we offer.",
      ar: "جينومك الكامل، مُسلسَلًا — أعمق قراءة نقدّمها.",
    },
    method: { en: "Whole genome sequencing", ar: "تسلسل الجينوم الكامل" },
    features: [
      { en: "Reads nearly all of your 3 billion DNA letters", ar: "يقرأ تقريبًا كل أحرف حمضك النووي الثلاثة مليارات" },
      { en: "All seven reports included", ar: "يشمل التقارير السبعة كاملة" },
      { en: "Rare-variant and deeper health screening", ar: "فحص المتغيّرات النادرة وفحص صحي أعمق" },
      { en: "Re-analysable as science advances — no new sample", ar: "قابل لإعادة التحليل مع تقدّم العلم — دون عيّنة جديدة" },
      { en: "Your raw data files, yours to keep", ar: "ملفات بياناتك الخام، ملكك أنت" },
    ],
    priceIqd: null,
  },
];

export function dnaPlanWhatsappUrl(plan: DnaPlan, locale: Locale): string {
  const name = plan.name[locale];
  return invitaWhatsappUrl(
    locale === "ar"
      ? `مرحبًا Invita، أرغب بطلب ${name}. ما السعر ومتى يمكنكم زيارتي لأخذ المسحة المنزلية؟`
      : `Hi Invita, I'd like to order ${name}. What's the price and when can you visit for the home swab?`,
  );
}

/** Formats a plan / report price, prefixing "From" for starting prices. */
export function formatDnaPrice(priceIqd: number, locale: Locale, from = false): string {
  const amount = formatCurrency(priceIqd, locale);
  if (!from) return amount;
  return locale === "ar" ? `ابتداءً من ${amount}` : `From ${amount}`;
}
