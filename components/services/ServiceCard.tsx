import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceIconGlyph } from '@/components/ui/Icon';
import type { Service } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';

interface ServiceCardProps {
  locale: Locale;
  service: Service;
  ctaLabel: string;
  className?: string;
}

export function ServiceCard({ locale, service, ctaLabel, className }: ServiceCardProps) {
  const href = localePath(locale, `services/${service.slug}`);
  return (
    <article className={`card card-hover group relative flex h-full flex-col p-6 ${className ?? ''}`}>
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-gradient text-gold-300 shadow-[0_8px_18px_-10px_rgb(0_28_85/0.8)]">
        <ServiceIconGlyph name={service.icon} className="size-6" />
      </span>
      <h3 className="mt-5 text-h3 font-bold text-primary-900">
        <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-muted">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-900 transition-colors group-hover:text-gold-600">
        {ctaLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden />
      </span>
    </article>
  );
}
