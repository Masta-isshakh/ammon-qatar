import { HomeHero } from '@/components/hero/HomeHero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { ProblemValue } from '@/components/sections/ProblemValue';
import { ServicePillars } from '@/components/services/ServicePillars';
import { Difference } from '@/components/sections/Difference';
import { RecoveryProcess } from '@/components/process/RecoveryProcess';
import { IndustriesGrid } from '@/components/industries/IndustriesGrid';
import { AmicableFirst } from '@/components/sections/AmicableFirst';
import { Confidentiality } from '@/components/sections/Confidentiality';
import { Evidence, Testimonials } from '@/components/sections/Evidence';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { LeadCapture } from '@/components/forms/LeadCapture';
import { LocationSection } from '@/components/sections/LocationSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { isLocale, localePath, type Locale } from '@/lib/i18n/config';
import { breadcrumbNode, faqNode, graph, organizationNode, serviceNode, webPageNode, websiteNode } from '@/lib/seo/schema';

// Fully static; ISR keeps content edits flowing without a redeploy.
export const revalidate = 3600;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const content = await getContent(locale);
  const { site, services, industries, process, faqs, caseStudies, testimonials } = content;
  const homeFaqs = faqs.slice(0, 5);

  // One link per pillar: straight to the service when a pillar holds only one,
  // otherwise to its grouped section on the services index.
  const heroServiceLinks = (['debt', 'formation', 'government'] as const).map((category) => {
    const items = services.filter((s) => s.category === category);
    return {
      label: site.services.categories[category].label,
      href: items.length === 1 ? localePath(locale, `services/${items[0].slug}`) : `${localePath(locale, 'services')}#${category}`,
    };
  });

  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, '', site.meta.home.title, site.meta.home.description),
    ...services.map((s) => serviceNode(s, locale)),
    faqNode(homeFaqs),
    breadcrumbNode([{ name: site.common.home, path: '' }], locale),
  ]);

  return (
    <>
      <JsonLd id="ld-home" data={schema} />
      <HomeHero locale={locale} hero={site.hero} serviceLinks={heroServiceLinks} />
      <TrustStrip trust={site.trust} />
      <ProblemValue problem={site.problem} />
      <ServicePillars locale={locale} services={services} copy={site.services} />
      <Difference copy={site.difference} />
      <RecoveryProcess locale={locale} steps={process} copy={site.process} />
      <IndustriesGrid locale={locale} industries={industries} services={services} copy={site.industries} />
      <AmicableFirst copy={site.amicable} />
      <Confidentiality locale={locale} copy={site.confidentiality} />
      <Evidence locale={locale} copy={site.evidence} caseStudies={caseStudies} ctaLabel={site.evidence.cta} />
      <Testimonials copy={site.testimonials} testimonials={testimonials} />
      <FAQAccordion
        locale={locale}
        eyebrow={site.faq.eyebrow}
        heading={site.faq.heading}
        items={homeFaqs}
        services={services}
        relatedLabel={site.common.relatedService}
        viewAllHref={localePath(locale, 'faq')}
        viewAllLabel={site.faq.viewAll}
      />
      <LeadCapture locale={locale} content={content} />
      <LocationSection locale={locale} copy={site.location} />
    </>
  );
}
