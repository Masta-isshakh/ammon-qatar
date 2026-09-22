import Link from 'next/link';
import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SiteImage } from '@/components/ui/SiteImage';
import type { LocaleContent } from '@/content';
import { COMPANY, FLAGS, formatAddress, formatPhoneDisplay, mapsLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

interface LocationSectionProps {
  locale: Locale;
  copy: LocaleContent['site']['location'];
  withImage?: boolean;
}

/** Doha entity block. All NAP values come from lib/constants/company.ts — keep them consistent with Google Business Profile. */
export function LocationSection({ locale, copy, withImage = true }: LocationSectionProps) {
  const rows = [
    {
      icon: MapPin,
      label: copy.address,
      value: (
        <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600">
          {formatAddress(locale).join(' · ')}
        </a>
      ),
    },
    {
      icon: Phone,
      label: copy.phone,
      value: (
        <a href={`tel:${COMPANY.phoneE164}`} dir="ltr" className="hover:text-gold-600">
          {formatPhoneDisplay()}
        </a>
      ),
    },
    {
      icon: Mail,
      label: copy.email,
      value: (
        <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-600">
          {COMPANY.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: copy.hours,
      value: (
        <span>
          {copy.hoursValue} · <span dir="ltr">{COMPANY.hours.opens}–{COMPANY.hours.closes}</span>
        </span>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24" id="location">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} body={copy.body} />
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-900/5 text-primary-900">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-muted">{label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-muted">
            <span className="font-semibold text-primary-900">{copy.serviceAreas}:</span> {copy.serviceAreasValue}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600">
              {copy.map}
              <ExternalLink className="size-4" aria-hidden />
            </a>
            {FLAGS.showDohaPage && (
              <Link href={localePath(locale, 'doha')} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-900 hover:text-gold-600">
                {copy.learnMore}
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            )}
          </div>
        </Reveal>
        {withImage && (
          <Reveal className="overflow-hidden rounded-3xl border border-line shadow-card">
            <SiteImage image="dohaSkyline" locale={locale} className="aspect-[16/9] object-cover" loading="lazy" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
