import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import type { LocaleContent } from '@/content';
import type { Service } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';

interface ServicesGridProps {
  locale: Locale;
  services: Service[];
  copy: LocaleContent['site']['services'];
  /** Show section heading + "view all" (homepage) or just the grid (services page). */
  withHeading?: boolean;
  id?: string;
}

export function ServicesGrid({ locale, services, copy, withHeading = true, id = 'services' }: ServicesGridProps) {
  return (
    <section id={id} className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="container-x">
        {withHeading && (
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
            <Link href={localePath(locale, 'services')} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600">
              {copy.viewAll}
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Reveal>
        )}
        <Reveal group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.slug} className="reveal-child h-full">
              <ServiceCard locale={locale} service={s} ctaLabel={copy.learnMore} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
