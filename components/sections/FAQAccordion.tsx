import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { FaqItem, Service } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';

interface FAQAccordionProps {
  locale: Locale;
  eyebrow: string;
  heading: string;
  intro?: string;
  items: FaqItem[];
  services?: Service[];
  relatedLabel?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  id?: string;
  layout?: 'split' | 'stack';
}

/**
 * Native <details> accordion: zero JS, keyboard accessible, answers present
 * in HTML (matches FAQPage JSON-LD emitted by the page).
 */
export function FAQAccordion({ locale, eyebrow, heading, intro, items, services = [], relatedLabel, viewAllHref, viewAllLabel, id = 'faq', layout = 'split' }: FAQAccordionProps) {
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const list = (
    <Reveal group className="space-y-3">
      {items.map((item, i) => {
        const related = item.service ? bySlug.get(item.service) : undefined;
        return (
          <details key={item.q} className="reveal-child card group open:border-gold-500/50" open={i === 0}>
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-primary-900">
              {item.q}
              <ChevronDown className="size-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180" aria-hidden />
            </summary>
            <div className="px-5 pb-5 text-sm leading-relaxed text-ink">
              <p>{item.a}</p>
              {related && relatedLabel && (
                <p className="mt-3">
                  <Link href={localePath(locale, `services/${related.slug}`)} className="inline-flex items-center gap-1 font-semibold text-primary-900 hover:text-gold-600">
                    {relatedLabel}: {related.name}
                    <ArrowRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
                  </Link>
                </p>
              )}
            </div>
          </details>
        );
      })}
    </Reveal>
  );

  return (
    <section id={id} className="container-x scroll-mt-24 py-16 sm:py-24">
      {layout === 'split' ? (
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} heading={heading} body={intro} />
            {viewAllHref && viewAllLabel && (
              <Link href={viewAllHref} className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600">
                {viewAllLabel}
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            )}
          </Reveal>
          {list}
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10">
            <SectionHeading eyebrow={eyebrow} heading={heading} body={intro} />
          </Reveal>
          {list}
        </div>
      )}
    </section>
  );
}
