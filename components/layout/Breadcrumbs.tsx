import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  ariaLabel: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/** Visual breadcrumb; BreadcrumbList JSON-LD is emitted separately by lib/seo/schema. */
export function Breadcrumbs({ items, ariaLabel, tone = 'light', className }: BreadcrumbsProps) {
  const light = tone === 'light';
  return (
    <nav aria-label={ariaLabel} className={cn('text-xs sm:text-sm', light ? 'text-white/60' : 'text-slate-muted', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className={cn('transition-colors', light ? 'hover:text-white' : 'hover:text-primary-900')}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={cn(last && (light ? 'text-white' : 'text-primary-900'))}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-60 rtl:-scale-x-100" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
