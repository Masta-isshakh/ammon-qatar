import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { RecoveryProcess } from '@/components/process/RecoveryProcess';
import { AmicableFirst } from '@/components/sections/AmicableFirst';
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
  return buildMetadata({ locale, path: 'process', title: site.pages.process.title, description: site.pages.process.description });
}

export default async function ProcessPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, process, faqs, services } = await getContent(locale);
  const page = site.pages.process;
  const processFaqs = faqs.filter((f) => ['negotiation-settlement', 'payment-monitoring', 'legal-follow-up'].includes(f.service ?? ''));
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'process', page.title, page.description),
    faqNode(processFaqs),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.howItWorks, path: 'process' }], locale),
  ]);
  return (
    <>
      <JsonLd id="ld-process" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.howItWorks }]} crumbsLabel={site.common.breadcrumb} image="settlementMeeting" locale={locale} />
      <RecoveryProcess locale={locale} steps={process} copy={site.process} variant="full" outcomesLabel={page.outcomesLabel} tone="light" />
      <AmicableFirst copy={site.amicable} />
      <FAQAccordion locale={locale} eyebrow={site.faq.eyebrow} heading={site.faq.heading} items={processFaqs} services={services} relatedLabel={site.common.relatedService} id="process-faq" />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="process" />
    </>
  );
}
