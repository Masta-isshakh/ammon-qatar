'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * The Google tag is server-rendered in <head> (app/[locale]/layout.tsx). Pages whose shell React
 * renders on the client — e.g. the localized 404, thrown from the catch-all route — get the async
 * gtag.js file inserted but never execute the inline config, because React does not run inline
 * scripts it creates. This runs the same config only when `gtag` is still undefined, so normal
 * server-rendered pages (where the head snippet has already run) are never configured twice.
 */
export function GoogleTagFallback({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    if (typeof window.gtag === 'function') return;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js expects the `arguments` object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  }, [measurementId]);
  return null;
}
