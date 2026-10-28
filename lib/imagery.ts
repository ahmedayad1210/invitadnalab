import type { Localized } from "@/lib/i18n";
import type { DnaReportSlug } from "@/lib/reports";

/**
 * Invita DNA Lab imagery — official Invita logo files, Invita's own report
 * covers and posts from Invita's Instagram. Only images without people are
 * used. Files live in `public/images/invita-dna/`.
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
  capsulesPharma: {
    src: `${DIR}/capsules-pharma.webp`,
    width: 900,
    height: 980,
    alt: { en: "Medicine capsules linked by fine lines", ar: "كبسولات دواء تربطها خطوط دقيقة" },
    position: "50% 35%",
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
} satisfies Record<string, DnaImage>;

/** Photographic covers for report cards and detail heroes (others use vector art). */
export const DNA_REPORT_COVER: Partial<Record<DnaReportSlug, DnaImage>> = {
  ancestry: DNA_IMAGES.ancestry,
  pharma: DNA_IMAGES.capsulesPharma,
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
