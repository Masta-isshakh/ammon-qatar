import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import type { LocaleContent } from '@/content';
import type { Locale } from '@/lib/i18n/config';
import { breadcrumbNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils';

interface LegalPageProps {
  locale: Locale;
  site: LocaleContent['site'];
  path: 'privacy' | 'terms';
  /** TODO(legal): update on each review. */
  reviewedAt: string;
}

export function LegalPage({ locale, site, path, reviewedAt }: LegalPageProps) {
  const page = site.pages[path];
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, path, page.title, page.description),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: page.heading, path }], locale),
  ]);
  return (
    <>
      <JsonLd id={`ld-${path}`} data={schema} />
      <PageHeader heading={page.heading} intro={`${page.updated}: ${formatDate(reviewedAt, locale)}`} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: page.heading }]} crumbsLabel={site.common.breadcrumb} />
      <div className="container-x max-w-3xl py-12 lg:py-16">
        <div className="prose-ammon">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
