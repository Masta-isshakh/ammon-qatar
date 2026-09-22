import { BadgeCheck, Eye, ListChecks, MapPin, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import type { LocaleContent } from '@/content';
import { VERIFIED_CREDENTIALS } from '@/lib/constants/company';

interface TrustStripProps {
  trust: LocaleContent['site']['trust'];
}

const ICONS = [ShieldCheck, ListChecks, Eye, MapPin];

/** Non-numeric trust concepts by default; credential badges only render once verified via env. */
export function TrustStrip({ trust }: TrustStripProps) {
  const credentials = VERIFIED_CREDENTIALS.map((key) => trust.credentials[key as keyof typeof trust.credentials]).filter(Boolean);

  return (
    <section aria-label={trust.heading} className="border-b border-line bg-white">
      <div className="container-x py-8 sm:py-10">
        <Reveal group as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={item.title} className="reveal-child flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-900/5 text-primary-900 ring-1 ring-primary-900/10">
                  <Icon className="size-5" aria-hidden strokeWidth={1.7} />
                </span>
                <div>
                  <h2 className="text-base font-bold text-primary-900">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-muted">{item.body}</p>
                </div>
              </li>
            );
          })}
        </Reveal>
        {credentials.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-2 border-t border-line pt-6">
            {credentials.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-600">
                <BadgeCheck className="size-3.5" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
