import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';

export const revalidate = 3600;
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'faq', title: site.pages.faq.title, description: site.pages.faq.description });
}

export default async function FaqPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, faqs, services } = await getContent(locale);
  const page = site.pages.faq;
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'faq', page.title, page.description, { '@type': ['WebPage', 'FAQPage'] }),
    faqNode(faqs),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.faq, path: 'faq' }], locale),
  ]);
  return (
    <>
      <JsonLd id="ld-faq" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.faq }]} crumbsLabel={site.common.breadcrumb} />
      <FAQAccordion locale={locale} eyebrow={site.faq.eyebrow} heading={site.faq.heading} items={faqs} services={services} relatedLabel={site.common.relatedService} layout="stack" id="all-faq" />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="faq" />
    </>
  );
}
