import type { Localized } from "@/lib/i18n";
import type { DnaReportSlug } from "@/lib/reports";

/**
 * Invita DNA Lab imagery: official Invita logo files, Invita's own report
 * covers (`public/images/covers/`) and posts from Invita's Instagram. Files
 * live in `public/images/`.
 */
const DIR = "/images";

export const INVITA_LOGO = {
  /** Gold radial mark, transparent. */
  mark: { src: `${DIR}/invita-mark.webp`, width: 192, height: 188 },
  /** Navy radial mark, for gold or light surfaces. */
  markNavy: { src: `${DIR}/invita-mark-navy.webp`, width: 192, height: 188 },
  /** "Invita" wordmark for light surfaces. */
  wordmarkNavy: { src: `${DIR}/invita-wordmark-navy.webp`, width: 324, height: 96 },
  /** "Invita" wordmark for dark surfaces. */
  wordmarkIvory: { src: `${DIR}/invita-wordmark-ivory.webp`, width: 324, height: 96 },
} as const;

export type DnaImage = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  /** CSS object-position when the image is cropped with `object-cover`. */
  position?: string;
};

export const DNA_IMAGES = {
  helix: {
    src: `${DIR}/helix.webp`,
    width: 1200,
    height: 1697,
    alt: { en: "A glowing DNA double helix on deep navy", ar: "حلزون DNA مزدوج متوهّج على خلفية كحلية" },
    position: "60% 30%",
  },
  ancestry: {
    src: `${DIR}/ancestry.webp`,
    width: 1100,
    height: 1556,
    alt: {
      en: "Blue illustration of classical portrait busts linked by a constellation of lines",
      ar: "رسم أزرق لتماثيل كلاسيكية تربطها خطوط كالنجوم",
    },
    position: "55% 40%",
  },
  invitaCapsules: {
    src: `${DIR}/invita-capsules.webp`,
    width: 1400,
    height: 788,
    alt: {
      en: "Invita-branded capsules in periwinkle and gold",
      ar: "كبسولات تحمل علامة Invita باللونين البنفسجي الفاتح والذهبي",
    },
  },
  ivStillLife: {
    src: `${DIR}/invita-iv-still-life.webp`,
    width: 900,
    height: 900,
    alt: { en: "Invita IV vitamin vials on a marble stand", ar: "قوارير فيتامينات Invita الوريدية على قاعدة رخامية" },
    position: "50% 45%",
  },
  coverHealth: {
    src: `${DIR}/covers/health.webp`,
    width: 735,
    height: 1103,
    alt: {
      en: "A laughing grandfather lifting his granddaughter in a sunlit room",
      ar: "جدّ يضحك وهو يرفع حفيدته في غرفة مشمسة",
    },
    position: "50% 55%",
  },
  coverSkin: {
    src: `${DIR}/covers/skin.webp`,
    width: 736,
    height: 1308,
    alt: {
      en: "Close-up of a smiling woman with freckled skin, eyes closed, a hand resting on her cheek",
      ar: "صورة قريبة لامرأة مبتسمة ببشرة منمّشة، عيناها مغمضتان ويدها على خدّها",
    },
    position: "50% 40%",
  },
  coverPersonality: {
    src: `${DIR}/covers/personality.webp`,
    width: 735,
    height: 1101,
    alt: {
      en: "A woman with her eyes closed and face turned to warm sunlight, hair lifting in the breeze",
      ar: "امرأة مغمضة العينين تستقبل بوجهها ضوء الشمس الدافئ وشعرها يتطاير مع النسيم",
    },
    position: "55% 60%",
  },
  coverPharma: {
    src: `${DIR}/covers/pharma.webp`,
    width: 564,
    height: 845,
    alt: {
      en: "Colourful tablets and capsules laid out on a yellow background",
      ar: "أقراص وكبسولات ملوّنة مرتّبة على خلفية صفراء",
    },
    position: "50% 45%",
  },
  skinClock: {
    src: `${DIR}/skin/clock.webp`,
    width: 480,
    height: 800,
    alt: {
      en: "A young face and an older face cheek to cheek, showing how skin changes with age",
      ar: "وجه شاب ووجه مسنّ متلاصقان، يُظهران كيف تتغيّر البشرة مع العمر",
    },
    position: "50% 40%",
  },
  skinMoss: {
    src: `${DIR}/skin/moss.webp`,
    width: 564,
    height: 1002,
    alt: {
      en: "A woman resting her face on soft green moss in the sun",
      ar: "امرأة تُسند وجهها إلى طحلب أخضر ناعم تحت الشمس",
    },
    position: "60% 35%",
  },
} satisfies Record<string, DnaImage>;

export type DnaVideo = { src: string; poster: string; width: number; height: number };

/** Short silent loops: H.264 MP4 with a WebP poster, in `public/media/`. */
export const DNA_VIDEOS = {
  /** Three generations of women laughing together, with tulips. */
  generations: { src: "/media/generations.mp4", poster: "/media/generations.webp", width: 540, height: 960 },
  /** An older woman's profile, smiling, in warm low light. */
  skinLight: { src: "/media/skin-light.mp4", poster: "/media/skin-light.webp", width: 540, height: 900 },
} satisfies Record<string, DnaVideo>;

/** Photographic covers for report cards and detail heroes (others use vector art). */
export const DNA_REPORT_COVER: Partial<Record<DnaReportSlug, DnaImage>> = {
  ancestry: DNA_IMAGES.ancestry,
  health: DNA_IMAGES.coverHealth,
  pharma: DNA_IMAGES.coverPharma,
  skin: DNA_IMAGES.coverSkin,
  personality: DNA_IMAGES.coverPersonality,
  "all-in-one": DNA_IMAGES.helix,
};

export type InstagramPost = DnaImage & { href: string; caption: Localized };

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

/** People-free posts from Invita's Instagram, newest DNA posts first. */
export const INVITA_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    src: `${DIR}/instagram/our-dna.webp`,
    width: 900,
    height: 900,
    href: "https://www.instagram.com/invitadnalab/",
    caption: { en: "Our DNA. Your health. Reimagined.", ar: "حمضنا النووي. صحتك. برؤية جديدة." },
    alt: {
      en: "Invita DNA Lab post: a human figure drawn as a glowing network of points, listing the reports Invita DNA Lab offers",
      ar: "منشور Invita DNA Lab: مجسّم إنسان مرسوم كشبكة نقاط مضيئة مع قائمة التقارير التي يقدّمها المختبر",
    },
  },
  {
    src: `${DIR}/instagram/who-we-are.webp`,
    width: 900,
    height: 900,
    href: post("DYCdLOEjBNc"),
    caption: { en: "Who we are — Invita and 24Genetics", ar: "من نحن — Invita و24Genetics" },
    alt: {
      en: "Invita post in Arabic on royal blue: who we are, launching Invita DNA Lab with the European laboratory 24Genetics",
      ar: "منشور Invita بالعربية على خلفية زرقاء: من نحن، وإطلاق Invita DNA Lab بالتعاون مع المختبر الأوروبي 24Genetics",
    },
  },
  {
    src: `${DIR}/instagram/dropper.webp`,
    width: 720,
    height: 1280,
    href: post("DVCEEyRDpxh"),
    caption: { en: "New identity. Same excellence.", ar: "هوية جديدة. التميّز نفسه." },
    alt: {
      en: "A glass dropper with a single drop over the gold Invita wordmark",
      ar: "قطّارة زجاجية بقطرة واحدة فوق شعار Invita الذهبي",
    },
    position: "50% 40%",
  },
];
