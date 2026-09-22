import type { ServiceSlug } from './types';

/**
 * Image registry — every slot has fixed intrinsic dimensions (so the layout
 * never shifts) and locale-aware alt text describing what is actually shown.
 *
 * Loading priority is NOT set here: it depends on where an image is used, so
 * each call site passes `priority` for the single above-the-fold image.
 *
 * To swap a photograph, drop the new file in public/images, run
 * `npm run assets:images`, and update `width`/`height` here if the aspect
 * ratio changes. next/image then serves AVIF/WebP automatically.
 */
const blur = (from: string, to: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="16" height="10" fill="url(#g)"/></svg>`,
  ).toString('base64');

const WIDE = { width: 1672, height: 941 } as const;

export const IMAGES = {
  /** Homepage hero (second slide) — adviser and client reviewing receivables. */
  heroMeeting: {
    src: '/images/corporate-debt-collection-qatar.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    blurDataURL: blur('#2b2f3a', '#b8862b'),
    alt: {
      en: 'An Ammon Qatar adviser and a client reviewing overdue receivables in a Doha office overlooking the West Bay skyline',
      ar: 'مستشار من عمون قطر وعميلة يراجعان المستحقات المتأخرة في مكتب بالدوحة يطل على أبراج الخليج الغربي',
    },
  },
  /** About page — the full team in the Doha office, with company branding on the wall. */
  team: {
    src: '/images/ammon-qatar-team-doha.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    blurDataURL: blur('#1b2436', '#c8b78a'),
    alt: {
      en: 'The Ammon Qatar collections and client-service team at the company’s Doha office',
      ar: 'فريق التحصيل وخدمة العملاء في عمون قطر بمكتب الشركة في الدوحة',
    },
  },
  /** Contact page — client being received at the office reception desk. */
  contactReception: {
    src: '/images/ammon-qatar-contact-doha.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    blurDataURL: blur('#e6e2dc', '#2a3446'),
    alt: {
      en: 'A client being welcomed at the reception desk of the Ammon Qatar office in Doha',
      ar: 'استقبال أحد العملاء في مكتب عمون قطر بالدوحة',
    },
  },
  /** Confidentiality section — a case file being returned to a locked drawer. */
  confidentialFile: {
    src: '/images/confidential-debt-recovery-qatar.jpg',
    width: 1448,
    height: 1086,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#15130f', '#8a5a12'),
    alt: {
      en: 'A recovery file being placed back into a secure drawer in a private office',
      ar: 'إعادة ملف تحصيل إلى درج آمن داخل مكتب خاص',
    },
  },
  /** Homepage hero (default slide) and Doha/location — the Corniche at dusk. */
  dohaSkyline: {
    src: '/images/doha-skyline-corniche.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    blurDataURL: blur('#2c3a55', '#d9c9a8'),
    alt: {
      en: 'The Doha Corniche and West Bay skyline at dusk, seen from a marble ledge',
      ar: 'كورنيش الدوحة وأبراج الخليج الغربي عند الغروب من حافة رخامية',
    },
  },
} as const;

export type ImageKey = keyof typeof IMAGES;

/** Photographs used on service and industry pages. */
export const EXTRA_IMAGES = {
  corporateMeeting: {
    src: '/images/corporate-debt-collection-qatar.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#2b2f3a', '#b8862b'),
    alt: {
      en: 'A business adviser presenting a receivables report to a corporate client in Doha',
      ar: 'مستشار أعمال يعرض تقرير المستحقات على عميلة من إحدى الشركات في الدوحة',
    },
  },
  earlyStageCall: {
    src: '/images/early-stage-collection-qatar.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#e9e6de', '#3a4a63'),
    alt: {
      en: 'A collections officer following up an overdue invoice by phone at a Doha office desk',
      ar: 'موظفة تحصيل تتابع فاتورة متأخرة عبر الهاتف من مكتبها في الدوحة',
    },
  },
  settlementMeeting: {
    src: '/images/debt-negotiation-settlement-doha.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#3a3f4d', '#b08a4a'),
    alt: {
      en: 'A settlement discussion around a boardroom table in Doha at dusk',
      ar: 'مناقشة تسوية حول طاولة مجلس إدارة في الدوحة عند الغروب',
    },
  },
  bankSettlement: {
    src: '/images/bank-finance-settlement-qatar.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#2f3440', '#d8cfc0'),
    alt: {
      en: 'Two colleagues reviewing a finance settlement proposal and statement of account',
      ar: 'زميلان يراجعان مقترح تسوية تمويلية وكشف حساب',
    },
  },
  paymentDashboard: {
    src: '/images/payment-monitoring-reporting-qatar.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#1f2a3d', '#cbb888'),
    alt: {
      en: 'A manager reviewing payment plan and collection performance dashboards in a Doha office',
      ar: 'مدير يراجع لوحات متابعة خطط السداد وأداء التحصيل في مكتب بالدوحة',
    },
  },
  constructionReceivables: {
    src: '/images/real-estate-receivables-qatar.jpg',
    ...WIDE,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    blurDataURL: blur('#c9cdd4', '#4a5568'),
    alt: {
      en: 'A finance manager and a site engineer reviewing certified payment applications on a Qatar construction project',
      ar: 'مديرة مالية ومهندس موقع يراجعان مستخلصات الدفع المعتمدة في مشروع إنشائي بقطر',
    },
  },
  confidentialFile: {
    src: '/images/confidential-debt-recovery-qatar.jpg',
    width: 1448,
    height: 1086,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    blurDataURL: blur('#15130f', '#8a5a12'),
    alt: {
      en: 'A prepared recovery file being secured before escalation',
      ar: 'ملف تحصيل مُعد يتم حفظه بشكل آمن قبل التصعيد',
    },
  },
} as const;

export type ExtraImageKey = keyof typeof EXTRA_IMAGES;

/**
 * Optional hero photograph per service page. Services without an entry render
 * a text-only header, which keeps those pages fast and avoids a generic image.
 */
export const SERVICE_IMAGES: Partial<Record<ServiceSlug, ExtraImageKey>> = {
  'corporate-debt-collection': 'corporateMeeting',
  'early-stage-debt-collection': 'earlyStageCall',
  'negotiation-settlement': 'settlementMeeting',
  'bank-finance-settlements': 'bankSettlement',
  'payment-monitoring': 'paymentDashboard',
  'legal-follow-up': 'confidentialFile',
};

/** Single lookup across both registries. */
export const ALL_IMAGES = { ...IMAGES, ...EXTRA_IMAGES };
export type AnyImageKey = keyof typeof ALL_IMAGES;
