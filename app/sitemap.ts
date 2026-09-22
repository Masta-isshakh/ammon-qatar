import type { MetadataRoute } from 'next';
import { en } from '@/content/en';
import { FLAGS, SITE_URL } from '@/lib/constants/company';
import { LOCALES, localePath } from '@/lib/i18n/config';

const abs = (p: string) => `${SITE_URL}${p}`;

function entries(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], lastModified?: string): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: abs(localePath(locale, path)),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        'en-QA': abs(localePath('en', path)),
        'ar-QA': abs(localePath('ar', path)),
        'x-default': abs(localePath('en', path)),
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries('', 1, 'weekly'),
    ...entries('services', 0.9, 'monthly'),
    ...en.services.flatMap((s) => entries(`services/${s.slug}`, 0.9, 'monthly')),
    ...entries('industries', 0.7, 'monthly'),
    ...entries('process', 0.8, 'monthly'),
    ...entries('about', 0.6, 'monthly'),
    ...entries('case-studies', 0.5, 'monthly'),
    ...entries('insights', 0.7, 'weekly'),
    ...en.insights.flatMap((a) => entries(`insights/${a.slug}`, 0.7, 'monthly', a.updatedAt)),
    ...entries('faq', 0.7, 'monthly'),
    ...entries('contact', 0.9, 'monthly'),
    ...(FLAGS.showDohaPage ? entries('doha', 0.7, 'monthly') : []),
    ...entries('privacy', 0.2, 'yearly'),
    ...entries('terms', 0.2, 'yearly'),
  ];
}
