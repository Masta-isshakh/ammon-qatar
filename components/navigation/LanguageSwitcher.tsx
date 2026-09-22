'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { track } from '@/lib/analytics/events';
import { otherLocale, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  ariaLabel: string;
  tone?: 'light' | 'dark';
}

/**
 * Swaps the locale segment and keeps the rest of the path, so
 * /en/services/x ↔ /ar/services/x. Slugs are shared across locales.
 */
export function LanguageSwitcher({ locale, label, ariaLabel, tone = 'light' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target = otherLocale(locale);
  const href = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${target}`) || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      onClick={() => track({ event: 'language_switch', from_locale: locale, to_locale: target })}
      className={cn(
        'inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors',
        tone === 'light' ? 'text-white/85 hover:bg-white/10 hover:text-white' : 'text-primary-900 hover:bg-primary-900/5',
      )}
    >
      <Languages className="size-4" aria-hidden />
      {label}
    </Link>
  );
}
