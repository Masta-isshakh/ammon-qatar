import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { Reveal } from '@/components/ui/Reveal';
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
  return buildMetadata({ locale, path: 'insights', title: site.pages.insights.title, description: site.pages.insights.description });
}

export default async function InsightsPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, insights } = await getContent(locale);
  const page = site.pages.insights;
  const sorted = [...insights].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const usedCategories = Array.from(new Set(sorted.map((a) => a.category)));
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'insights', page.title, page.description, { '@type': ['WebPage', 'CollectionPage'] }),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.insights, path: 'insights' }], locale),
  ]);

  return (
    <>
      <JsonLd id="ld-insights" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.insights }]} crumbsLabel={site.common.breadcrumb} />
      <section className="container-x py-16 lg:py-24">
        <ul className="mb-8 flex flex-wrap gap-2" aria-label={page.eyebrow}>
          {usedCategories.map((c) => (
            <li key={c} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-primary-900">
              {page.categories[c]}
            </li>
          ))}
        </ul>
        <Reveal group className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a) => (
            <div key={a.slug} className="reveal-child h-full">
              <ArticleCard locale={locale} article={a} categoryLabel={page.categories[a.category]} minutesLabel={site.common.minutesRead} readMore={site.common.readMore} />
            </div>
          ))}
        </Reveal>
      </section>
      <CTABand locale={locale} heading={site.common.ctaBandHeading} body={site.common.ctaBandBody} primary={site.common.requestAssessment} secondary={site.common.talkToTeam} location="insights_index" />
    </>
  );
}
