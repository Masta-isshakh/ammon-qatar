import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GoldLine, ShieldMotif } from '@/components/ui/BrandMotif';
import type { LocaleContent } from '@/content';

interface AmicableFirstProps {
  copy: LocaleContent['site']['amicable'];
}

export function AmicableFirst({ copy }: AmicableFirstProps) {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
          <ul className="mt-8 space-y-3">
            {copy.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-500/40">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary-gradient p-8 text-white sm:p-12">
          <ShieldMotif className="pointer-events-none absolute -end-12 -top-10 h-[150%] opacity-50" />
          <GoldLine className="relative mb-6" />
          <blockquote className="relative text-balance text-h2 font-bold leading-tight">“{copy.quote}”</blockquote>
        </Reveal>
      </div>
    </section>
  );
}
