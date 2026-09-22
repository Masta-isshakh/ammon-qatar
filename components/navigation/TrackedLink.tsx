'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnalyticsEvent } from '@/lib/analytics/events';
import { track } from '@/lib/analytics/events';

interface TrackedLinkProps extends LinkProps {
  event: AnalyticsEvent;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

/** Client leaf that fires one analytics event on click; keeps parents as Server Components. */
export function TrackedLink({ event, external, children, className, href, ...rest }: TrackedLinkProps) {
  if (external) {
    return (
      <a href={String(href)} className={className} target="_blank" rel="noopener noreferrer" onClick={() => track(event)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={() => track(event)} {...rest}>
      {children}
    </Link>
  );
}
