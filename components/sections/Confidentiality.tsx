import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SiteImage } from '@/components/ui/SiteImage';
import type { LocaleContent } from '@/content';
import type { Locale } from '@/lib/i18n/config';

interface ConfidentialityProps {
  locale: Locale;
  copy: LocaleContent['site']['confidentiality'];
}

export function Confidentiality({ locale, copy }: ConfidentialityProps) {
  return (
    <section className="bg-white py-16 sm:py-24" id="confidentiality">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-3xl border border-line shadow-card">
            <SiteImage image="confidentialFile" locale={locale} className="aspect-[4/3] object-cover" loading="lazy" />
          </div>
          {/* Secure-document visual: a layered file card rather than a padlock cliché. */}
          <div aria-hidden className="absolute -bottom-6 -end-4 hidden w-56 rounded-2xl border border-line bg-white p-4 shadow-card-hover sm:block">
            <span className="block h-2 w-16 rounded bg-gold-500" />
            <span className="mt-3 block h-1.5 w-full rounded bg-primary-900/10" />
            <span className="mt-2 block h-1.5 w-4/5 rounded bg-primary-900/10" />
            <span className="mt-2 block h-1.5 w-3/5 rounded bg-primary-900/10" />
          </div>
        </Reveal>
        <Reveal group>
          <div className="reveal-child">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
          </div>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {copy.points.map((p) => (
              <div key={p.title} className="reveal-child rounded-2xl border border-line bg-ivory p-5">
                <dt className="font-bold text-primary-900">{p.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
