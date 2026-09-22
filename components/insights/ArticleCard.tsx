import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  locale: Locale;
  article: Article;
  categoryLabel: string;
  minutesLabel: string;
  readMore: string;
}

export function ArticleCard({ locale, article, categoryLabel, minutesLabel, readMore }: ArticleCardProps) {
  const href = localePath(locale, `insights/${article.slug}`);
  return (
    <article className="card card-hover group relative flex h-full flex-col p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-600">{categoryLabel}</p>
      <h3 className="mt-3 text-h3 font-bold text-primary-900">
        <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-muted">{article.excerpt}</p>
      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-muted">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden />
          {article.readingMinutes} {minutesLabel}
        </span>
        <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, locale)}</time>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-900 group-hover:text-gold-600">
        {readMore}
        <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
      </span>
    </article>
  );
}
