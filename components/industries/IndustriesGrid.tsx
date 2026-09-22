import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LocaleContent } from '@/content';
import type { Industry, Service } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';

interface IndustriesGridProps {
  locale: Locale;
  industries: Industry[];
  services: Service[];
  copy: LocaleContent['site']['industries'];
  variant?: 'compact' | 'full';
  labels?: { challenges: string; services: string };
}

export function IndustriesGrid({ locale, industries, services, copy, variant = 'compact', labels }: IndustriesGridProps) {
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  return (
    <section className="bg-section-soft py-16 sm:py-24" id="industries">
      <div className="container-x">
        {variant === 'compact' && (
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
            <Link href={localePath(locale, 'industries')} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600">
              {copy.viewAll}
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Reveal>
        )}
        <Reveal group as="ul" className={variant === 'compact' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4' : 'grid gap-5 md:grid-cols-2'}>
          {industries.map((ind) => (
            <li key={ind.slug} id={ind.slug} className="reveal-child card scroll-mt-28 p-6">
              <h3 className="text-h3 font-bold text-primary-900">{ind.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{ind.summary}</p>
              {variant === 'full' && labels && (
                <>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-gold-600">{labels.challenges}</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink">
                    {ind.challenges.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-gold-600">{labels.services}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {ind.relevantServices.map((slug) => {
                      const s = bySlug.get(slug);
                      return s ? (
                        <li key={slug}>
                          <Link
                            href={localePath(locale, `services/${slug}`)}
                            className="inline-flex min-h-9 items-center rounded-full border border-primary-900/15 bg-white px-3 text-xs font-semibold text-primary-900 hover:border-gold-500 hover:text-gold-600"
                          >
                            {s.shortName}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </>
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
