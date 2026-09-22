import { COMPANY, SITE_URL } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Article, FaqItem, Service } from '@/content/types';

/*
 * Structured data — factual values only.
 * No aggregateRating, no review schema, no invented awards or figures.
 * Every page emits exactly one @graph; nodes reference the organization by @id.
 */

export type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (path: string) => `${SITE_URL}${path}`;

export function organizationNode(locale: Locale): JsonLd {
  const isArabic = locale === 'ar';
  const sameAs = Object.values(COMPANY.social).filter(Boolean);
  return {
    '@type': ['Organization', 'LocalBusiness', 'FinancialService'],
    '@id': ORG_ID,
    name: isArabic ? COMPANY.legalNameAr : COMPANY.legalNameEn,
    alternateName: [COMPANY.brand, COMPANY.brandArabic],
    legalName: COMPANY.legalNameEn,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: abs('/logo/ammon-mark.svg'), width: 96, height: 112 },
    image: abs(`/${locale}/opengraph-image`),
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      addressCountry: COMPANY.address.addressCountry,
      ...(COMPANY.address.postOfficeBoxNumber ? { postOfficeBoxNumber: COMPANY.address.postOfficeBoxNumber } : {}),
    },
    geo: { '@type': 'GeoCoordinates', latitude: COMPANY.geo.latitude, longitude: COMPANY.geo.longitude },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: COMPANY.hours.days, opens: COMPANY.hours.opens, closes: COMPANY.hours.closes },
    ],
    areaServed: { '@type': 'Country', name: 'Qatar' },
    knowsLanguage: ['en', 'ar'],
    ...(COMPANY.foundingYear ? { foundingDate: COMPANY.foundingYear } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY.phoneE164,
        email: COMPANY.email,
        contactType: 'customer service',
        areaServed: 'QA',
        availableLanguage: ['English', 'Arabic'],
      },
    ],
  };
}

export function websiteNode(locale: Locale): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: COMPANY.brand,
    publisher: { '@id': ORG_ID },
    inLanguage: locale === 'ar' ? 'ar-QA' : 'en-QA',
  };
}

export function webPageNode(locale: Locale, path: string, name: string, description: string, extra: JsonLd = {}): JsonLd {
  const url = abs(localePath(locale, path));
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === 'ar' ? 'ar-QA' : 'en-QA',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...extra,
  };
}

export function breadcrumbNode(items: { name: string; path: string }[], locale: Locale): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(localePath(locale, item.path)),
    })),
  };
}

export function serviceNode(service: Service, locale: Locale): JsonLd {
  const url = abs(localePath(locale, `services/${service.slug}`));
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Qatar' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: abs(localePath(locale, 'contact')),
      availableLanguage: ['English', 'Arabic'],
    },
  };
}

export function faqNode(items: Pick<FaqItem, 'q' | 'a'>[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleNode(article: Article, locale: Locale): JsonLd {
  const url = abs(localePath(locale, `insights/${article.slug}`));
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: `${url}#webpage`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === 'ar' ? 'ar-QA' : 'en-QA',
    author: article.author ? { '@type': 'Person', name: article.author } : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: abs(`/${locale}/opengraph-image`),
  };
}

export function graph(nodes: JsonLd[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
