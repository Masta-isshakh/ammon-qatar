import Link from 'next/link';
import { Mail } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import type { LocaleContent } from '@/content';
import type { LegalPageContent, LegalRequestCard } from '@/content/types';
import { COMPANY } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';
import { breadcrumbNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils';

/** Route segment → key in `site.pages`. */
const CONTENT_KEY = { privacy: 'privacy', terms: 'terms', 'data-deletion': 'dataDeletion' } as const;
export type LegalPath = keyof typeof CONTENT_KEY;

interface LegalPageProps {
  locale: Locale;
  site: LocaleContent['site'];
  path: LegalPath;
  /** TODO(legal): update on each review. */
  reviewedAt: string;
}

const INLINE_TOKEN = /(\{email\}|\{company\}|\[[^\]]+\]\([^)\s]+\))/g;
const INLINE_LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

/** Renders `{email}`, `{company}` and `[label](href)` tokens inside legal copy. */
function renderInline(text: string, locale: Locale) {
  return text.split(INLINE_TOKEN).map((part, i) => {
    if (part === '{email}') {
      return (
        <a key={i} href={`mailto:${COMPANY.email}`} dir="ltr">
          {COMPANY.email}
        </a>
      );
    }
    if (part === '{company}') return locale === 'ar' ? COMPANY.legalNameAr : COMPANY.legalNameEn;
    const link = INLINE_LINK.exec(part);
    if (link) {
      const [, label, href] = link;
      return href.startsWith('/') ? (
        <Link key={i} href={localePath(locale, href)}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return part;
  });
}

function mailtoHref(card: LegalRequestCard) {
  // RFC 6068: line breaks in a mailto body are CRLF.
  const body = card.template.replace(/\n/g, '\r\n');
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(card.subject)}&body=${encodeURIComponent(body)}`;
}

export function LegalPage({ locale, site, path, reviewedAt }: LegalPageProps) {
  const page: LegalPageContent = site.pages[CONTENT_KEY[path]];
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
        {page.intro && (
          <div className="prose-ammon">
            <p className="text-lead">{renderInline(page.intro, locale)}</p>
          </div>
        )}

        {/* Kept outside .prose-ammon so its link/heading rules don't restyle the button. */}
        {page.request && (
          <aside aria-labelledby="legal-request-heading" className="my-10 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 id="legal-request-heading" className="text-h3 font-bold text-primary-900">
              {page.request.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-ink">{page.request.body}</p>
            <div className="mt-6">
              <Button asChild variant="primary" size="lg" className="whitespace-normal text-center">
                <a href={mailtoHref(page.request)}>
                  <Mail aria-hidden />
                  {page.request.button}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-muted">
              {page.request.fallback}{' '}
              <a href={`mailto:${COMPANY.email}`} dir="ltr" className="font-semibold text-primary-900 underline underline-offset-2">
                {COMPANY.email}
              </a>
            </p>
          </aside>
        )}

        <div className="prose-ammon">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {/* Static copy → index keys (text keys would duplicate every paragraph in the RSC payload). */}
              {s.body.map((p, i) => (
                <p key={i}>{renderInline(p, locale)}</p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, i) => (
                    <li key={i}>{renderInline(b, locale)}</li>
                  ))}
                </ul>
              )}
              {s.steps && (
                <ol className="my-4 list-decimal ps-5">
                  {s.steps.map((step, i) => (
                    <li key={i}>{renderInline(step, locale)}</li>
                  ))}
                </ol>
              )}
              {s.after?.map((p, i) => (
                <p key={i}>{renderInline(p, locale)}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
