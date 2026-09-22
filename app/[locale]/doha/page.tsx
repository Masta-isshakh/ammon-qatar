import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SiteImage } from '@/components/ui/SiteImage';
import { ServiceCard } from '@/components/services/ServiceCard';
import { LocationSection } from '@/components/sections/LocationSection';
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
  return buildMetadata({ locale, path: 'doha', title: site.pages.doha.title, description: site.pages.doha.description });
}

/**
 * Single local entity page (no thin per-district pages). Content describes
 * how working from Doha affects the service; NAP comes from company config.
 */
export default async function DohaPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, services } = await getContent(locale);
  const page = site.pages.doha;
  const featured = services.filter((s) => ['corporate-debt-collection', 'unpaid-invoice-recovery', 'negotiation-settlement'].includes(s.slug));
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'doha', page.title, page.description),
    ...featured.map((s) => serviceNode(s, locale)),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.doha, path: 'doha' }], locale),
  ]);

  return (
    <>
      <JsonLd id="ld-doha" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.doha }]} crumbsLabel={site.common.breadcrumb} />

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <SectionHeading heading={page.localHeading} body={page.localBody} />
          <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.14em] text-slate-muted">{page.areasHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {page.areas.map((a) => (
              <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-primary-900">
                <MapPin className="size-3.5 text-gold-600" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="overflow-hidden rounded-3xl border border-line shadow-card">
          <SiteImage image="dohaSkyline" locale={locale} className="aspect-[16/9] object-cover" loading="lazy" />
        </Reveal>
      </section>

      <section className="bg-white py-16 sm:py-24" aria-labelledby="doha-services">
        <div className="container-x">
          <h2 id="doha-services" className="text-h2 font-bold text-primary-900">{page.whatWeDoHeading}</h2>
          <Reveal group className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((s) => (
              <div key={s.slug} className="reveal-child h-full">
                <ServiceCard locale={locale} service={s} ctaLabel={site.services.learnMore} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <LocationSection locale={locale} copy={{ ...site.location, heading: page.visitHeading }} withImage={false} />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="doha" />
    </>
  );
}
