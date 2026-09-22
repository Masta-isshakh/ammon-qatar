import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { getContent } from '@/content';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;
type Params = Promise<{ locale: string }>;
const REVIEWED_AT = '2026-09-22'; // TODO(legal): update after review.

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'privacy', title: site.pages.privacy.title, description: site.pages.privacy.description });
}

export default async function Page({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return <LegalPage locale={locale} site={site} path="privacy" reviewedAt={REVIEWED_AT} />;
}
