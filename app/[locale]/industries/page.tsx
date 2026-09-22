import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { IndustriesGrid } from '@/components/industries/IndustriesGrid';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';

export const revalidate = 3600;
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'industries', title: site.pages.industries.title, description: site.pages.industries.description });
}

export default async function IndustriesPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, industries, services } = await getContent(locale);
  const page = site.pages.industries;
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'industries', page.title, page.description),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.industries, path: 'industries' }], locale),
  ]);
  return (
    <>
      <JsonLd id="ld-industries" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.industries }]} crumbsLabel={site.common.breadcrumb} image="constructionReceivables" locale={locale} />
      <IndustriesGrid locale={locale} industries={industries} services={services} copy={site.industries} variant="full" labels={{ challenges: page.challengesLabel, services: page.servicesLabel }} />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="industries" />
    </>
  );
}
