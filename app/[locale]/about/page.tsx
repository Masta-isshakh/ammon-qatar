import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SiteImage } from '@/components/ui/SiteImage';
import { GoldLine } from '@/components/ui/BrandMotif';
import { Difference } from '@/components/sections/Difference';
import { Confidentiality } from '@/components/sections/Confidentiality';
import { LocationSection } from '@/components/sections/LocationSection';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { COMPANY } from '@/lib/constants/company';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';

export const revalidate = 3600;
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'about', title: site.pages.about.title, description: site.pages.about.description });
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  const page = site.pages.about;
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'about', page.title, page.description, { '@type': ['WebPage', 'AboutPage'] }),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.about, path: 'about' }], locale),
  ]);

  return (
    <>
      <JsonLd id="ld-about" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.about }]} crumbsLabel={site.common.breadcrumb} image="team" locale={locale} />

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <SectionHeading heading={page.missionHeading} />
          <GoldLine className="mt-6" />
          <p className="mt-6 text-pretty text-lead text-ink">{page.mission}</p>
        </Reveal>
        <Reveal className="overflow-hidden rounded-3xl border border-line shadow-card">
          <SiteImage image="corporateMeeting" locale={locale} className="aspect-[16/9] object-cover" loading="lazy" />
        </Reveal>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mb-10">
            <SectionHeading heading={page.valuesHeading} />
          </Reveal>
          <Reveal group as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.values.map((v) => (
              <li key={v.title} className="reveal-child card p-6">
                <h3 className="text-h3 font-bold text-primary-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-muted">{v.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Difference copy={site.difference} />

      <section className="container-x grid gap-10 py-8 md:grid-cols-2">
        <Reveal className="card p-8">
          <h2 className="text-h3 font-bold text-primary-900">{page.teamHeading}</h2>
          <p className="mt-3 text-sm text-slate-muted">{page.teamNote}</p>
        </Reveal>
        <Reveal className="card p-8">
          <h2 className="text-h3 font-bold text-primary-900">{page.complianceHeading}</h2>
          <p className="mt-3 text-sm text-slate-muted">{page.compliance}</p>
          {COMPANY.crNumber && (
            <p className="mt-3 text-sm font-semibold text-primary-900">
              {site.footer.cr} <span dir="ltr">{COMPANY.crNumber}</span>
            </p>
          )}
        </Reveal>
      </section>

      <Confidentiality locale={locale} copy={site.confidentiality} />
      <LocationSection locale={locale} copy={site.location} withImage={false} />
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="about" />
    </>
  );
}
