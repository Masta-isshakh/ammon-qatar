import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIconGlyph } from '@/components/ui/Icon';
import type { LocaleContent } from '@/content';
import type { Service, ServiceCategory } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';

interface ServicePillarsProps {
  locale: Locale;
  services: Service[];
  copy: LocaleContent['site']['services'];
}

const ORDER: ServiceCategory[] = ['debt', 'formation', 'government'];

/**
 * Homepage overview of the three pillars. Each card links straight to the
 * single service in that category, or to the grouped section on the services
 * index when the category holds several — which also gives every service a
 * crawlable link from the homepage.
 */
export function ServicePillars({ locale, services, copy }: ServicePillarsProps) {
  const groups = ORDER.map((category) => ({
    category,
    label: copy.categories[category].label,
    body: copy.categories[category].body,
    items: services.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="container-x">
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

        <Reveal group className="grid gap-5 lg:grid-cols-3">
          {groups.map((group) => {
            const single = group.items.length === 1 ? group.items[0] : undefined;
            const href = single
              ? localePath(locale, `services/${single.slug}`)
              : `${localePath(locale, 'services')}#${group.category}`;
            return (
              <article key={group.category} className="reveal-child card card-hover flex h-full flex-col p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-gradient text-gold-300 shadow-[0_8px_18px_-10px_rgb(0_28_85/0.8)]">
                  <ServiceIconGlyph name={group.items[0].icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-h3 font-bold text-primary-900">{group.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-muted">{group.body}</p>

                <ul className="mt-5 flex-1 space-y-1.5 border-t border-line pt-4">
                  {single
                    ? // A single-service pillar would otherwise just repeat its own title,
                      // so the card shows what the engagement actually covers instead.
                      single.scope.slice(0, 5).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-primary-900/80">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-gold-600" aria-hidden />
                          {item}
                        </li>
                      ))
                    : group.items.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={localePath(locale, `services/${s.slug}`)}
                            className="group/link flex items-start gap-2 text-sm text-primary-900/80 transition-colors hover:text-gold-600"
                          >
                            <ArrowRight
                              className="mt-1 size-3.5 shrink-0 text-gold-600 transition-transform group-hover/link:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/link:-translate-x-0.5"
                              aria-hidden
                            />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                </ul>

                <Link
                  href={href}
                  className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-900 hover:text-gold-600"
                >
                  {copy.learnMore}
                  <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
                </Link>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
