import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroCarousel, type HeroSlide } from '@/components/hero/HeroCarousel';
import { GoldLine } from '@/components/ui/BrandMotif';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import type { LocaleContent } from '@/content';
import { whatsappLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

interface HomeHeroProps {
  locale: Locale;
  hero: LocaleContent['site']['hero'];
}

/**
 * Full-bleed hero: the photography is the background carousel and the copy
 * sits on the scrim. Server component — only the carousel is a client leaf.
 */
export function HomeHero({ locale, hero }: HomeHeroProps) {
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
      <h1 className="mt-5 text-balance text-display font-bold text-white [text-shadow:0_2px_24px_rgb(0_17_47/0.55)] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
        {hero.heading}
      </h1>
      <GoldLine className="is-in mt-6 w-28 motion-safe:[animation-delay:300ms]" />
      <p className="mt-6 max-w-xl text-pretty text-lead text-white/85 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
        {hero.subcopy}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
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
      <p className="mt-7 text-sm font-medium text-gold-300 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
        {hero.positioning}
      </p>
    </HeroCarousel>
  );
}
