import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/locale-link";
import { toLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import {
  DNA_BUNDLE_SLUG,
  DNA_PLANS,
  DNA_PRICE_FROM_IQD,
  DNA_REPORTS,
  INVITA_DNA_INSTAGRAM,
  INVITA_IV_SITE,
  dnaPlanWhatsappUrl,
  formatDnaPrice,
  getDnaReport,
  invitaWhatsappUrl,
  type DnaPlan,
} from "@/lib/reports";
import { DNA_IMAGES, DNA_REPORT_COVER, INVITA_INSTAGRAM_POSTS, INVITA_LOGO } from "@/lib/imagery";
import {
  CoverageStrip,
  DNA_TONE_ACCENT,
  DNA_TONE_CLASS,
  Gauge,
  GenomeField,
  KitArt,
} from "@/components/dna-art";
import {
  CellIcon,
  ChatIcon,
  CheckIcon,
  DnaReportIcon,
  HelixIcon,
  InstagramGlyph,
  KitIcon,
  NetworkIcon,
  ShieldIcon,
  UploadIcon,
  WhatsAppGlyph,
} from "@/components/dna-icons";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * Invita DNA Lab landing. Merges two reference information architectures —
 * a whole-genome-sequencing storefront (coverage comparison, collect →
 * sequence → discover, plan cards) and a multi-report DNA storefront (seven
 * reports, bundle, home-swab booking, raw-data upload, partners, FAQ) — into
 * one original Invita experience. Invita collects samples at home and ships
 * them to its laboratory partner, 24Genetics. Imagery is Invita's own (logo,
 * report covers, Instagram posts — never photos of people) alongside original
 * vector art in the official Invita palette.
 */
const COPY = {
  en: {
    metaTitle: "Whole Genome & DNA Tests in Iraq",
    metaDescription:
      "From focused DNA panels to whole genome sequencing. One cheek swab taken at home, seven clear reports analysed by 24Genetics, and a private walkthrough with Invita's medical team.",
    eyebrow: "Invita DNA Lab",
    heroTitle: ["Your genome, decoded.", "Your results, explained."],
    heroSub:
      "From focused DNA panels to whole genome sequencing — one painless cheek swab, taken at your home by an Invita specialist, becomes clear reports on your health, nutrition, medicines, fitness, skin, personality and ancestry. Then our medical team walks you through them, privately.",
    heroPrimary: "Find your test",
    heroSecondary: "Book a home swab",
    testsFrom: "Tests",
    heroTrust: ["Home swab collection", "Arabic & English reports", "No needles"],
    labLine: "Shipped cold-chain by DHL and analysed in Madrid by our laboratory partner, 24Genetics.",
    heroCardTag: "Whole genome sequencing",
    heroCardBody: "Nearly every letter of your DNA, read — with all seven reports included.",
    askPrice: "Ask for today's price",
    ribbon: [
      "Whole genome sequencing",
      "Seven reports from one sample",
      "Private medical walkthrough",
      "Your data stays yours",
      "Arabic & English",
      "Home swab collection",
      "Analysed by 24Genetics in Madrid",
      "DHL cold-chain shipping",
    ],
    genomeEyebrow: "Two ways to read your DNA",
    genomeTitle: "Read a few key lines — or the whole book.",
    genomeBody:
      "Your genome is roughly 3 billion letters long. A DNA panel reads a carefully chosen set of markers — perfect for focused reports. Whole genome sequencing reads nearly all of it, which means deeper screening, rare variants and data you can re-analyse for years.",
    genomeRows: [
      {
        name: "Invita Genome",
        method: "Whole genome sequencing",
        reads: "Nearly all ~3 billion letters",
        coverage: 1,
      },
      {
        name: "Invita Single & Seven",
        method: "DNA panel",
        reads: "700+ key genetic variants, chosen for each report",
        coverage: 0.07,
      },
    ],
    genomeCta: "Ask about Invita Genome",
    genomeMsg: "Hi Invita, I'd like to know more about whole genome sequencing (Invita Genome).",
    howEyebrow: "How it works",
    howTitle: "Collect. Sequence. Discover.",
    how: [
      {
        n: "01",
        title: "Collect",
        body: "Book a visit and an Invita specialist takes a painless cheek swab at your home — it only takes a few minutes.",
      },
      {
        n: "02",
        title: "Sequence",
        body: "We send your sealed sample by DHL cold-chain shipping to our laboratory partner, 24Genetics, in Madrid, which reads your DNA — a curated panel or your whole genome, depending on your plan.",
      },
      {
        n: "03",
        title: "Discover",
        body: "Clear reports arrive on WhatsApp, and a private session with our medical team turns them into next steps.",
      },
    ],
    example: "Example",
    plansEyebrow: "Choose your test",
    plansTitle: "Three depths. One simple sample.",
    plansSub: "Start focused or go all the way. Every plan includes home swab collection, Arabic & English reports and a private walkthrough on request.",
    featured: "Most chosen",
    planCta: "Order on WhatsApp",
    planMore: {
      single: { label: "Browse the reports", href: "#reports" },
      seven: { label: "See what's inside", href: `/${DNA_BUNDLE_SLUG}` },
      genome: { label: "How it compares", href: "#genome" },
    },
    reportsEyebrow: "The reports",
    reportsTitle: "Seven reports. One sample.",
    reportsSub: "Pick one, or unlock them all — every report runs on the sample you already gave.",
    learnMore: "Explore",
    pillars: [
      {
        key: "privacy",
        title: "Your DNA stays yours",
        body: "Reports are shared only with you. Nothing goes to employers or advertisers, and you can ask us to delete your data at any time.",
      },
      {
        key: "one",
        title: "One sample, for life",
        body: "Add reports later — or move up to whole genome — without another swab, subject to sample quality.",
      },
      {
        key: "expert",
        title: "Explained, privately",
        body: "Invita's medical team walks you through your results one-to-one and tells you what's worth acting on.",
      },
    ],
    kitEyebrow: "Your home visit",
    kitTitle: "We come to you.",
    kitItems: [
      "A trained Invita specialist",
      "Painless cheek swab — no needles",
      "Sample sealed with your unique ID",
      "Shipped cold-chain by DHL to 24Genetics, Madrid",
    ],
    steps: [
      { title: "Book", body: "Book online or message us on WhatsApp and choose your plan." },
      { title: "Home swab", body: "An Invita specialist visits and takes your cheek swab in minutes." },
      { title: "Lab analysis", body: "Invita ships your sealed sample by DHL cold-chain to our laboratory partner, 24Genetics, in Madrid." },
      { title: "Get answers", body: "Reports arrive on WhatsApp, with a private walkthrough." },
    ],
    registerCta: "Book a home swab",
    learnTitle: "Genetics, in plain language",
    learnItems: [
      {
        title: "Predisposition isn't destiny",
        body: "Most traits come from many genes plus lifestyle. A higher genetic tendency means “worth watching”, not “will happen”.",
      },
      {
        title: "What is a carrier?",
        body: "Carriers have one copy of a variant and are usually healthy, but can pass it on — it matters most when both partners carry the same one.",
      },
      {
        title: "Why medicines differ person to person",
        body: "Liver enzymes coded by your genes break down many medicines. Faster or slower enzymes can change how well a standard dose works.",
      },
    ],
    igEyebrow: "From our Instagram",
    igTitle: "Our DNA. Your health. Reimagined.",
    igBody: "Follow Invita DNA Lab for new reports, genetics explained in Arabic and English, and what's next from the Invita family.",
    igFollow: "Follow @invitadnalab",
    igTileBody: "Genetics, explained in Arabic & English.",
    igOpen: "Open on Instagram",
    ivTitle: "Also from Invita",
    ivBody: "Invita IV Vitamins Therapy — premium IV vitamin drips in Baghdad.",
    ivCta: "Visit invitadrips.com",
    rawTitle: "Tested somewhere else?",
    rawBody: "Send us your existing report or raw data file and our team will explain what it means — no new sample needed.",
    rawCta: "Send it on WhatsApp",
    rawMsg: "Hi Invita, I took a DNA test elsewhere and would like your team to explain my results. I'll send the report or raw data file here.",
    partnerTitle: "For clinics & partners",
    partnerBody: "Offer Invita DNA tests to your patients with partner pricing, clinical training and a dedicated support line.",
    partnerCta: "Become a partner",
    partnerMsg: "Hi Invita, I'm interested in offering Invita DNA tests to my patients.",
    faqTitle: "Questions, answered",
    faqs: [
      {
        q: "Which test should I choose?",
        a: "Curious about one area? Start with Invita Single. Want the full picture at the best value? Invita Seven. Want the deepest possible look, including rare variants and data you can re-analyse later? Invita Genome. Message us and we'll help you decide.",
      },
      {
        q: "What's the difference between a panel and whole genome sequencing?",
        a: "A panel reads a curated set of genetic markers chosen for specific reports. Whole genome sequencing reads nearly your entire genome, so it can pick up rarer variants and be re-analysed as research advances.",
      },
      {
        q: "How is the sample collected?",
        a: "An Invita specialist visits your home and takes a simple, painless cheek swab. It takes a few minutes and needs no needles. Please avoid eating, drinking or smoking for 30 minutes beforehand — we'll remind you.",
      },
      {
        q: "Who analyses my sample?",
        a: "Invita collects your sample and ships it by DHL cold-chain to our laboratory partner, 24Genetics, in Madrid, which carries out the analysis and produces your reports. Invita stays your point of contact throughout — from booking to your results walkthrough.",
      },
      {
        q: "How long until I get my results?",
        a: "It depends on the plan and the lab schedule — whole genome sequencing takes longer than panels. We confirm your expected date when your sample arrives and message you as soon as your reports are ready.",
      },
      {
        q: "Who can see my results?",
        a: "Only you. We share your reports with a doctor, family member or anyone else only when you ask us to.",
      },
      {
        q: "Is a DNA report a medical diagnosis?",
        a: "No. Genetic reports show tendencies and risks, not diagnoses. Health and medicine-related results should always be reviewed with a doctor — our medical team is a good place to start.",
      },
      {
        q: "Can children take a test?",
        a: "Tests for anyone under 18 must be booked and consented to by a parent or legal guardian. Message us and we'll advise which reports are appropriate.",
      },
    ],
    finalTitle: "One sample. A lifetime of answers.",
    finalBody: "Book your home swab on WhatsApp today — we'll help you choose the right depth.",
    finalCta: "Order on WhatsApp",
    finalMsg: "Hi Invita, I'd like to order a DNA test. Which one do you recommend for me?",
    disclaimer:
      "Invita DNA reports are for information and wellness purposes. They are not a diagnosis and do not replace medical advice. Always consult a qualified healthcare professional before acting on health or medicine-related results.",
  },
  ar: {
    metaTitle: "الجينوم الكامل وفحوصات DNA في العراق",
    metaDescription:
      "من فحوصات اللوحات الجينية المركّزة إلى تسلسل الجينوم الكامل. مسحة خدّ واحدة في منزلك، وسبعة تقارير واضحة يحلّلها مختبر 24Genetics، ومراجعة خاصة مع فريق Invita الطبي.",
    eyebrow: "مختبر Invita للحمض النووي",
    heroTitle: ["جينومك، مفكوك الشيفرة.", "ونتائجك، مشروحة بوضوح."],
    heroSub:
      "من اللوحات الجينية المركّزة إلى تسلسل الجينوم الكامل — مسحة خدّ واحدة بلا ألم يأخذها مختص من Invita في منزلك، تتحوّل إلى تقارير واضحة عن صحتك وغذائك وأدويتك ولياقتك وبشرتك وشخصيتك وأصولك. ثم يشرحها لك فريقنا الطبي بخصوصية تامة.",
    heroPrimary: "اعثر على فحصك",
    heroSecondary: "احجز مسحة منزلية",
    testsFrom: "الفحوصات",
    heroTrust: ["جمع العيّنة في المنزل", "تقارير بالعربية والإنجليزية", "بدون إبر"],
    labLine: "تُشحن بالتبريد عبر DHL وتُحلَّل في مدريد لدى شريكنا المخبري 24Genetics.",
    heroCardTag: "تسلسل الجينوم الكامل",
    heroCardBody: "قراءة تكاد تشمل كل حرف في حمضك النووي — مع التقارير السبعة كاملة.",
    askPrice: "اسأل عن سعر اليوم",
    ribbon: [
      "تسلسل الجينوم الكامل",
      "سبعة تقارير من عيّنة واحدة",
      "مراجعة طبية خاصة",
      "بياناتك ملكك",
      "بالعربية والإنجليزية",
      "جمع العيّنة في المنزل",
      "تحليل لدى 24Genetics في مدريد",
      "شحن مبرّد عبر DHL",
    ],
    genomeEyebrow: "طريقتان لقراءة حمضك النووي",
    genomeTitle: "اقرأ أهم السطور — أو الكتاب كاملًا.",
    genomeBody:
      "يتكوّن جينومك من نحو ٣ مليارات حرف. تقرأ اللوحة الجينية مجموعة مختارة بعناية من العلامات — مثالية للتقارير المركّزة. أما تسلسل الجينوم الكامل فيقرأ تقريبًا كل شيء، ما يعني فحصًا أعمق، ورصد المتغيّرات النادرة، وبيانات يمكن إعادة تحليلها لسنوات.",
    genomeRows: [
      {
        name: "Invita جينوم",
        method: "تسلسل الجينوم الكامل",
        reads: "تقريبًا كل الأحرف الثلاثة مليارات",
        coverage: 1,
      },
      {
        name: "Invita سينغل وسفن",
        method: "لوحة جينية",
        reads: "أكثر من ٧٠٠ متغيّر جيني أساسي، مختارة لكل تقرير",
        coverage: 0.07,
      },
    ],
    genomeCta: "اسأل عن Invita جينوم",
    genomeMsg: "مرحبًا Invita، أرغب بمعرفة المزيد عن تسلسل الجينوم الكامل (Invita جينوم).",
    howEyebrow: "كيف نعمل",
    howTitle: "اجمع. سلسِل. اكتشف.",
    how: [
      {
        n: "٠١",
        title: "اجمع العيّنة",
        body: "احجز زيارة، ويأخذ مختص من Invita مسحة خدّ بلا ألم في منزلك — لا تستغرق سوى دقائق.",
      },
      {
        n: "٠٢",
        title: "التسلسل",
        body: "نرسل عيّنتك المختومة بشحن مبرّد عبر DHL إلى شريكنا المخبري 24Genetics في مدريد، الذي يقرأ حمضك النووي — لوحة مختارة أو جينومك الكامل حسب خطتك.",
      },
      {
        n: "٠٣",
        title: "اكتشف",
        body: "تصلك تقارير واضحة على واتساب، وجلسة خاصة مع فريقنا الطبي تحوّلها إلى خطوات عملية.",
      },
    ],
    example: "مثال",
    plansEyebrow: "اختر فحصك",
    plansTitle: "ثلاثة أعماق. عيّنة واحدة بسيطة.",
    plansSub: "ابدأ بتقرير مركّز أو اذهب إلى أبعد مدى. كل خطة تشمل جمع العيّنة في المنزل، وتقارير بالعربية والإنجليزية، ومراجعة خاصة عند الطلب.",
    featured: "الأكثر اختيارًا",
    planCta: "اطلب عبر واتساب",
    planMore: {
      single: { label: "تصفّح التقارير", href: "#reports" },
      seven: { label: "ماذا تتضمّن", href: `/${DNA_BUNDLE_SLUG}` },
      genome: { label: "قارن بين الطريقتين", href: "#genome" },
    },
    reportsEyebrow: "التقارير",
    reportsTitle: "سبعة تقارير. عيّنة واحدة.",
    reportsSub: "اختر تقريرًا أو افتحها جميعًا — كل تقرير يُجرى على العيّنة التي قدّمتها.",
    learnMore: "استكشف",
    pillars: [
      {
        key: "privacy",
        title: "حمضك النووي ملكك",
        body: "نشارك التقارير معك أنت فقط. لا شيء يصل لأصحاب العمل أو المعلنين، ويمكنك طلب حذف بياناتك في أي وقت.",
      },
      {
        key: "one",
        title: "عيّنة واحدة مدى الحياة",
        body: "أضف تقارير لاحقًا — أو انتقل إلى الجينوم الكامل — دون مسحة جديدة، حسب جودة العيّنة.",
      },
      {
        key: "expert",
        title: "شرح خاص وواضح",
        body: "يرافقك فريق Invita الطبي في جلسة فردية خلال نتائجك ويخبرك بما يستحق التصرّف.",
      },
    ],
    kitEyebrow: "زيارتك المنزلية",
    kitTitle: "نأتي إليك.",
    kitItems: [
      "مختص مدرّب من Invita",
      "مسحة خدّ بلا ألم — بدون إبر",
      "عيّنة مختومة برقمك الخاص",
      "تُشحن مبرّدة عبر DHL إلى 24Genetics في مدريد",
    ],
    steps: [
      { title: "احجز", body: "احجز عبر الموقع أو راسلنا على واتساب واختر خطتك." },
      { title: "المسحة المنزلية", body: "يزورك مختص من Invita ويأخذ مسحة الخدّ خلال دقائق." },
      { title: "التحليل المخبري", body: "تشحن Invita عيّنتك المختومة بشحن مبرّد عبر DHL إلى شريكنا المخبري 24Genetics في مدريد." },
      { title: "احصل على الإجابات", body: "تصلك التقارير على واتساب مع مراجعة خاصة." },
    ],
    registerCta: "احجز مسحة منزلية",
    learnTitle: "علم الوراثة، بلغة بسيطة",
    learnItems: [
      {
        title: "الاستعداد ليس قدرًا",
        body: "معظم الصفات تأتي من جينات عديدة مع نمط الحياة. الميل الجيني الأعلى يعني «يستحق المتابعة» لا «سيحدث حتمًا».",
      },
      {
        title: "ماذا يعني أن تكون حاملًا؟",
        body: "الحامل لديه نسخة واحدة من المتغيّر وغالبًا يكون سليمًا، لكنه قد ينقلها — ويصبح الأمر مهمًا عندما يحمل الزوجان المتغيّر نفسه.",
      },
      {
        title: "لماذا يختلف تأثير الدواء من شخص لآخر",
        body: "إنزيمات الكبد التي تحدّدها جيناتك تكسّر كثيرًا من الأدوية. الإنزيمات الأسرع أو الأبطأ قد تغيّر فعالية الجرعة المعتادة.",
      },
    ],
    igEyebrow: "من حسابنا على إنستغرام",
    igTitle: "حمضنا النووي. صحتك. برؤية جديدة.",
    igBody: "تابع Invita DNA Lab لتعرف بالتقارير الجديدة، وشرح علم الوراثة بالعربية والإنجليزية، وجديد عائلة Invita.",
    igFollow: "تابع ‎@invitadnalab",
    igTileBody: "علم الوراثة، بشرح واضح بالعربية والإنجليزية.",
    igOpen: "افتح على إنستغرام",
    ivTitle: "من Invita أيضًا",
    ivBody: "Invita للعلاج الوريدي بالفيتامينات — جلسات فيتامينات وريدية فاخرة في بغداد.",
    ivCta: "زُر invitadrips.com",
    rawTitle: "أجريت الفحص في مكان آخر؟",
    rawBody: "أرسل لنا تقريرك أو ملف بياناتك الخام وسيشرح لك فريقنا ما يعنيه — دون الحاجة لعيّنة جديدة.",
    rawCta: "أرسله عبر واتساب",
    rawMsg: "مرحبًا Invita، أجريت فحص الحمض النووي في مكان آخر وأرغب بأن يشرح فريقكم نتائجي. سأرسل التقرير أو ملف البيانات الخام هنا.",
    partnerTitle: "للعيادات والشركاء",
    partnerBody: "قدّموا فحوصات Invita للحمض النووي لمرضاكم بأسعار خاصة للشركاء، وتدريب سريري، وخط دعم مخصّص.",
    partnerCta: "كن شريكًا",
    partnerMsg: "مرحبًا Invita، أرغب بتقديم فحوصات Invita للحمض النووي لمرضاي.",
    faqTitle: "أسئلة وأجوبة",
    faqs: [
      {
        q: "أي فحص أختار؟",
        a: "يثير فضولك جانب واحد؟ ابدأ بـ Invita سينغل. تريد الصورة الكاملة بأفضل قيمة؟ Invita سفن. تريد أعمق قراءة ممكنة، بما فيها المتغيّرات النادرة وبيانات يمكن إعادة تحليلها لاحقًا؟ Invita جينوم. راسلنا وسنساعدك على الاختيار.",
      },
      {
        q: "ما الفرق بين اللوحة الجينية وتسلسل الجينوم الكامل؟",
        a: "تقرأ اللوحة مجموعة مختارة من العلامات الجينية المخصّصة لتقارير محدّدة. أما تسلسل الجينوم الكامل فيقرأ تقريبًا جينومك بأكمله، لذا يمكنه رصد متغيّرات أندر وإعادة تحليله مع تقدّم الأبحاث.",
      },
      {
        q: "كيف تُجمع العيّنة؟",
        a: "يزورك مختص من Invita في منزلك ويأخذ مسحة خدّ بسيطة وغير مؤلمة. تستغرق دقائق ولا تحتاج إلى إبر. يرجى تجنّب الأكل والشرب والتدخين لمدة ٣٠ دقيقة قبلها — وسنذكّرك بذلك.",
      },
      {
        q: "من يحلّل عيّنتي؟",
        a: "تجمع Invita عيّنتك وتشحنها بالتبريد عبر DHL إلى شريكنا المخبري 24Genetics في مدريد، الذي يجري التحليل ويُعدّ تقاريرك. وتبقى Invita جهة تواصلك طوال الرحلة — من الحجز حتى مراجعة نتائجك.",
      },
      {
        q: "متى تصلني النتائج؟",
        a: "تعتمد المدة على الخطة وجدول المختبر — ويستغرق تسلسل الجينوم الكامل وقتًا أطول من اللوحات. نؤكّد لك الموعد المتوقع عند وصول عيّنتك ونراسلك فور جاهزية تقاريرك.",
      },
      {
        q: "من يستطيع رؤية نتائجي؟",
        a: "أنت فقط. لا نشارك تقاريرك مع طبيب أو أحد أفراد العائلة أو أي شخص آخر إلا بطلب منك.",
      },
      {
        q: "هل تقرير الحمض النووي تشخيص طبي؟",
        a: "لا. التقارير الجينية تُظهر ميولًا ومخاطر، لا تشخيصات. يجب دائمًا مراجعة النتائج المتعلقة بالصحة والأدوية مع طبيب — وفريقنا الطبي نقطة بداية جيدة.",
      },
      {
        q: "هل يمكن للأطفال إجراء الفحص؟",
        a: "يجب أن يحجز فحوصات من هم دون ١٨ عامًا ويوافق عليها أحد الوالدين أو الوصي القانوني. راسلنا وسننصحك بالتقارير المناسبة.",
      },
    ],
    finalTitle: "عيّنة واحدة. إجابات مدى الحياة.",
    finalBody: "احجز مسحتك المنزلية على واتساب اليوم — وسنساعدك على اختيار العمق المناسب.",
    finalCta: "اطلب عبر واتساب",
    finalMsg: "مرحبًا Invita، أرغب بطلب فحص الحمض النووي. أي فحص تنصحونني به؟",
    disclaimer:
      "تقارير Invita للحمض النووي لأغراض المعرفة والعافية. وهي ليست تشخيصًا ولا تغني عن الاستشارة الطبية. استشر دائمًا مختصًا صحيًا مؤهلًا قبل التصرّف بناءً على النتائج المتعلقة بالصحة أو الأدوية.",
  },
} as const;

const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6";
const eyebrowCls = "text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iv-gold-ink)]";
const h2Cls = "text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--iv-navy)]";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale === "ar" ? "ar" : "en"];
  return pageMetadata({
    locale: toLocale(locale),
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "",
  });
}

export default async function InvitaDnaPage({ params }: PageProps) {
  const { locale } = await params;
  const loc = (locale === "ar" ? "ar" : "en") as Locale;
  const copy = COPY[loc];
  const isRtl = loc === "ar";
  const arrow = isRtl ? "←" : "→";
  const genomePlan = DNA_PLANS.find((p) => p.id === "genome")!;
  const nutrition = getDnaReport("nutrition")!;
  const sports = getDnaReport("sports")!;
  const discoverRows = [nutrition.sample[0], nutrition.sample[2], sports.sample[2]];

  return (
    <div className="overflow-x-clip">
      {/* Hero ----------------------------------------------------------- */}
      <section className="iv-grain relative overflow-hidden bg-[var(--iv-night)] text-[var(--iv-cream)]">
        <div
          className="pointer-events-none absolute -top-40 end-[-10%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,68,0.24),transparent_65%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-48 start-[-12%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(27,58,140,0.7),transparent_65%)]"
          aria-hidden
        />
        <div className={`${wrap} grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24`}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 py-1.5 pe-3.5 ps-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--iv-gold)] ring-1 ring-[var(--iv-gold)]/40">
              <Image src={INVITA_LOGO.mark.src} width={INVITA_LOGO.mark.width} height={INVITA_LOGO.mark.height} alt="" className="h-5 w-5" />
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 text-[clamp(2.4rem,1.4rem+4.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              <span className="block">{copy.heroTitle[0]}</span>
              <span className="block text-[var(--iv-gold)]">{copy.heroTitle[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--iv-cream)]/75 sm:text-lg">
              {copy.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#plans"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--iv-gold)] px-7 text-sm font-semibold text-[var(--iv-navy)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-gold-soft)]"
              >
                {copy.heroPrimary} <span aria-hidden>{arrow}</span>
              </Link>
              <Link
                href="/book"
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-[var(--iv-cream)] ring-1 ring-white/30 transition hover:bg-white/10"
              >
                <KitIcon className="h-4 w-4" />
                {copy.heroSecondary}
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--iv-cream)]/70">
              <li className="inline-flex items-center gap-2 font-semibold text-[var(--iv-gold)]">
                <CheckIcon className="h-4 w-4" />
                {copy.testsFrom} {formatDnaPrice(DNA_PRICE_FROM_IQD, loc, true).replace(/^From /, "from ")}
              </li>
              {copy.heroTrust.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-[var(--iv-gold)]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--iv-cream)]/55">{copy.labLine}</p>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--iv-radius)] ring-1 ring-white/10 lg:aspect-[4/5]">
              <Image
                src={DNA_IMAGES.helix.src}
                alt={DNA_IMAGES.helix.alt[loc]}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
                style={{ objectPosition: DNA_IMAGES.helix.position }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--iv-night),transparent_45%)]" aria-hidden />
            </div>
            <div className="iv-float relative -mt-14 ms-auto w-[min(100%,20rem)] rounded-3xl bg-[var(--iv-paper)] p-5 text-[var(--iv-navy)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] sm:-mt-20 sm:me-6">
              <p className="inline-flex rounded-full bg-[var(--iv-navy)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--iv-gold)]">
                {copy.heroCardTag}
              </p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{genomePlan.name[loc]}</p>
              <p className="mt-1 text-sm leading-snug text-[var(--iv-muted)]">{copy.heroCardBody}</p>
              <a
                href={dnaPlanWhatsappUrl(genomePlan, loc)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--iv-navy)] text-sm font-semibold text-[var(--iv-cream)] transition hover:bg-[var(--iv-night)]"
              >
                <WhatsAppGlyph />
                {genomePlan.priceIqd ? formatDnaPrice(genomePlan.priceIqd, loc, genomePlan.priceFrom) : copy.askPrice}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ribbon --------------------------------------------------------- */}
      <div className="overflow-hidden border-y border-[var(--iv-gold)]/30 bg-[var(--iv-navy)] py-3 text-[var(--iv-cream)]">
        <div className="iv-marquee flex w-max">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center gap-10 pe-10 text-sm font-medium" aria-hidden={dup === 1}>
              {copy.ribbon.map((line) => (
                <li key={line} className="inline-flex items-center gap-10 whitespace-nowrap">
                  {line}
                  <span className="text-[var(--iv-gold)]" aria-hidden>✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Whole genome vs panel ----------------------------------------- */}
      <section id="genome" className="scroll-mt-28 py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]`}>
          <div>
            <p className={eyebrowCls}>{copy.genomeEyebrow}</p>
            <h2 className={`mt-4 ${h2Cls}`}>{copy.genomeTitle}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--iv-muted)] sm:text-lg">{copy.genomeBody}</p>
            <a
              href={invitaWhatsappUrl(copy.genomeMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--iv-navy)] px-7 text-sm font-semibold text-[var(--iv-cream)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-night)]"
            >
              <WhatsAppGlyph />
              {copy.genomeCta}
            </a>
          </div>
          <div className="space-y-4">
            {copy.genomeRows.map((row, i) => (
              <div
                key={row.name}
                className={`rounded-[var(--iv-radius)] p-6 sm:p-7 ${
                  i === 0
                    ? "bg-[var(--iv-night)] text-[var(--iv-cream)] shadow-[0_30px_60px_-34px_var(--iv-night)]"
                    : "bg-white text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)]"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-lg font-semibold tracking-[-0.01em]">{row.name}</p>
                  <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${i === 0 ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-ink)]"}`}>
                    {row.method}
                  </p>
                </div>
                <CoverageStrip coverage={row.coverage} seed={7 + i} className="mt-5 h-9 w-full" />
                <p className={`mt-4 text-sm ${i === 0 ? "text-[var(--iv-cream)]/75" : "text-[var(--iv-muted)]"}`}>{row.reads}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works --------------------------------------------------- */}
      <section id="how" className="scroll-mt-28 bg-[var(--iv-cream)] py-20 sm:py-28">
        <div className={wrap}>
          <p className={eyebrowCls}>{copy.howEyebrow}</p>
          <h2 className={`mt-4 ${h2Cls}`}>{copy.howTitle}</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {copy.how.map((step, i) => {
              const StepIcon = [CellIcon, HelixIcon, NetworkIcon][i];
              return (
              <article key={step.n} className="flex flex-col rounded-[var(--iv-radius)] bg-[var(--iv-paper)] p-6 ring-1 ring-[var(--iv-line)] sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--iv-navy)] text-[var(--iv-gold)]">
                      <StepIcon className="h-6 w-6" />
                    </span>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-[var(--iv-gold-ink)]">{step.n}</span>
                </div>
                <div className="mt-6 grid min-h-[11.5rem] place-items-center rounded-2xl bg-white p-4 ring-1 ring-[var(--iv-line)]/70">
                  {i === 0 ? (
                    <KitArt className="w-full max-w-[15rem]" />
                  ) : i === 1 ? (
                    <div className="w-full rounded-xl bg-[var(--iv-night)] p-4">
                      <GenomeField className="w-full" />
                    </div>
                  ) : (
                    <ul className="w-full space-y-2.5">
                      {discoverRows.map((row) => (
                        <li key={row.label.en} className="flex items-center justify-between gap-3 rounded-xl bg-[var(--iv-paper)] px-3 py-2">
                          <span className="text-sm font-medium">{row.label[loc]}</span>
                          <Gauge
                            value={row.level}
                            label={copy.example}
                            size={64}
                            accent="var(--iv-gold)"
                            track="var(--iv-line)"
                            className="text-[var(--iv-navy)] [&_span:first-child]:text-base"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-[var(--iv-muted)]">{step.body}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans ---------------------------------------------------------- */}
      <section id="plans" className="scroll-mt-28 py-20 sm:py-28">
        <div className={wrap}>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="max-w-2xl">
              <p className={eyebrowCls}>{copy.plansEyebrow}</p>
              <h2 className={`mt-4 ${h2Cls}`}>{copy.plansTitle}</h2>
              <p className="mt-4 text-base text-[var(--iv-muted)] sm:text-lg">{copy.plansSub}</p>
            </div>
            <div className="relative hidden aspect-[16/7] overflow-hidden rounded-[var(--iv-radius)] ring-1 ring-[var(--iv-line)] lg:block">
              <Image
                src={DNA_IMAGES.invitaCapsules.src}
                alt={DNA_IMAGES.invitaCapsules.alt[loc]}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {DNA_PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                loc={loc}
                arrow={arrow}
                featuredLabel={copy.featured}
                askPrice={copy.askPrice}
                cta={copy.planCta}
                more={copy.planMore[plan.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reports -------------------------------------------------------- */}
      <section id="reports" className="scroll-mt-28 bg-[var(--iv-cream)] py-20 sm:py-28">
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className={eyebrowCls}>{copy.reportsEyebrow}</p>
              <h2 className={`mt-4 ${h2Cls}`}>{copy.reportsTitle}</h2>
            </div>
            <p className="max-w-sm text-[var(--iv-muted)]">{copy.reportsSub}</p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DNA_REPORTS.map((r, i) => {
              const cover = DNA_REPORT_COVER[r.slug];
              // A photo sits under a dark scrim, so its card takes light text
              // whatever the report's own tone is.
              const tone = cover ? "night" : r.tone;
              return (
              <li
                key={r.slug}
                className={i === 0 ? "sm:col-span-2 lg:row-span-2" : r.slug === DNA_BUNDLE_SLUG ? "sm:col-span-2" : ""}
              >
                <Link
                  href={`/${r.slug}`}
                  className={`group relative isolate flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-[var(--iv-radius)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-30px_var(--iv-night)] ${DNA_TONE_CLASS[tone]}`}
                >
                  {cover ? (
                    <>
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        sizes={
                          i === 0 || r.slug === DNA_BUNDLE_SLUG
                            ? "(min-width: 1024px) 50vw, 100vw"
                            : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                        style={{ objectPosition: cover.position }}
                      />
                      <div
                        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--iv-night)_12%,color-mix(in_srgb,var(--iv-night)_45%,transparent)_58%,color-mix(in_srgb,var(--iv-night)_10%,transparent))]"
                        aria-hidden
                      />
                    </>
                  ) : null}
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-current/20">
                      <DnaReportIcon slug={r.slug} className="h-6 w-6" />
                    </span>
                    <Gauge
                      value={r.sample[0].level}
                      label={copy.example}
                      size={i === 0 ? 128 : 92}
                      accent={DNA_TONE_ACCENT[tone]}
                      track="color-mix(in srgb, currentColor 18%, transparent)"
                    />
                  </div>
                  {i === 0 ? (
                    <dl className="mt-8 space-y-4">
                      {r.sample.slice(0, 3).map((row) => (
                        <div key={row.label.en}>
                          <div className="flex items-baseline justify-between gap-3 text-sm">
                            <dt className="opacity-80">{row.label[loc]}</dt>
                            <dd className="font-semibold tabular-nums">{row.value[loc]}</dd>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
                            <div className="h-full rounded-full bg-[var(--iv-gold)]" style={{ width: `${row.level}%` }} />
                          </div>
                        </div>
                      ))}
                      <p className="text-[11px] uppercase tracking-[0.14em] opacity-50">{copy.example}</p>
                    </dl>
                  ) : r.slug === DNA_BUNDLE_SLUG ? (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-hidden>
                      {DNA_REPORTS.filter((x) => x.slug !== DNA_BUNDLE_SLUG).map((x) => (
                        <li key={x.slug} className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[var(--iv-gold)] ring-1 ring-white/10">
                          <DnaReportIcon slug={x.slug} className="h-5 w-5" />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-8">
                    <p className={`font-semibold tracking-[-0.02em] ${i === 0 ? "text-3xl" : "text-xl"}`}>{r.title[loc]}</p>
                    <p className="mt-2 text-sm leading-snug opacity-75">{i === 0 ? r.summary[loc] : r.tagline[loc]}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                      {copy.learnMore}
                      <span aria-hidden className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{arrow}</span>
                    </span>
                  </div>
                </Link>
              </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Instagram ------------------------------------------------------ */}
      <section id="instagram" className="iv-grain relative scroll-mt-28 overflow-hidden bg-[var(--iv-night)] py-20 text-[var(--iv-cream)] sm:py-28">
        <div
          className="pointer-events-none absolute -top-56 start-[20%] -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(27,58,140,0.75),transparent_65%)]"
          aria-hidden
        />
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iv-gold)]">{copy.igEyebrow}</p>
              <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{copy.igTitle}</h2>
              <p className="mt-4 text-[var(--iv-cream)]/70 sm:text-lg">{copy.igBody}</p>
            </div>
            <a
              href={INVITA_DNA_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-[var(--iv-gold)] px-7 text-sm font-semibold text-[var(--iv-navy)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-gold-soft)]"
            >
              <InstagramGlyph />
              {copy.igFollow}
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {INVITA_INSTAGRAM_POSTS.map((post, i) => (
              <li
                key={post.src}
                className={i === 0 ? "col-span-2 row-span-2 aspect-square" : i === 2 ? "row-span-2" : "aspect-square"}
              >
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.caption[loc]} — ${copy.igOpen}`}
                  className="group relative block h-full overflow-hidden rounded-[var(--iv-radius)] bg-[var(--iv-navy)] ring-1 ring-white/10"
                >
                  <Image
                    src={post.src}
                    alt={post.alt[loc]}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    style={{ objectPosition: post.position }}
                  />
                  <span
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[color-mix(in_srgb,var(--iv-night)_70%,transparent)] text-[var(--iv-gold)] ring-1 ring-white/15 backdrop-blur-sm"
                    aria-hidden
                  >
                    <InstagramGlyph className="h-4 w-4" />
                  </span>
                  <p
                    className={`absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(to_top,var(--iv-night)_40%,transparent)] p-4 pt-12 font-semibold leading-snug opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5 sm:pt-14 ${
                      i === 0 ? "text-lg sm:text-xl" : "text-sm"
                    }`}
                    aria-hidden
                  >
                    {post.caption[loc]}
                  </p>
                </a>
              </li>
            ))}
            <li className="aspect-square">
              <a
                href={INVITA_DNA_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-[var(--iv-radius)] bg-[var(--iv-gold)] p-5 text-[var(--iv-navy)] transition hover:bg-[var(--iv-gold-soft)] sm:p-6"
              >
                <Image src={INVITA_LOGO.markNavy.src} width={INVITA_LOGO.markNavy.width} height={INVITA_LOGO.markNavy.height} alt="" className="h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold sm:text-base" dir="ltr">@invitadnalab</p>
                  <p className="mt-1 text-xs leading-snug opacity-80 sm:text-sm">{copy.igTileBody}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                    {copy.igOpen}
                    <span aria-hidden className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{arrow}</span>
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Pillars -------------------------------------------------------- */}
      <section className="py-20 sm:py-24">
        <div className={`${wrap} grid gap-5 md:grid-cols-3`}>
          {copy.pillars.map((p) => {
            const Icon = p.key === "privacy" ? ShieldIcon : p.key === "one" ? HelixIcon : ChatIcon;
            return (
              <article key={p.key} className="rounded-[var(--iv-radius)] bg-white p-7 ring-1 ring-[var(--iv-line)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--iv-navy)] text-[var(--iv-gold)]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--iv-muted)]">{p.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Kit + steps ---------------------------------------------------- */}
      <section className="pb-20 sm:pb-28">
        <div className={`${wrap} grid gap-10 rounded-[calc(var(--iv-radius)+8px)] bg-[var(--iv-navy)] p-6 text-[var(--iv-cream)] sm:p-10 lg:grid-cols-2 lg:p-14`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iv-gold)]">{copy.kitEyebrow}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em]">{copy.kitTitle}</h2>
            <div className="mt-8 rounded-3xl bg-[var(--iv-paper)] p-6">
              <KitArt className="mx-auto w-full max-w-sm" />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {copy.kitItems.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--iv-gold)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:ps-6">
            <ol className="relative space-y-7 border-s border-dashed border-[var(--iv-gold)]/40 ps-8 lg:mt-16">
              {copy.steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -start-[3.05rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-[var(--iv-gold)] text-sm font-bold text-[var(--iv-navy)] ring-4 ring-[var(--iv-navy)]">
                    {loc === "ar" ? (i + 1).toLocaleString("ar-IQ") : i + 1}
                  </span>
                  <p className="text-lg font-semibold">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--iv-cream)]/70">{s.body}</p>
                </li>
              ))}
            </ol>
            <Link
              href="/book"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--iv-gold)] px-7 text-sm font-semibold text-[var(--iv-navy)] transition hover:bg-[var(--iv-gold-soft)]"
            >
              <KitIcon className="h-4 w-4" />
              {copy.registerCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Genetics in plain language ------------------------------------- */}
      <section className="pb-20 sm:pb-28">
        <div className={wrap}>
          <h2 className={h2Cls}>{copy.learnTitle}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {copy.learnItems.map((item, i) => (
              <article key={item.title} className="group overflow-hidden rounded-[var(--iv-radius)] bg-white ring-1 ring-[var(--iv-line)]">
                <div className={`grid h-36 place-items-center ${DNA_TONE_CLASS[(["night", "gold", "navy"] as const)[i]]}`}>
                  <DnaReportIcon slug={(["health", "ancestry", "pharma"] as const)[i]} className="h-14 w-14 opacity-90 transition duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--iv-muted)]">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Raw data + partners ------------------------------------------- */}
      <section className="pb-20 sm:pb-28">
        <div className={`${wrap} grid gap-5 md:grid-cols-2 lg:grid-cols-3`}>
          <article className="flex flex-col justify-between gap-6 rounded-[var(--iv-radius)] bg-[var(--iv-sand)] p-7 sm:p-9">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--iv-navy)] text-[var(--iv-gold)]">
                <UploadIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{copy.rawTitle}</h3>
              <p className="mt-2 text-[var(--iv-muted)]">{copy.rawBody}</p>
            </div>
            <a
              href={invitaWhatsappUrl(copy.rawMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[var(--iv-navy)] px-7 text-sm font-semibold text-[var(--iv-cream)] transition hover:bg-[var(--iv-night)]"
            >
              <WhatsAppGlyph />
              {copy.rawCta}
            </a>
          </article>
          <article className="iv-grain flex flex-col justify-between gap-6 overflow-hidden rounded-[var(--iv-radius)] bg-[var(--iv-night)] p-7 text-[var(--iv-cream)] sm:p-9">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--iv-gold)] text-[var(--iv-navy)]">
                <ChatIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{copy.partnerTitle}</h3>
              <p className="mt-2 text-[var(--iv-cream)]/70">{copy.partnerBody}</p>
            </div>
            <a
              href={invitaWhatsappUrl(copy.partnerMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[var(--iv-gold)] px-7 text-sm font-semibold text-[var(--iv-navy)] transition hover:bg-[var(--iv-gold-soft)]"
            >
              <WhatsAppGlyph />
              {copy.partnerCta}
            </a>
          </article>
          <article className="group flex flex-col overflow-hidden rounded-[var(--iv-radius)] bg-white ring-1 ring-[var(--iv-line)] md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-full lg:aspect-[16/10] lg:min-h-0">
              <Image
                src={DNA_IMAGES.ivStillLife.src}
                alt={DNA_IMAGES.ivStillLife.alt[loc]}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
                style={{ objectPosition: DNA_IMAGES.ivStillLife.position }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-7 sm:p-9">
              <div>
                <p className={eyebrowCls}>{copy.ivTitle}</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Invita IV Drips</p>
                <p className="mt-2 text-[var(--iv-muted)]">{copy.ivBody}</p>
              </div>
              <a
                href={INVITA_IV_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-fit items-center gap-2 rounded-full px-7 text-sm font-semibold text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)] transition hover:bg-[var(--iv-cream)]"
              >
                {copy.ivCta} <span aria-hidden>{arrow}</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------ */}
      <section id="faq" className="scroll-mt-28 pb-20 sm:pb-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.6fr]`}>
          <h2 className={h2Cls}>{copy.faqTitle}</h2>
          <div className="divide-y divide-[var(--iv-line)] rounded-[var(--iv-radius)] bg-white ring-1 ring-[var(--iv-line)]">
            {copy.faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--iv-cream)] text-[var(--iv-gold-ink)] transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--iv-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA ------------------------------------------------------ */}
      <section className="iv-grain relative overflow-hidden bg-[var(--iv-night)] text-[var(--iv-cream)]">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-80 w-[48rem] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(217,179,68,0.3),transparent)]"
          aria-hidden
        />
        <div className={`${wrap} py-20 text-center sm:py-28`}>
          <Image src={INVITA_LOGO.mark.src} width={INVITA_LOGO.mark.width} height={INVITA_LOGO.mark.height} alt="" className="mx-auto mb-8 h-14 w-14" />
          <h2 className="mx-auto max-w-3xl text-[clamp(2rem,1.3rem+3vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {copy.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[var(--iv-cream)]/70 sm:text-lg">{copy.finalBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={invitaWhatsappUrl(copy.finalMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--iv-gold)] px-7 text-sm font-semibold text-[var(--iv-navy)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-gold-soft)]"
            >
              <WhatsAppGlyph />
              {copy.finalCta}
            </a>
            <Link
              href="/book"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold ring-1 ring-white/30 transition hover:bg-white/10"
            >
              <KitIcon className="h-4 w-4" />
              {copy.registerCta}
            </Link>
          </div>
          <p className="mx-auto mt-14 max-w-3xl text-xs leading-relaxed text-[var(--iv-cream)]/50">{copy.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}

function PlanCard({
  plan,
  loc,
  arrow,
  featuredLabel,
  askPrice,
  cta,
  more,
}: {
  plan: DnaPlan;
  loc: Locale;
  arrow: string;
  featuredLabel: string;
  askPrice: string;
  cta: string;
  more: { label: string; href: string };
}) {
  const dark = plan.featured || plan.id === "genome";
  const surface = plan.featured
    ? "bg-[var(--iv-navy)] text-[var(--iv-cream)] shadow-[0_40px_80px_-40px_var(--iv-night)] lg:-translate-y-3"
    : plan.id === "genome"
      ? "iv-grain bg-[var(--iv-night)] text-[var(--iv-cream)]"
      : "bg-white text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)]";
  const MoreLink = more.href.startsWith("#") ? "a" : Link;
  return (
    <article className={`relative flex flex-col overflow-hidden rounded-[var(--iv-radius)] p-7 sm:p-8 ${surface}`}>
      {plan.featured ? (
        <span className="absolute end-6 top-6 rounded-full bg-[var(--iv-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--iv-navy)]">
          {featuredLabel}
        </span>
      ) : null}
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-ink)]"}`}>
        {plan.method[loc]}
      </p>
      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{plan.name[loc]}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-[var(--iv-cream)]/70" : "text-[var(--iv-muted)]"}`}>{plan.tagline[loc]}</p>
      <p className="mt-6 text-2xl font-semibold tracking-[-0.02em]">
        {plan.priceIqd ? formatDnaPrice(plan.priceIqd, loc, plan.priceFrom) : <span className="text-base font-medium opacity-80">{askPrice}</span>}
      </p>
      <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 text-sm ${dark ? "border-white/15" : "border-[var(--iv-line)]"}`}>
        {plan.features.map((f) => (
          <li key={f.en} className="flex items-start gap-2.5">
            <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-ink)]"}`} />
            {f[loc]}
          </li>
        ))}
      </ul>
      <a
        href={dnaPlanWhatsappUrl(plan, loc)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
          dark
            ? "bg-[var(--iv-gold)] text-[var(--iv-navy)] hover:bg-[var(--iv-gold-soft)]"
            : "bg-[var(--iv-navy)] text-[var(--iv-cream)] hover:bg-[var(--iv-night)]"
        }`}
      >
        <WhatsAppGlyph />
        {cta}
      </a>
      <MoreLink
        href={more.href}
        className={`mt-3 text-center text-sm font-semibold underline-offset-4 hover:underline ${dark ? "text-[var(--iv-cream)]/80" : "text-[var(--iv-navy)]/80"}`}
      >
        {more.label} <span aria-hidden>{arrow}</span>
      </MoreLink>
    </article>
  );
}
