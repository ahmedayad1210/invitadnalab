import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/locale-link";
import type { Locale } from "@/lib/i18n";
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
  invitaWhatsappUrl,
  type DnaPlan,
} from "@/lib/reports";
import { DNA_IMAGES, DNA_REPORT_COVER, DNA_VIDEOS, INVITA_INSTAGRAM_POSTS, INVITA_LOGO } from "@/lib/imagery";
import { CoverageStrip, DNA_TONE_ACCENT, DNA_TONE_CLASS, Gauge, KitArt } from "@/components/dna-art";
import {
  ChatIcon,
  CheckIcon,
  DnaReportIcon,
  FlaskIcon,
  HelixIcon,
  InstagramGlyph,
  KitIcon,
  NetworkIcon,
  ReportIcon,
  ShieldIcon,
  TruckIcon,
  UploadIcon,
  WhatsAppGlyph,
} from "@/components/dna-icons";
import { ArrowLong, CAPTION, SlabHeading, notch } from "@/components/brand-ui";
import { HeroSlider, type HeroSlide } from "@/components/hero-slider";
import { ProcessArc } from "@/components/process-arc";
import { LoopVideo } from "@/components/loop-video";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * Invita DNA Lab landing, in the clinical layout: a light hero that steps
 * through Invita's five promises beside the helix, a "what is" split, the
 * sample's route from swab to answers, the genome product, plans and
 * reports, Instagram, and a photo band that hands off to WhatsApp. Invita
 * collects samples at home and ships them to its laboratory partner,
 * 24Genetics, in Madrid. All copy is Invita's, in Arabic and English.
 */

const COPY = {
  en: {
    metaTitle: "Whole Genome & DNA Tests in Iraq",
    metaDescription:
      "From focused DNA panels to whole genome sequencing. One cheek swab taken at home, seven clear reports analysed by 24Genetics, and a private walkthrough with Invita's medical team.",
    heroLabels: { region: "Invita DNA Lab", prev: "Previous", next: "Next", slide: "Slide" },
    heroSlides: [
      {
        lead: "Your genome, ",
        accent: "decoded",
        tail: " and explained.",
        body: "From focused DNA panels to whole genome sequencing: one painless cheek swab at home becomes clear reports, and our medical team walks you through them, privately.",
        cta: { label: "Find your test", href: "#plans" },
      },
      {
        lead: "Seven reports. ",
        accent: "One sample",
        tail: ".",
        body: "Health, nutrition, medicines, fitness, skin, personality and ancestry, all read from the same swab. Start with one and add the rest later.",
        cta: { label: "Explore the reports", href: "#reports" },
      },
      {
        lead: "We come ",
        accent: "to your home",
        tail: ".",
        body: "A trained Invita specialist visits you and takes a painless cheek swab in minutes. No needles, no clinic visit.",
        cta: { label: "Book a home swab", href: "/book", icon: "kit" },
      },
      {
        lead: "Analysed in ",
        accent: "Madrid",
        tail: " by 24Genetics.",
        body: "Your sealed sample travels by DHL cold-chain to our laboratory partner, 24Genetics, which reads your DNA.",
        cta: { label: "See the process", href: "#process" },
      },
      {
        lead: "Results in ",
        accent: "Arabic and English",
        tail: ".",
        body: "Reports arrive on WhatsApp, and a private session with our medical team turns them into next steps.",
        cta: { label: "Order on WhatsApp", href: "wa", icon: "whatsapp" },
      },
    ],
    testsFrom: "Tests",
    heroTrust: ["Home swab collection", "Arabic & English reports", "No needles"],
    heroCardTag: "Whole genome sequencing",
    heroCardBody: "Nearly every letter of your DNA, read, with all seven reports included.",
    askPrice: "Ask for today's price",
    precision: { lead: "Your DNA, ", accent: "read with precision", tail: "." },
    whatTitle: { lead: "What is ", accent: "Invita DNA Lab", tail: "?" },
    whatIntro:
      "Genetic testing, brought home in Iraq. We collect your sample, our laboratory partner 24Genetics reads it, and our medical team explains what it means for you and your family.",
    whatItems: [
      {
        key: "genome",
        title: "Whole genome sequencing",
        body: "Nearly every letter of your DNA, read, with all seven reports included.",
      },
      {
        key: "reports",
        title: "Seven DNA reports",
        body: "Focused panels for health, nutrition, medicines, fitness, skin, personality and ancestry.",
      },
      {
        key: "privacy",
        title: "Your DNA stays yours",
        body: "Reports are shared only with you. Nothing goes to employers or advertisers, and you can ask us to delete your data at any time.",
      },
      {
        key: "expert",
        title: "Explained, privately",
        body: "Invita's medical team walks you through your results one-to-one and tells you what's worth acting on.",
      },
    ],
    processTitle: { lead: "Our process: ", accent: "from swab to answers", tail: "" },
    processSub: "Five steps, and Invita stays your point of contact at every one of them.",
    process: [
      { title: "Book", body: "Message us on WhatsApp or book online, and choose your test." },
      { title: "Home swab", body: "An Invita specialist takes a painless cheek swab at your home." },
      { title: "Cold-chain shipping", body: "Your sealed sample travels by DHL cold-chain to Madrid." },
      { title: "Lab analysis", body: "24Genetics reads your DNA: a curated panel or your whole genome." },
      { title: "Your results", body: "Reports arrive on WhatsApp, with a private walkthrough by our medical team." },
    ],
    featureName: "Invita Genome",
    featureTitle: { lead: "Whole genome ", accent: "sequencing", tail: "" },
    featureBody:
      "The deepest look we offer: nearly all of your roughly 3 billion letters, read and kept as data you can come back to.",
    featureBullets: [
      "All seven reports included",
      "Rare variants a panel can't see",
      "Carrier genes you could pass on",
      "Raw data you can re-analyse later",
    ],
    genomeCta: "Ask about Invita Genome",
    genomeMsg: "Hi Invita, I'd like to know more about whole genome sequencing (Invita Genome).",
    compareTitle: { lead: "Read a few key lines, or ", accent: "the whole book", tail: "." },
    compareBody:
      "Your genome is roughly 3 billion letters long. A DNA panel reads a carefully chosen set of markers, perfect for focused reports. Whole genome sequencing reads nearly all of it.",
    genomeRows: [
      { name: "Invita Genome", method: "Whole genome sequencing", reads: "Nearly all ~3 billion letters", coverage: 1 },
      { name: "Invita Single & Seven", method: "DNA panel", reads: "700+ key genetic variants, chosen for each report", coverage: 0.07 },
    ],
    example: "Example",
    plansTitle: { lead: "Three depths. ", accent: "One simple sample", tail: "." },
    plansSub:
      "Start focused or go all the way. Every plan includes home swab collection, Arabic & English reports and a private walkthrough on request.",
    featured: "Most chosen",
    planCta: "Order on WhatsApp",
    planMore: {
      single: { label: "Browse the reports", href: "#reports" },
      seven: { label: "See what's inside", href: `/${DNA_BUNDLE_SLUG}` },
      genome: { label: "How it compares", href: "#compare" },
    },
    reportsTitle: { lead: "Find the report that ", accent: "fits your question", tail: "." },
    reportsSub: "Pick one, or unlock them all. Every report runs on the sample you already gave.",
    learnMore: "Explore",
    igTitle: { lead: "Our DNA. ", accent: "Your health", tail: ". Reimagined." },
    igBody: "Follow Invita DNA Lab for new reports, genetics explained in Arabic and English, and what's next from the Invita family.",
    igFollow: "Follow @invitadnalab",
    igTileBody: "Genetics, explained in Arabic & English.",
    igOpen: "Open on Instagram",
    ivTitle: "Also from Invita",
    ivBody: "Invita IV Vitamins Therapy: premium IV vitamin drips in Baghdad.",
    ivCta: "Visit invitadrips.com",
    rawTitle: "Tested somewhere else?",
    rawBody: "Send us your existing report or raw data file and our team will explain what it means. No new sample needed.",
    rawCta: "Send it on WhatsApp",
    rawMsg: "Hi Invita, I took a DNA test elsewhere and would like your team to explain my results. I'll send the report or raw data file here.",
    partnerTitle: "For clinics & partners",
    partnerBody: "Offer Invita DNA tests to your patients with partner pricing, clinical training and a dedicated support line.",
    partnerCta: "Become a partner",
    partnerMsg: "Hi Invita, I'm interested in offering Invita DNA tests to my patients.",
    faqTitle: { lead: "Questions, ", accent: "answered", tail: "" },
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
    helpCaption: "Invita DNA Lab",
    helpTitle: "How can we help you?",
    helpBody:
      "Curious about one report, ready for your whole genome, or holding results from another lab? Message us and we'll point you to the right test.",
    helpCta: "Message us on WhatsApp",
    registerCta: "Book a home swab",
    orderMsg: "Hi Invita, I'd like to order a DNA test. Which one do you recommend for me?",
    disclaimer:
      "Invita DNA reports are for information and wellness purposes. They are not a diagnosis and do not replace medical advice. Always consult a qualified healthcare professional before acting on health or medicine-related results.",
  },
  ar: {
    metaTitle: "الجينوم الكامل وفحوصات DNA في العراق",
    metaDescription:
      "من فحوصات اللوحات الجينية المركّزة إلى تسلسل الجينوم الكامل. مسحة خدّ واحدة في منزلك، وسبعة تقارير واضحة يحلّلها مختبر 24Genetics، ومراجعة خاصة مع فريق Invita الطبي.",
    heroLabels: { region: "مختبر Invita للحمض النووي", prev: "السابق", next: "التالي", slide: "الشريحة" },
    heroSlides: [
      {
        lead: "جينومك، ",
        accent: "مفكوك الشيفرة",
        tail: " ومشروح بوضوح.",
        body: "من اللوحات الجينية المركّزة إلى تسلسل الجينوم الكامل: مسحة خدّ واحدة بلا ألم في منزلك تتحوّل إلى تقارير واضحة، ويشرحها لك فريقنا الطبي بخصوصية تامة.",
        cta: { label: "اعثر على فحصك", href: "#plans" },
      },
      {
        lead: "سبعة تقارير. ",
        accent: "عيّنة واحدة",
        tail: ".",
        body: "الصحة والتغذية والأدوية واللياقة والبشرة والشخصية والأصول، كلها من المسحة نفسها. ابدأ بتقرير واحد وأضف البقية لاحقًا.",
        cta: { label: "استكشف التقارير", href: "#reports" },
      },
      {
        lead: "نأتي ",
        accent: "إلى منزلك",
        tail: ".",
        body: "يزورك مختص مدرّب من Invita ويأخذ مسحة خدّ بلا ألم خلال دقائق. بلا إبر ولا زيارة للعيادة.",
        cta: { label: "احجز مسحة منزلية", href: "/book", icon: "kit" },
      },
      {
        lead: "يُحلَّل في ",
        accent: "مدريد",
        tail: " لدى 24Genetics.",
        body: "تنتقل عيّنتك المختومة بشحن مبرّد عبر DHL إلى شريكنا المخبري 24Genetics، الذي يقرأ حمضك النووي.",
        cta: { label: "شاهد مراحل العمل", href: "#process" },
      },
      {
        lead: "نتائجك ",
        accent: "بالعربية والإنجليزية",
        tail: ".",
        body: "تصلك التقارير على واتساب، وجلسة خاصة مع فريقنا الطبي تحوّلها إلى خطوات عملية.",
        cta: { label: "اطلب عبر واتساب", href: "wa", icon: "whatsapp" },
      },
    ],
    testsFrom: "الفحوصات",
    heroTrust: ["جمع العيّنة في المنزل", "تقارير بالعربية والإنجليزية", "بدون إبر"],
    heroCardTag: "تسلسل الجينوم الكامل",
    heroCardBody: "قراءة تكاد تشمل كل حرف في حمضك النووي، مع التقارير السبعة كاملة.",
    askPrice: "اسأل عن سعر اليوم",
    precision: { lead: "حمضك النووي، ", accent: "مقروءًا بدقة", tail: "." },
    whatTitle: { lead: "ما هو ", accent: "مختبر Invita", tail: " للحمض النووي؟" },
    whatIntro:
      "فحوصات جينية تصل إلى منزلك في العراق. نجمع عيّنتك، ويقرؤها شريكنا المخبري 24Genetics، ويشرح لك فريقنا الطبي ما تعنيه لك ولعائلتك.",
    whatItems: [
      {
        key: "genome",
        title: "تسلسل الجينوم الكامل",
        body: "قراءة تكاد تشمل كل حرف في حمضك النووي، مع التقارير السبعة كاملة.",
      },
      {
        key: "reports",
        title: "سبعة تقارير جينية",
        body: "لوحات مركّزة للصحة والتغذية والأدوية واللياقة والبشرة والشخصية والأصول.",
      },
      {
        key: "privacy",
        title: "حمضك النووي ملكك",
        body: "نشارك التقارير معك أنت فقط. لا شيء يصل لأصحاب العمل أو المعلنين، ويمكنك طلب حذف بياناتك في أي وقت.",
      },
      {
        key: "expert",
        title: "شرح خاص وواضح",
        body: "يرافقك فريق Invita الطبي في جلسة فردية خلال نتائجك ويخبرك بما يستحق التصرّف.",
      },
    ],
    processTitle: { lead: "مراحل العمل: ", accent: "من المسحة إلى الإجابات", tail: "" },
    processSub: "خمس خطوات، وتبقى Invita جهة تواصلك في كل واحدة منها.",
    process: [
      { title: "احجز", body: "راسلنا على واتساب أو احجز عبر الموقع، واختر فحصك." },
      { title: "المسحة المنزلية", body: "يأخذ مختص من Invita مسحة خدّ بلا ألم في منزلك." },
      { title: "الشحن المبرّد", body: "تنتقل عيّنتك المختومة بشحن مبرّد عبر DHL إلى مدريد." },
      { title: "التحليل المخبري", body: "يقرأ مختبر 24Genetics حمضك النووي: لوحة مختارة أو جينومك الكامل." },
      { title: "نتائجك", body: "تصلك التقارير على واتساب، مع شرح خاص من فريقنا الطبي." },
    ],
    featureName: "Invita جينوم",
    featureTitle: { lead: "تسلسل ", accent: "الجينوم الكامل", tail: "" },
    featureBody:
      "أعمق قراءة نقدّمها: تقريبًا كل الأحرف الثلاثة مليارات في حمضك النووي، مقروءة ومحفوظة كبيانات يمكنك العودة إليها.",
    featureBullets: [
      "التقارير السبعة كاملة",
      "متغيّرات نادرة لا تراها اللوحات",
      "جينات حاملة قد تنتقل لأطفالك",
      "بيانات خام يمكن إعادة تحليلها لاحقًا",
    ],
    genomeCta: "اسأل عن Invita جينوم",
    genomeMsg: "مرحبًا Invita، أرغب بمعرفة المزيد عن تسلسل الجينوم الكامل (Invita جينوم).",
    compareTitle: { lead: "اقرأ أهم السطور، أو ", accent: "الكتاب كاملًا", tail: "." },
    compareBody:
      "يتكوّن جينومك من نحو ٣ مليارات حرف. تقرأ اللوحة الجينية مجموعة مختارة بعناية من العلامات، مثالية للتقارير المركّزة. أما تسلسل الجينوم الكامل فيقرأ تقريبًا كل شيء.",
    genomeRows: [
      { name: "Invita جينوم", method: "تسلسل الجينوم الكامل", reads: "تقريبًا كل الأحرف الثلاثة مليارات", coverage: 1 },
      { name: "Invita سينغل وسفن", method: "لوحة جينية", reads: "أكثر من ٧٠٠ متغيّر جيني أساسي، مختارة لكل تقرير", coverage: 0.07 },
    ],
    example: "مثال",
    plansTitle: { lead: "ثلاثة أعماق. ", accent: "عيّنة واحدة بسيطة", tail: "." },
    plansSub:
      "ابدأ بتقرير مركّز أو اذهب إلى أبعد مدى. كل خطة تشمل جمع العيّنة في المنزل، وتقارير بالعربية والإنجليزية، ومراجعة خاصة عند الطلب.",
    featured: "الأكثر اختيارًا",
    planCta: "اطلب عبر واتساب",
    planMore: {
      single: { label: "تصفّح التقارير", href: "#reports" },
      seven: { label: "ماذا تتضمّن", href: `/${DNA_BUNDLE_SLUG}` },
      genome: { label: "قارن بين الطريقتين", href: "#compare" },
    },
    reportsTitle: { lead: "اختر التقرير الذي ", accent: "يجيب عن سؤالك", tail: "." },
    reportsSub: "اختر تقريرًا أو افتحها جميعًا. كل تقرير يُجرى على العيّنة التي قدّمتها.",
    learnMore: "استكشف",
    igTitle: { lead: "حمضنا النووي. ", accent: "صحتك", tail: ". برؤية جديدة." },
    igBody: "تابع Invita DNA Lab لتعرف بالتقارير الجديدة، وشرح علم الوراثة بالعربية والإنجليزية، وجديد عائلة Invita.",
    igFollow: "تابع ‎@invitadnalab",
    igTileBody: "علم الوراثة، بشرح واضح بالعربية والإنجليزية.",
    igOpen: "افتح على إنستغرام",
    ivTitle: "من Invita أيضًا",
    ivBody: "Invita للعلاج الوريدي بالفيتامينات: جلسات فيتامينات وريدية فاخرة في بغداد.",
    ivCta: "زُر invitadrips.com",
    rawTitle: "أجريت الفحص في مكان آخر؟",
    rawBody: "أرسل لنا تقريرك أو ملف بياناتك الخام وسيشرح لك فريقنا ما يعنيه، دون الحاجة لعيّنة جديدة.",
    rawCta: "أرسله عبر واتساب",
    rawMsg: "مرحبًا Invita، أجريت فحص الحمض النووي في مكان آخر وأرغب بأن يشرح فريقكم نتائجي. سأرسل التقرير أو ملف البيانات الخام هنا.",
    partnerTitle: "للعيادات والشركاء",
    partnerBody: "قدّموا فحوصات Invita للحمض النووي لمرضاكم بأسعار خاصة للشركاء، وتدريب سريري، وخط دعم مخصّص.",
    partnerCta: "كن شريكًا",
    partnerMsg: "مرحبًا Invita، أرغب بتقديم فحوصات Invita للحمض النووي لمرضاي.",
    faqTitle: { lead: "أسئلة ", accent: "وأجوبة", tail: "" },
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
    helpCaption: "مختبر Invita للحمض النووي",
    helpTitle: "كيف يمكننا مساعدتك؟",
    helpBody:
      "يثير فضولك تقرير واحد، أو تريد جينومك الكامل، أو لديك نتائج من مختبر آخر؟ راسلنا وسنرشدك إلى الفحص المناسب.",
    helpCta: "راسلنا على واتساب",
    registerCta: "احجز مسحة منزلية",
    orderMsg: "مرحبًا Invita، أرغب بطلب فحص الحمض النووي. أي فحص تنصحونني به؟",
    disclaimer:
      "تقارير Invita للحمض النووي لأغراض المعرفة والعافية. وهي ليست تشخيصًا ولا تغني عن الاستشارة الطبية. استشر دائمًا مختصًا صحيًا مؤهلًا قبل التصرّف بناءً على النتائج المتعلقة بالصحة أو الأدوية.",
  },
} as const;

const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6";

const WHAT_ICONS = { genome: HelixIcon, reports: NetworkIcon, privacy: ShieldIcon, expert: ChatIcon } as const;
const PROCESS_ICONS = [ChatIcon, KitIcon, TruckIcon, FlaskIcon, ReportIcon];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale === "ar" ? "ar" : "en") as Locale;
  const copy = COPY[loc];
  return pageMetadata({
    locale: loc,
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
  const numeral = (n: number) =>
    loc === "ar" ? n.toLocaleString("ar-IQ", { minimumIntegerDigits: 2 }) : String(n).padStart(2, "0");
  const orderUrl = invitaWhatsappUrl(copy.orderMsg);
  const slides: HeroSlide[] = copy.heroSlides.map((s) => ({
    lead: s.lead,
    accent: s.accent,
    tail: s.tail,
    body: s.body,
    cta: {
      label: s.cta.label,
      href: s.cta.href === "wa" ? orderUrl : s.cta.href,
      icon: "icon" in s.cta ? s.cta.icon : undefined,
    },
  }));

  return (
    <div className="overflow-x-clip">
      {/* Hero ----------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-[var(--iv-line)] bg-[var(--iv-mist)]">
        <div className="iv-gridlines pointer-events-none absolute inset-y-0 end-0 hidden w-1/2 lg:block" aria-hidden />
        <div className={`${wrap} relative grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20`}>
          <div>
            <HeroSlider slides={slides} locale={loc} labels={copy.heroLabels} />
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--iv-muted)]">
              <li className="inline-flex items-center gap-2 font-semibold text-[var(--iv-gold-ink)]">
                <CheckIcon className="h-4 w-4" />
                {copy.testsFrom} {formatDnaPrice(DNA_PRICE_FROM_IQD, loc, true).replace(/^From /, "from ")}
              </li>
              {copy.heroTrust.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-[var(--iv-gold-ink)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* The helix seen through a lens, with a periwinkle halo. */}
          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--iv-sky-deep)_55%,transparent)_0%,transparent_68%)]" aria-hidden />
            <div className="relative aspect-square overflow-hidden rounded-full bg-[var(--iv-night)] shadow-[0_50px_90px_-50px_rgba(15,35,65,0.8)] ring-[10px] ring-white/70">
              <Image
                src={DNA_IMAGES.helix.src}
                alt={DNA_IMAGES.helix.alt[loc]}
                fill
                sizes="(min-width: 1024px) 34rem, 90vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
                style={{ objectPosition: "60% 40%" }}
              />
            </div>
            <span className="absolute -start-2 top-[12%] h-4 w-4 rounded-full border-2 border-[var(--iv-gold)] bg-white" aria-hidden />
            <span className="absolute end-[6%] bottom-[18%] h-3 w-3 rounded-full bg-[var(--iv-gold)]" aria-hidden />
            <div className="relative -mt-16 ms-auto w-[min(100%,19rem)] rounded-[var(--iv-radius)] bg-white p-5 shadow-[0_30px_60px_-30px_rgba(15,35,65,0.55)] sm:-mt-24 sm:me-2">
              <p className={CAPTION}>{copy.heroCardTag}</p>
              <p className="iv-slab mt-2 text-xl text-[var(--iv-navy)]">{genomePlan.name[loc]}</p>
              <p className="mt-1 text-sm leading-snug text-[var(--iv-muted)]">{copy.heroCardBody}</p>
              <a href={dnaPlanWhatsappUrl(genomePlan, loc)} target="_blank" rel="noopener noreferrer" className={`${notch("gold", "sm")} mt-4 w-full`}>
                <WhatsAppGlyph />
                {genomePlan.priceIqd ? formatDnaPrice(genomePlan.priceIqd, loc, genomePlan.priceFrom) : copy.askPrice}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Invita DNA Lab ----------------------------------------- */}
      <section className="py-20 sm:py-24">
        <SlabHeading {...copy.precision} center className={wrap} />
        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[22rem] overflow-hidden bg-[var(--iv-mist)] lg:min-h-full">
            <LoopVideo video={DNA_VIDEOS.generations} className="absolute inset-0 h-full w-full object-cover" position="50% 35%" />
          </div>
          <div className="px-4 sm:px-6 lg:max-w-2xl lg:py-6 lg:pe-10 lg:ps-0">
            <SlabHeading {...copy.whatTitle} size="md" bar={false} />
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--iv-muted)]">{copy.whatIntro}</p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {copy.whatItems.map((item) => {
                const Icon = WHAT_ICONS[item.key];
                return (
                  <li key={item.key}>
                    <Icon className="h-9 w-9 text-[var(--iv-gold-deep)]" />
                    <h3 className="mt-4 text-lg font-semibold leading-snug text-[var(--iv-navy)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--iv-muted)]">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Process -------------------------------------------------------- */}
      <section id="process" className={`${wrap} scroll-mt-28 border-t border-[var(--iv-line)] py-20 sm:py-24`}>
        <SlabHeading {...copy.processTitle} center />
        <p className="mx-auto mt-5 max-w-xl text-center text-[var(--iv-muted)]">{copy.processSub}</p>
        <div className="mt-14">
          <ProcessArc
            steps={copy.process.map((s, i) => ({ ...s, Icon: PROCESS_ICONS[i] }))}
            numerals={copy.process.map((_, i) => numeral(i + 1))}
          />
        </div>
      </section>

      {/* Invita Genome --------------------------------------------------- */}
      <section id="genome" className="scroll-mt-28 bg-[var(--iv-mist)] py-20 sm:py-24">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <div className="relative grid place-items-center">
            <div className="absolute inset-x-[8%] top-[10%] bottom-[14%] rounded-full bg-white" aria-hidden />
            <KitArt className="relative w-full max-w-lg" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--iv-gold-ink)]">{copy.featureName}</p>
            <SlabHeading {...copy.featureTitle} className="mt-2" />
            <p className="mt-6 max-w-xl leading-relaxed text-[var(--iv-muted)]">{copy.featureBody}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {copy.featureBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-medium text-[var(--iv-navy)]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--iv-gold)]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <a href={invitaWhatsappUrl(copy.genomeMsg)} target="_blank" rel="noopener noreferrer" className={`${notch("navy")} mt-9`}>
              <WhatsAppGlyph />
              {copy.genomeCta}
              <ArrowLong />
            </a>
          </div>
        </div>
      </section>

      {/* Panel vs whole genome ----------------------------------------- */}
      <section id="compare" className={`${wrap} grid scroll-mt-28 items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.15fr]`}>
        <div>
          <SlabHeading {...copy.compareTitle} size="md" />
          <p className="mt-6 max-w-xl leading-relaxed text-[var(--iv-muted)]">{copy.compareBody}</p>
        </div>
        <div className="space-y-4">
          {copy.genomeRows.map((row, i) => (
            <div
              key={row.name}
              className={`rounded-[var(--iv-radius)] p-6 sm:p-7 ${
                i === 0
                  ? "bg-[var(--iv-navy)] text-white"
                  : "bg-white text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)]"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="iv-slab text-lg">{row.name}</p>
                <p className={`text-xs font-semibold ltr:uppercase ltr:tracking-[0.16em] ${i === 0 ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-ink)]"}`}>
                  {row.method}
                </p>
              </div>
              <CoverageStrip coverage={row.coverage} seed={7 + i} className="mt-5 h-9 w-full" />
              <p className={`mt-4 text-sm ${i === 0 ? "text-white/75" : "text-[var(--iv-muted)]"}`}>{row.reads}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans ---------------------------------------------------------- */}
      <section id="plans" className="scroll-mt-28 border-t border-[var(--iv-line)] py-20 sm:py-24">
        <div className={wrap}>
          <SlabHeading {...copy.plansTitle} center />
          <p className="mx-auto mt-5 max-w-2xl text-center text-[var(--iv-muted)] sm:text-lg">{copy.plansSub}</p>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
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
      <section id="reports" className="scroll-mt-28 bg-[var(--iv-mist)] py-20 sm:py-24">
        <div className={wrap}>
          <SlabHeading {...copy.reportsTitle} center />
          <p className="mx-auto mt-5 max-w-xl text-center text-[var(--iv-muted)]">{copy.reportsSub}</p>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--iv-night)_12%,color-mix(in_srgb,var(--iv-night)_55%,transparent)_58%,color-mix(in_srgb,var(--iv-night)_30%,transparent))]"
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
                      <p className="text-[11px] opacity-50 ltr:uppercase ltr:tracking-[0.14em]">{copy.example}</p>
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
                    <p className={`iv-slab ${i === 0 ? "text-3xl" : "text-xl"}`}>{r.title[loc]}</p>
                    <p className="mt-2 text-sm leading-snug opacity-75">{i === 0 ? r.summary[loc] : r.tagline[loc]}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      {copy.learnMore}
                      <ArrowLong className="h-3 w-6 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
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
      <section id="instagram" className="iv-molecules scroll-mt-28 border-y border-[var(--iv-line)] py-20 sm:py-24">
        <div className={wrap}>
          <SlabHeading {...copy.igTitle} center />
          <p className="mx-auto mt-5 max-w-xl text-center text-[var(--iv-muted)]">{copy.igBody}</p>
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
                  className="group relative block h-full overflow-hidden rounded-[var(--iv-radius)] bg-[var(--iv-navy)] shadow-[0_24px_50px_-34px_rgba(15,35,65,0.6)]"
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
                    className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[var(--iv-navy)]"
                    aria-hidden
                  >
                    <InstagramGlyph className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
            <li className="aspect-square">
              <a
                href={INVITA_DNA_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-[var(--iv-radius)] bg-white p-5 text-[var(--iv-navy)] shadow-[0_24px_50px_-34px_rgba(15,35,65,0.6)] transition hover:bg-[var(--iv-cream)] sm:p-6"
              >
                <Image src={INVITA_LOGO.markNavy.src} width={INVITA_LOGO.markNavy.width} height={INVITA_LOGO.markNavy.height} alt="" className="h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold sm:text-base" dir="ltr">@invitadnalab</p>
                  <p className="mt-1 text-xs leading-snug text-[var(--iv-muted)] sm:text-sm">{copy.igTileBody}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                    {copy.igFollow}
                    <ArrowLong className="h-3 w-6" />
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Raw data, partners, Invita IV ---------------------------------- */}
      <section className={`${wrap} grid gap-5 py-20 sm:py-24 md:grid-cols-2 lg:grid-cols-3`}>
        <HelpCard
          icon={<UploadIcon className="h-8 w-8" />}
          title={copy.rawTitle}
          body={copy.rawBody}
          cta={copy.rawCta}
          href={invitaWhatsappUrl(copy.rawMsg)}
        />
        <HelpCard
          icon={<ChatIcon className="h-8 w-8" />}
          title={copy.partnerTitle}
          body={copy.partnerBody}
          cta={copy.partnerCta}
          href={invitaWhatsappUrl(copy.partnerMsg)}
        />
        <article className="flex flex-col overflow-hidden rounded-[var(--iv-radius)] bg-white ring-1 ring-[var(--iv-line)] md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex">
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-full lg:aspect-[16/10] lg:min-h-0">
            <Image
              src={DNA_IMAGES.ivStillLife.src}
              alt={DNA_IMAGES.ivStillLife.alt[loc]}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: DNA_IMAGES.ivStillLife.position }}
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-6 p-7">
            <div>
              <p className="text-sm font-semibold text-[var(--iv-gold-ink)]">{copy.ivTitle}</p>
              <p className="iv-slab mt-2 text-2xl text-[var(--iv-navy)]">Invita IV Drips</p>
              <p className="mt-2 text-[var(--iv-muted)]">{copy.ivBody}</p>
            </div>
            <a href={INVITA_IV_SITE} target="_blank" rel="noopener noreferrer" className={`${notch("line")} w-fit`}>
              {copy.ivCta}
              <ArrowLong />
            </a>
          </div>
        </article>
      </section>

      {/* FAQ ------------------------------------------------------------ */}
      <section id="faq" className={`${wrap} grid scroll-mt-28 gap-10 border-t border-[var(--iv-line)] py-20 sm:py-24 lg:grid-cols-[1fr_1.6fr]`}>
        <SlabHeading {...copy.faqTitle} />
        <div className="divide-y divide-[var(--iv-line)] border-y border-[var(--iv-line)]">
          {copy.faqs.map((f) => (
            <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--iv-navy)]">
                {f.q}
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--iv-mist)] text-lg text-[var(--iv-gold-ink)] transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--iv-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* How can we help ----------------------------------------------- */}
      <section className="relative isolate overflow-hidden text-white">
        <Image src={DNA_IMAGES.ancestry.src} alt="" fill sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: "50% 35%" }} />
        <div className="absolute inset-0 -z-10 bg-[color-mix(in_srgb,var(--iv-navy)_88%,transparent)]" aria-hidden />
        <div className={`${wrap} py-20 text-center sm:py-24`}>
          <p className="text-xs font-semibold text-[var(--iv-gold)] ltr:uppercase ltr:tracking-[0.4em]">{copy.helpCaption}</p>
          <h2 className="iv-slab mx-auto mt-5 max-w-3xl text-[clamp(2rem,1.3rem+3vw,3.5rem)] leading-[1.08]">{copy.helpTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/75 sm:text-lg">{copy.helpBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={orderUrl} target="_blank" rel="noopener noreferrer" className={notch("gold")}>
              <WhatsAppGlyph />
              {copy.helpCta}
              <ArrowLong />
            </a>
            <Link href="/book" className={notch("ghost")}>
              <KitIcon className="h-4 w-4" />
              {copy.registerCta}
            </Link>
          </div>
          <p className="mx-auto mt-14 max-w-3xl text-xs leading-relaxed text-white/55">{copy.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}

function HelpCard({ icon, title, body, cta, href }: { icon: React.ReactNode; title: string; body: string; cta: string; href: string }) {
  return (
    <article className="flex flex-col justify-between gap-6 rounded-[var(--iv-radius)] bg-white p-7 ring-1 ring-[var(--iv-line)] sm:p-8">
      <div>
        <span className="text-[var(--iv-gold-deep)]">{icon}</span>
        <h3 className="iv-slab mt-5 text-2xl text-[var(--iv-navy)]">{title}</h3>
        <p className="mt-2 leading-relaxed text-[var(--iv-muted)]">{body}</p>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${notch("navy")} w-fit`}>
        <WhatsAppGlyph />
        {cta}
      </a>
    </article>
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
  const dark = plan.featured;
  const surface = plan.featured
    ? "bg-[var(--iv-navy)] text-white shadow-[0_40px_80px_-40px_var(--iv-night)] lg:-translate-y-3"
    : "bg-white text-[var(--iv-navy)] ring-1 ring-[var(--iv-line)]";
  const MoreLink = more.href.startsWith("#") ? "a" : Link;
  return (
    <article className={`relative flex flex-col overflow-hidden rounded-[var(--iv-radius)] p-7 sm:p-8 ${surface}`}>
      {plan.featured ? (
        <span className="absolute end-6 top-6 bg-[var(--iv-gold)] px-3 py-1 text-[10px] font-semibold text-[var(--iv-navy)] ltr:uppercase ltr:tracking-[0.16em]">
          {featuredLabel}
        </span>
      ) : null}
      <p className={`text-xs font-semibold ltr:uppercase ltr:tracking-[0.18em] ${dark ? "text-[var(--iv-gold)]" : "text-[var(--iv-gold-ink)]"}`}>
        {plan.method[loc]}
      </p>
      <h3 className="iv-slab mt-3 text-3xl">{plan.name[loc]}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-[var(--iv-muted)]"}`}>{plan.tagline[loc]}</p>
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
      <a href={dnaPlanWhatsappUrl(plan, loc)} target="_blank" rel="noopener noreferrer" className={`${notch(dark ? "gold" : "navy")} mt-8 w-full`}>
        <WhatsAppGlyph />
        {cta}
      </a>
      <MoreLink
        href={more.href}
        className={`mt-3 text-center text-sm font-semibold underline-offset-4 hover:underline ${dark ? "text-white/80" : "text-[var(--iv-navy)]/80"}`}
      >
        {more.label} <span aria-hidden>{arrow}</span>
      </MoreLink>
    </article>
  );
}
