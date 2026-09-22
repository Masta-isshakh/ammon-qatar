import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Evidence } from '@/components/sections/Evidence';
import { RecoveryProcess } from '@/components/process/RecoveryProcess';
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
  return buildMetadata({ locale, path: 'case-studies', title: site.pages.caseStudies.title, description: site.pages.caseStudies.description });
}

/** Architecture for verified, anonymised case studies; renders the educational fallback while none are approved. */
export default async function CaseStudiesPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, caseStudies, process } = await getContent(locale);
  const page = site.pages.caseStudies;
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'case-studies', page.title, page.description),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: page.eyebrow, path: 'case-studies' }], locale),
  ]);
  return (
    <>
      <JsonLd id="ld-case-studies" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={site.evidence.body} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: page.eyebrow }]} crumbsLabel={site.common.breadcrumb} />
      <Evidence locale={locale} copy={site.evidence} caseStudies={caseStudies} ctaLabel={site.evidence.cta} />
      <RecoveryProcess locale={locale} steps={process} copy={site.process} tone="light" />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="case_studies" />
    </>
  );
}
