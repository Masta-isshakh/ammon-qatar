import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LocaleContent } from '@/content';
import type { ProcessStep } from '@/content/types';
import { localePath, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface RecoveryProcessProps {
  locale: Locale;
  steps: ProcessStep[];
  copy: LocaleContent['site']['process'];
  /** Full variant renders outcomes for each step (process page). */
  variant?: 'compact' | 'full';
  outcomesLabel?: string;
  tone?: 'dark' | 'light';
}

/**
 * Five-step process. The gold track scales in via CSS when the Reveal
 * wrapper gets `.is-in` (IntersectionObserver) — transform only, no layout.
 */
export function RecoveryProcess({ locale, steps, copy, variant = 'compact', outcomesLabel, tone = 'dark' }: RecoveryProcessProps) {
  const dark = tone === 'dark';
  return (
    <section className={cn('py-16 sm:py-24', dark ? 'bg-primary-gradient text-white' : 'bg-white')} id="process">
      <div className="container-x">
        {variant === 'compact' && (
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} tone={dark ? 'light' : 'dark'} />
            <Link
              href={localePath(locale, 'process')}
              className={cn('inline-flex min-h-11 items-center gap-1.5 font-semibold', dark ? 'text-gold-300 hover:text-gold-200' : 'text-primary-900 hover:text-gold-600')}
            >
              {copy.viewFull}
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Reveal>
        )}

        <Reveal group className="relative">
          {/* Track: vertical on mobile, horizontal on lg. Scaled by CSS when .is-in is set on the group. */}
          <span
            aria-hidden
            className={cn(
              'process-track absolute start-[1.375rem] top-0 h-full w-0.5 lg:start-0 lg:top-[1.375rem] lg:h-0.5 lg:w-full',
              dark ? 'bg-gradient-to-b from-gold-400 to-gold-500/40 lg:bg-gradient-to-r' : 'bg-gradient-to-b from-gold-500 to-gold-500/30 lg:bg-gradient-to-r',
            )}
          />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((step) => (
              <li key={step.number} className="reveal-child relative ps-16 lg:ps-0 lg:pt-16">
                <span
                  className={cn(
                    'absolute start-0 top-0 inline-flex size-11 items-center justify-center rounded-full text-base font-bold ring-4',
                    dark ? 'bg-gold-500 text-primary-950 ring-primary-900' : 'bg-primary-900 text-gold-300 ring-white',
                  )}
                  dir="ltr"
                >
                  {step.number}
                </span>
                <h3 className={cn('text-h3 font-bold', dark ? 'text-white' : 'text-primary-900')}>{step.title}</h3>
                <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-white/70' : 'text-slate-muted')}>{step.body}</p>
                {variant === 'full' && (
                  <div className="mt-4">
                    {outcomesLabel && <p className={cn('text-xs font-bold uppercase tracking-wider', dark ? 'text-gold-300' : 'text-gold-600')}>{outcomesLabel}</p>}
                    <ul className="mt-2 space-y-1.5">
                      {step.outcomes.map((o) => (
                        <li key={o} className={cn('flex items-start gap-2 text-sm', dark ? 'text-white/80' : 'text-ink')}>
                          <Check className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-gold-300' : 'text-gold-600')} aria-hidden />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
