/**
 * Image registry — every slot has fixed intrinsic dimensions (so the layout
 * never shifts) and locale-aware alt text.
 *
 * To swap a photograph, replace the file and update `width`/`height` here if
 * the aspect ratio changes. next/image serves AVIF/WebP automatically.
 */
const blur = (from: string, to: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="16" height="10" fill="url(#g)"/></svg>`,
  ).toString('base64');

export const IMAGES = {
  heroMeeting: {
    src: '/images/corporate-debt-collection-qatar.png',
    width: 1672,
    height: 941,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    priority: true,
    blurDataURL: blur('#2b2f3a', '#c9a227'),
    alt: {
      en: 'An adviser and a client reviewing receivables reports in a Doha office overlooking the West Bay skyline',
      ar: 'مستشار وعميلة يراجعان تقارير المستحقات في مكتب بالدوحة يطل على أبراج الخليج الغربي',
    },
  },
  aboutOffice: {
    src: '/images/early-stage-collection-qatar.png',
    width: 1672,
    height: 941,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    priority: false,
    blurDataURL: blur('#e9e6de', '#3a4a63'),
    alt: {
      en: 'A collections officer following up an overdue account by phone at a Doha office desk',
      ar: 'موظفة تحصيل تتابع حساباً متأخراً عبر الهاتف من مكتبها في الدوحة',
    },
  },
  dohaSkyline: {
    src: '/images/debt-negotiation-settlement-doha.png',
    width: 1672,
    height: 941,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    priority: false,
    blurDataURL: blur('#3a3f4d', '#b08a4a'),
    alt: {
      en: 'A settlement meeting around a boardroom table in Doha at dusk, with the city skyline behind',
      ar: 'اجتماع تسوية حول طاولة مجلس إدارة في الدوحة عند الغروب وتظهر خلفه أبراج المدينة',
    },
  },
  secureDocuments: {
    src: '/images/bank-finance-settlement-qatar.png',
    width: 1672,
    height: 941,
    sizes: '(min-width: 1024px) 45vw, 100vw',
    priority: false,
    blurDataURL: blur('#2f3440', '#d8cfc0'),
    alt: {
      en: 'Two colleagues reviewing a confidential settlement file and statement of account in a private office',
      ar: 'زميلان يراجعان ملف تسوية سرياً وكشف حساب في مكتب خاص',
    },
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
