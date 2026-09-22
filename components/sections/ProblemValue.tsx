import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GoldLine } from '@/components/ui/BrandMotif';
import type { LocaleContent } from '@/content';

interface ProblemValueProps {
  problem: LocaleContent['site']['problem'];
}

/** Problem/value statement with the receivables ageing timeline (Current → 30 → 60 → 90+). */
export function ProblemValue({ problem }: ProblemValueProps) {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading heading={problem.heading} body={problem.body} />
          <GoldLine className="mt-8" />
        </Reveal>

        <Reveal group className="relative">
          <h3 className="reveal-child mb-6 text-sm font-bold uppercase tracking-[0.14em] text-slate-muted">{problem.timelineHeading}</h3>
          <ol className="relative grid gap-4 sm:grid-cols-2">
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-[1.15rem] hidden h-px bg-gradient-to-r from-gold-500/0 via-gold-500/60 to-gold-500/0 sm:block" />
            {problem.timeline.map((t, i) => {
              const intensity = ['bg-primary-900/5', 'bg-gold-100', 'bg-gold-300/50', 'bg-gold-400/60'][i] ?? 'bg-gold-400/60';
              return (
                <li key={t.label} className="reveal-child card relative p-5">
                  <span className={`inline-flex h-9 items-center rounded-full px-3 text-sm font-bold text-primary-900 ${intensity}`}>{t.label}</span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-muted">{t.body}</p>
                </li>
              );
            })}
          </ol>
          <p className="reveal-child mt-4 text-xs text-slate-muted">{problem.timelineNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
