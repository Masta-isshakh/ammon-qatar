import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import type { LocaleContent } from '@/content';
import type { Service, ServiceCategory } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface ServicesGridProps {
  locale: Locale;
  services: Service[];
  copy: LocaleContent['site']['services'];
  /** Show the section heading and the "view all" link (homepage use). */
  withHeading?: boolean;
  id?: string;
}

const ORDER: ServiceCategory[] = ['debt', 'formation', 'government'];

/**
 * Full services listing, grouped by pillar. Each group gets an `id` so the
 * homepage pillar cards can deep-link to it (e.g. /en/services#formation).
 */
export function ServicesGrid({ locale, services, copy, withHeading = true, id = 'services' }: ServicesGridProps) {
  const groups = ORDER.map((category) => ({
    category,
    label: copy.categories[category].label,
    body: copy.categories[category].body,
    items: services.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <section id={id} className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="container-x">
        {withHeading && (
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
            <Link
              href={localePath(locale, 'services')}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600"
            >
              {copy.viewAll}
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Reveal>
        )}

        <div className="space-y-14">
          {groups.map((group) => {
            // A pillar with one or two services would leave a half-empty row, so
            // its heading sits beside the cards instead of stacked above them.
            const compact = group.items.length < 3;
            return (
              <div
                key={group.category}
                id={group.category}
                className={cn(
                  'scroll-mt-28 border-t border-line pt-7',
                  compact && 'grid gap-8 lg:grid-cols-[0.9fr_2.1fr] lg:items-start',
                )}
              >
                <Reveal className={cn('max-w-3xl', !compact && 'mb-7')}>
                  <h2 className="text-h3 font-bold text-primary-900">{group.label}</h2>
                  <p className="mt-2 text-slate-muted">{group.body}</p>
                </Reveal>
                <Reveal
                  group
                  className={cn(
                    'grid gap-5',
                    group.items.length >= 4
                      ? 'sm:grid-cols-2 lg:grid-cols-4'
                      : group.items.length === 3
                        ? 'sm:grid-cols-2 lg:grid-cols-3'
                        : group.items.length === 2
                          ? 'sm:grid-cols-2'
                          : 'grid-cols-1',
                  )}
                >
                  {group.items.map((s) => (
                    <div key={s.slug} className="reveal-child h-full">
                      <ServiceCard locale={locale} service={s} ctaLabel={copy.learnMore} />
                    </div>
                  ))}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
