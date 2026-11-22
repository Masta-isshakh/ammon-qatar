import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { getContent } from '@/content';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

/** Meta "User Data Deletion Instructions URL" — public, no login. */
export const revalidate = 3600;
type Params = Promise<{ locale: string }>;
const REVIEWED_AT = '2026-11-22'; // TODO(legal): update after review.

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'data-deletion', title: site.pages.dataDeletion.title, description: site.pages.dataDeletion.description });
}

export default async function Page({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return <LegalPage locale={locale} site={site} path="data-deletion" reviewedAt={REVIEWED_AT} />;
}
