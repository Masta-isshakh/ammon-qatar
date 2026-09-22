import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LocaleContent } from '@/content';
import type { CaseStudy, Testimonial } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';

interface EvidenceProps {
  locale: Locale;
  copy: LocaleContent['site']['evidence'];
  caseStudies: CaseStudy[];
  ctaLabel: string;
}

/**
 * Renders verified, permission-granted, anonymised case studies. When none
 * exist, renders an educational "what a well-run file looks like" section —
 * never fabricated results.
 */
export function Evidence({ locale, copy, caseStudies, ctaLabel }: EvidenceProps) {
  const publishable = caseStudies.filter((c) => c.permissionGranted && c.anonymized);

  return (
    <section className="container-x py-16 sm:py-24" id="results">
      {publishable.length > 0 ? (
        <>
          <Reveal className="mb-12">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
          </Reveal>
          <Reveal group as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {publishable.slice(0, 3).map((c) => (
              <li key={c.id} className="reveal-child card p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">{c.industry}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-primary-900">{c.debtType}</dt>
                    <dd className="text-slate-muted">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary-900">{c.approach}</dt>
                    <dd className="text-slate-muted">{c.resolution}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-slate-muted">{c.ageRange} · {c.duration}</p>
              </li>
            ))}
          </Reveal>
        </>
      ) : (
        <>
          <Reveal className="mb-12">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.educationalHeading} body={copy.educationalBody} />
          </Reveal>
          <Reveal group as="ol" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.educational.map((item, i) => (
              <li key={item.title} className="reveal-child card p-6">
                <span className="text-sm font-bold text-gold-600" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-bold text-primary-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-muted">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </>
      )}
      <div className="mt-10">
        <Link href={localePath(locale, 'contact')} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600">
          {ctaLabel}
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

interface TestimonialsProps {
  copy: LocaleContent['site']['testimonials'];
  testimonials: Testimonial[];
}

/** Rendered only when verified testimonials exist. No ratings, no generated identities. */
export function Testimonials({ copy, testimonials }: TestimonialsProps) {
  const verified = testimonials.filter((t) => t.verified);
  if (verified.length === 0) return null;
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="testimonials-heading">
      <div className="container-x">
        <Reveal className="mb-12">
          <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} />
        </Reveal>
        <Reveal group as="ul" className="grid gap-5 md:grid-cols-3">
          {verified.map((t) => (
            <li key={t.id} className="reveal-child card relative p-6">
              <Quote className="size-6 text-gold-400" aria-hidden />
              <blockquote className="mt-3 text-ink">{t.quote}</blockquote>
              <footer className="mt-5 text-sm">
                <p className="font-bold text-primary-900">{t.name}</p>
                <p className="text-slate-muted">
                  {t.role}
                  {t.company ? ` · ${t.company}` : ''}
                </p>
              </footer>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
