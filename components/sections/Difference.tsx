import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LocaleContent } from '@/content';

interface DifferenceProps {
  copy: LocaleContent['site']['difference'];
}

export function Difference({ copy }: DifferenceProps) {
  return (
    <section className="container-x py-16 sm:py-24">
      <Reveal className="mb-12">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} />
      </Reveal>
      <Reveal group as="ul" className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item, i) => (
          <li key={item.title} className="reveal-child border-t border-line pt-6">
            <span className="text-sm font-bold tabular-nums text-gold-600" dir="ltr">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-h3 font-bold text-primary-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-muted">{item.body}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
