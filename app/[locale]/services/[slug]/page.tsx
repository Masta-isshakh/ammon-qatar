import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Info, MessageCircle } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceIconGlyph } from '@/components/ui/Icon';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceViewTracker } from '@/components/services/ServiceViewTracker';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTABand } from '@/components/sections/CTABand';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { SERVICE_IMAGES } from '@/content/images';
import { whatsappLink } from '@/lib/constants/company';
import { LOCALES, isLocale, localePath, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, organizationNode, serviceNode, webPageNode, websiteNode } from '@/lib/seo/schema';
import { en } from '@/content/en';

export const revalidate = 3600;
export const dynamicParams = false;

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => en.services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { services } = await getContent(locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({ locale, path: `services/${slug}`, title: service.seo.title, description: service.seo.description });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const content = await getContent(locale);
  const { site, services, insights } = content;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = service.relatedServices.map((s) => services.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedArticles = service.relatedInsights.map((s) => insights.find((a) => a.slug === s)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const wa = whatsappLink(locale === 'ar' ? `مرحباً عمون قطر، أود الاستفسار عن خدمة ${service.name}.` : `Hello Ammon Qatar, I would like to enquire about ${service.name}.`);

  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, `services/${slug}`, service.seo.title, service.seo.description, { mainEntity: { '@id': `${localePath(locale, `services/${slug}`)}#service` } }),
    serviceNode(service, locale),
    faqNode(service.faqs),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.services, path: 'services' }, { name: service.name, path: `services/${slug}` }], locale),
  ]);

  return (
    <article>
      <JsonLd id={`ld-service-${slug}`} data={schema} />
      <ServiceViewTracker slug={slug} />
      <PageHeader
        eyebrow={service.hero.eyebrow}
        heading={service.hero.heading}
        intro={service.hero.intro}
        crumbs={[{ href: `/${locale}`, label: site.common.home }, { href: localePath(locale, 'services'), label: site.nav.services }, { label: service.name }]}
        crumbsLabel={site.common.breadcrumb}
        image={SERVICE_IMAGES[service.slug]}
        locale={locale}
      >
        <Button asChild variant="gold" size="lg">
          <TrackedLink href={localePath(locale, 'contact')} event={{ event: 'cta_click', cta_id: 'service_hero_assessment', location: `service_${slug}` }}>
            {site.common.requestAssessment}
          </TrackedLink>
        </Button>
        <Button asChild variant="outlineLight" size="lg">
          <TrackedLink href={wa} external event={{ event: 'whatsapp_click', location: `service_${slug}` }}>
            <MessageCircle /> {site.common.talkToTeam}
          </TrackedLink>
        </Button>
      </PageHeader>

      {service.note && (
        <div className="border-b border-line bg-gold-100/60">
          <p className="container-x flex items-start gap-2 py-3 text-sm text-primary-900">
            <Info className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
            {service.note}
          </p>
        </div>
      )}

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <div className="space-y-14">
          <Reveal as="section" aria-labelledby="who">
            <h2 id="who" className="text-h2 font-bold text-primary-900">{site.common.whoItsFor}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.audience.map((a) => (
                <li key={a} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-ink">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-500/40">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="covers">
            <h2 id="covers" className="text-h2 font-bold text-primary-900">{site.common.whatItCovers}</h2>
            <ul className="mt-6 space-y-3">
              {service.scope.map((s) => (
                <li key={s} className="flex items-start gap-3 text-ink">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="approach" group>
            <h2 id="approach" className="reveal-child text-h2 font-bold text-primary-900">{site.common.howWeApproach}</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.approach.map((step, i) => (
                <li key={step.title} className="reveal-child card p-5">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary-900 text-sm font-bold text-gold-300" dir="ltr">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-bold text-primary-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <FAQAccordion locale={locale} eyebrow={site.faq.eyebrow} heading={`${site.faq.heading}`} items={service.faqs} layout="stack" id="service-faq" />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-900 text-gold-300">
              <ServiceIconGlyph name={service.icon} className="size-6" />
            </span>
            <h2 className="mt-4 text-h3 font-bold text-primary-900">{site.common.prepare}</h2>
            <ul className="mt-4 space-y-2.5">
              {service.preparation.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <Button asChild variant="primary" size="lg" className="mt-6 w-full">
              <TrackedLink href={localePath(locale, 'contact')} event={{ event: 'cta_click', cta_id: 'service_sidebar_assessment', location: `service_${slug}` }}>
                {site.common.requestAssessment}
              </TrackedLink>
            </Button>
          </div>

          {relatedArticles.length > 0 && (
            <div className="card p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-muted">{site.common.relatedArticles}</h2>
              <ul className="mt-4 space-y-3">
                {relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link href={localePath(locale, `insights/${a.slug}`)} className="group flex items-start gap-2 text-sm font-semibold text-primary-900 hover:text-gold-600">
                      <ArrowRight className="mt-1 size-3.5 shrink-0 rtl:-scale-x-100" aria-hidden />
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-white py-16" aria-labelledby="related-services">
          <div className="container-x">
            <h2 id="related-services" className="text-h2 font-bold text-primary-900">{site.common.relatedServices}</h2>
            <Reveal group className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((s) => (
                <div key={s.slug} className="reveal-child h-full">
                  <ServiceCard locale={locale} service={s} ctaLabel={site.services.learnMore} />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location={`service_${slug}`} />
    </article>
  );
}
