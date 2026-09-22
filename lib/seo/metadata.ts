import type { Metadata } from 'next';
import { COMPANY, SITE_URL } from '@/lib/constants/company';
import { LOCALE_META, localePath, type Locale } from '@/lib/i18n/config';

interface BuildMetadataArgs {
  locale: Locale;
  /** Path without locale prefix, '' for home. */
  path: string;
  title: string;
  description: string;
  /** Use the absolute title (home) instead of the "%s | Ammon Qatar" template. */
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

/**
 * One metadata builder for every page: localized canonical, hreflang pairs
 * (en-QA / ar-QA / x-default), Open Graph + Twitter, robots.
 */
export function buildMetadata({ locale, path, title, description, absoluteTitle = false, type = 'website', publishedTime, modifiedTime, noIndex = false }: BuildMetadataArgs): Metadata {
  const canonical = localePath(locale, path);
  const meta = LOCALE_META[locale];
  const other = locale === 'en' ? 'ar' : 'en';
  return {
    metadataBase: new URL(SITE_URL),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        'en-QA': localePath('en', path),
        'ar-QA': localePath('ar', path),
        'x-default': localePath('en', path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: COMPANY.brand,
      locale: meta.ogLocale,
      alternateLocale: [LOCALE_META[other].ogLocale],
      type,
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  };
}
