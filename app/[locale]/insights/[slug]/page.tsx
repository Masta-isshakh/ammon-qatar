import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Clock, Lightbulb } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { en } from '@/content/en';
import { LOCALES, isLocale, localePath, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { articleNode, breadcrumbNode, faqNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils';

export const revalidate = 3600;
export const dynamicParams = false;

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => en.insights.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { insights } = await getContent(locale);
  const article = insights.find((a) => a.slug === slug);
  if (!article) return {};
  return buildMetadata({
    locale,
    path: `insights/${slug}`,
    title: article.seo.title,
    description: article.seo.description,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site, insights, services } = await getContent(locale);
  const article = insights.find((a) => a.slug === slug);
  if (!article) notFound();

  const page = site.pages.insights;
  const service = services.find((s) => s.slug === article.relatedService);
  const related = article.relatedArticles.map((s) => insights.find((a) => a.slug === s)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const showToc = article.sections.length >= 3;

  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, `insights/${slug}`, article.seo.title, article.seo.description, { mainEntity: { '@id': `${localePath(locale, `insights/${slug}`)}#article` } }),
    articleNode(article, locale),
    ...(article.faqs?.length ? [faqNode(article.faqs)] : []),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.insights, path: 'insights' }, { name: article.title, path: `insights/${slug}` }], locale),
  ]);

  return (
    <article>
      <JsonLd id={`ld-article-${slug}`} data={schema} />

      <header className="border-b border-line bg-white">
        <div className="container-x max-w-4xl py-12 sm:py-16">
          <Breadcrumbs
            tone="dark"
            ariaLabel={site.common.breadcrumb}
            items={[{ href: `/${locale}`, label: site.common.home }, { href: localePath(locale, 'insights'), label: site.nav.insights }, { label: article.title }]}
            className="mb-6"
          />
          <p className="eyebrow">{page.categories[article.category]}</p>
          <h1 className="mt-4 text-balance text-h1 font-bold text-primary-900">{article.title}</h1>
          <p className="mt-4 text-pretty text-lead text-slate-muted">{article.excerpt}</p>
          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-muted">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">{site.common.updated}</dt>
              <dd>
                {site.common.updated}: <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, locale)}</time>
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              <dt className="sr-only">{site.common.minutesRead}</dt>
              <dd>
                {article.readingMinutes} {site.common.minutesRead}
              </dd>
            </div>
            {article.author && (
              <div>
                <dt className="sr-only">{site.common.reviewedBy}</dt>
                <dd>
                  {site.common.reviewedBy} {article.author}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
        <div className="min-w-0 max-w-3xl">
          <aside className="rounded-2xl border border-gold-500/40 bg-gold-100/50 p-6" aria-labelledby="quick-answer">
            <h2 id="quick-answer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-gold-600">
              <Lightbulb className="size-4" aria-hidden />
              {site.common.quickAnswer}
            </h2>
            <p className="mt-2 text-ink">{article.quickAnswer}</p>
          </aside>

          {showToc && (
            <nav aria-label={site.common.tableOfContents} className="mt-8 rounded-2xl border border-line bg-white p-5 lg:hidden">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-muted">{site.common.tableOfContents}</h2>
              <ol className="mt-3 space-y-1.5 text-sm">
                {article.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-primary-900 underline-offset-4 hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose-ammon mt-4">
            {article.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {s.example && (
                  <aside className="my-6 rounded-2xl border-s-4 border-gold-500 bg-white p-5 shadow-card">
                    <p className="text-sm font-bold text-primary-900">{s.example.title}</p>
                    <p className="mt-1.5 text-sm text-ink">{s.example.body}</p>
                  </aside>
                )}
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-3xl bg-primary-900 p-6 text-white sm:p-8" aria-labelledby="checklist">
            <h2 id="checklist" className="text-h3 font-bold">
              {site.common.checklist}: {article.checklist.title}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {article.checklist.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {article.faqs && article.faqs.length > 0 && (
            <div className="-mx-5 sm:-mx-8 lg:-mx-12">
              <FAQAccordion locale={locale} eyebrow={site.faq.eyebrow} heading={site.faq.heading} items={article.faqs} layout="stack" id="article-faq" />
            </div>
          )}

          {article.sources && article.sources.length > 0 && (
            <section className="mt-10 border-t border-line pt-6" aria-labelledby="sources">
              <h2 id="sources" className="text-sm font-bold uppercase tracking-[0.14em] text-slate-muted">{site.common.sources}</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary-900 underline underline-offset-4">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {service && (
            <section className="mt-12 rounded-3xl border border-line bg-white p-6 sm:p-8" aria-labelledby="article-cta">
              <p className="eyebrow">{site.common.relatedService}</p>
              <h2 id="article-cta" className="mt-3 text-h3 font-bold text-primary-900">{service.name}</h2>
              <p className="mt-2 text-sm text-slate-muted">{service.summary}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <TrackedLink href={localePath(locale, 'contact')} event={{ event: 'article_cta_click', article_slug: slug }}>
                    {site.common.requestAssessment}
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={localePath(locale, `services/${service.slug}`)}>
                    {site.services.learnMore} <ArrowRight className="rtl:-scale-x-100" aria-hidden />
                  </Link>
                </Button>
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {showToc && (
              <nav aria-label={site.common.tableOfContents} className="rounded-2xl border border-line bg-white p-5">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-muted">{site.common.tableOfContents}</h2>
                <ol className="mt-3 space-y-2 text-sm">
                  {article.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-primary-900 underline-offset-4 hover:underline">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {service && <ServiceCard locale={locale} service={service} ctaLabel={site.services.learnMore} />}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-white py-16" aria-labelledby="related-articles">
          <div className="container-x">
            <h2 id="related-articles" className="text-h2 font-bold text-primary-900">{site.common.relatedArticles}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} locale={locale} article={a} categoryLabel={page.categories[a.category]} minutesLabel={site.common.minutesRead} readMore={site.common.readMore} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
