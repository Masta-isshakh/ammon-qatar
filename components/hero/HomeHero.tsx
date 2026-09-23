import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroCarousel, type HeroSlide } from '@/components/hero/HeroCarousel';
import { GoldLine } from '@/components/ui/BrandMotif';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import type { LocaleContent } from '@/content';
import { whatsappLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

export interface HeroServiceLink {
  label: string;
  href: string;
}

interface HomeHeroProps {
  locale: Locale;
  hero: LocaleContent['site']['hero'];
  /** The three pillars, surfaced above the fold so every service is one click away. */
  serviceLinks: HeroServiceLink[];
}

/**
 * Full-bleed hero: the photography is the background carousel and the copy
 * sits on the scrim. Server component — only the carousel is a client leaf.
 */
export function HomeHero({ locale, hero, serviceLinks }: HomeHeroProps) {
  const wa = whatsappLink(
    locale === 'ar'
      ? 'مرحباً عمون قطر، أود التحدث مع فريقكم بشأن مستحق متأخر.'
      : 'Hello Ammon Qatar, I would like to talk to your team about an overdue receivable.',
  );

  // The first slide is the default and the LCP image.
  const slides: HeroSlide[] = [
    // Mirrored in LTR so the skyline lands in the clear right half of the frame.
    { image: 'dohaSkyline', caption: hero.slides.doha, mirrorInLtr: true, focusOnMobile: 'start' },
    { image: 'heroMeeting', caption: hero.slides.meeting },
    { image: 'team', caption: hero.slides.team },
  ];

  return (
    <HeroCarousel locale={locale} slides={slides} labels={hero.carousel}>
      <p className="eyebrow eyebrow-light motion-safe:animate-fade-up">{hero.eyebrow}</p>
      <h1 className="mt-4 text-balance text-display font-bold text-white [text-shadow:0_2px_24px_rgb(0_17_47/0.55)] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
        {hero.heading}
      </h1>
      <GoldLine className="is-in mt-5 w-28 motion-safe:[animation-delay:300ms]" />
      <p className="mt-5 max-w-2xl text-pretty text-lead text-white/85 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
        {hero.subcopy}
      </p>
      <nav
        aria-label={hero.servicesLabel}
        className="mt-6 flex flex-wrap items-center gap-2 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]"
      >
        <span className="text-sm text-white/60">{hero.servicesLabel}</span>
        {serviceLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-400 hover:bg-white/15 hover:text-gold-300"
          >
            {link.label}
            <ArrowRight
              className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              aria-hidden
            />
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row motion-safe:animate-fade-up motion-safe:[animation-delay:260ms]">
        <Button asChild variant="gold" size="lg">
          <TrackedLink
            href={localePath(locale, 'contact')}
            event={{ event: 'cta_click', cta_id: 'hero_assessment', location: 'hero' }}
          >
            {hero.primaryCta}
          </TrackedLink>
        </Button>
        <Button asChild variant="outlineLight" size="lg" className="backdrop-blur-sm">
          <TrackedLink href={wa} external event={{ event: 'whatsapp_click', location: 'hero' }}>
            <MessageCircle /> {hero.secondaryCta}
          </TrackedLink>
        </Button>
      </div>
      <p className="mt-4 text-sm font-medium text-gold-300 motion-safe:animate-fade-up motion-safe:[animation-delay:340ms]">
        {hero.positioning}
      </p>
    </HeroCarousel>
  );
}
