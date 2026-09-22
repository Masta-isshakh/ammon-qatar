'use client';

import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { track } from '@/lib/analytics/events';
import { localePath, type Locale } from '@/lib/i18n/config';

interface MobileStickyBarProps {
  locale: Locale;
  labels: { call: string; whatsapp: string; assess: string };
  phoneHref: string;
  whatsappHref: string;
}

/** Fixed bottom conversion bar (<md). Body padding reserves its height + safe area. */
export function MobileStickyBar({ locale, labels, phoneHref, whatsappHref }: MobileStickyBarProps) {
  return (
    <nav
      aria-label={labels.assess}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-900/10 bg-white/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid h-[var(--mobile-bar-h)] grid-cols-[1fr_1fr_1.6fr] gap-2 px-3 py-2">
        <a
          href={phoneHref}
          onClick={() => track({ event: 'call_click', location: 'mobile_bar' })}
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold text-primary-900 active:bg-primary-900/5"
        >
          <Phone className="size-5" aria-hidden />
          {labels.call}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track({ event: 'whatsapp_click', location: 'mobile_bar' })}
          className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold text-primary-900 active:bg-primary-900/5"
        >
          <MessageCircle className="size-5" aria-hidden />
          {labels.whatsapp}
        </a>
        <Link
          href={localePath(locale, 'contact')}
          onClick={() => track({ event: 'cta_click', cta_id: 'mobile_bar_assessment', location: 'mobile_bar' })}
          className="flex min-h-11 items-center justify-center rounded-xl bg-primary-900 px-3 text-center text-sm font-bold leading-tight text-white shadow-[0_8px_20px_-12px_rgb(0_28_85/0.8)] active:bg-primary-800"
        >
          {labels.assess}
        </Link>
      </div>
    </nav>
  );
}
