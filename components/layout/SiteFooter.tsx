import Link from 'next/link';
import Image from 'next/image';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import type { LocaleContent } from '@/content';
import { COMPANY, FLAGS, formatAddress, formatPhoneDisplay, mapsLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

interface SiteFooterProps {
  locale: Locale;
  content: LocaleContent;
}

export function SiteFooter({ locale, content }: SiteFooterProps) {
  const { site, services, insights } = content;
  const f = site.footer;
  const year = new Date().getFullYear();
  const isArabic = locale === 'ar';
  const SOCIAL_LABELS: Record<string, string> = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn' };
  const socials = Object.entries(COMPANY.social).filter(([, url]) => url);

  const companyLinks = [
    { href: localePath(locale, 'about'), label: site.nav.about },
    { href: localePath(locale, 'process'), label: site.nav.howItWorks },
    { href: localePath(locale, 'industries'), label: site.nav.industries },
    { href: localePath(locale, 'case-studies'), label: site.pages.caseStudies.eyebrow },
    { href: localePath(locale, 'faq'), label: site.nav.faq },
    ...(FLAGS.showDohaPage ? [{ href: localePath(locale, 'doha'), label: site.nav.doha }] : []),
    { href: localePath(locale, 'contact'), label: site.nav.contact },
  ];

  return (
    <footer className="relative mt-24 bg-primary-gradient text-white/75">
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr] lg:gap-8">
        <div>
          <Link href={localePath(locale)} aria-label={site.nav.home} className="inline-block">
            <Image src="/logo/ammon-qatar-plate.png" alt="" width={320} height={320} sizes="64px" className="size-16 rounded-2xl" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{f.positioning}</p>
          <p className="mt-4 text-xs text-white/50">{isArabic ? COMPANY.legalNameAr : COMPANY.legalNameEn}</p>
          {COMPANY.crNumber && (
            <p className="mt-1 text-xs text-white/50">
              {f.cr} <span dir="ltr">{COMPANY.crNumber}</span>
            </p>
          )}
          <div className="mt-5">
            <LanguageSwitcher locale={locale} label={site.nav.switchLocale} ariaLabel={site.nav.switchLocaleLabel} tone="light" />
          </div>
        </div>

        <nav aria-label={f.services}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">{f.services}</h2>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={localePath(locale, `services/${s.slug}`)} className="transition-colors hover:text-gold-300">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.company}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">{f.company}</h2>
          <ul className="space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.insights}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">{f.insights}</h2>
          <ul className="space-y-2.5 text-sm">
            {insights.slice(0, 4).map((a) => (
              <li key={a.slug}>
                <Link href={localePath(locale, `insights/${a.slug}`)} className="transition-colors hover:text-gold-300">
                  {a.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localePath(locale, 'insights')} className="font-semibold text-gold-300 hover:text-gold-200">
                {site.common.readMore} →
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">{f.contact}</h2>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
              <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                {formatAddress(locale).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-gold-400" aria-hidden />
              <a href={`tel:${COMPANY.phoneE164}`} dir="ltr" className="hover:text-gold-300">
                {formatPhoneDisplay()}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-gold-400" aria-hidden />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-300">
                {COMPANY.email}
              </a>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
              <span>
                {site.location.hoursValue} · <span dir="ltr">{COMPANY.hours.opens}–{COMPANY.hours.closes}</span>
              </span>
            </p>
          </address>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-4 text-xs font-semibold uppercase tracking-wider">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                    {SOCIAL_LABELS[name] ?? name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {isArabic ? COMPANY.legalNameAr : COMPANY.legalNameEn}. {f.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href={localePath(locale, 'privacy')} className="hover:text-white">
                {f.privacy}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, 'terms')} className="hover:text-white">
                {f.terms}
              </Link>
            </li>
          </ul>
        </div>
        {FLAGS.showLegalDisclaimer && (
          <div className="container-x pb-6">
            <p className="text-xs text-white/45">{f.disclaimer}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
