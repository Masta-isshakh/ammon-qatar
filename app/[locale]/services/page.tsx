import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { RecoveryProcess } from '@/components/process/RecoveryProcess';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, organizationNode, serviceNode, webPageNode, websiteNode } from '@/lib/seo/schema';

export const revalidate = 3600;

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'services', title: site.pages.services.title, description: site.pages.services.description });
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const content = await getContent(locale);
  const { site, services, process } = content;
  const page = site.pages.services;

  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'services', page.title, page.description),
    ...services.map((s) => serviceNode(s, locale)),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.services, path: 'services' }], locale),
  ]);

  return (
    <>
      <JsonLd id="ld-services" data={schema} />
      <PageHeader
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.services }]}
        crumbsLabel={site.common.breadcrumb}
      />
      <ServicesGrid locale={locale} services={services} copy={site.services} withHeading={false} id="all-services" />
      <RecoveryProcess locale={locale} steps={process} copy={site.process} tone="light" />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="services_index" />
    </>
  );
}
