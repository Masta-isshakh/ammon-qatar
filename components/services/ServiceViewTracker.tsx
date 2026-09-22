'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

/** Fires one service_view event per page view (slug only — no personal data). */
export function ServiceViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track({ event: 'service_view', service_slug: slug });
  }, [slug]);
  return null;
}
