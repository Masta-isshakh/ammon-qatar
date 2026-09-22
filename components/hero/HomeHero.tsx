import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroCarousel } from '@/components/hero/HeroCarousel';
import { GoldLine, ShieldMotif } from '@/components/ui/BrandMotif';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import type { LocaleContent } from '@/content';
import { whatsappLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

interface HomeHeroProps {
  locale: Locale;
  hero: LocaleContent['site']['hero'];
}

/**
 * Two-column editorial hero. Server component; entrance uses CSS keyframes
 * (no JS) and is disabled under prefers-reduced-motion by globals.css.
 */
export function HomeHero({ locale, hero }: HomeHeroProps) {
  const wa = whatsappLink(
    locale === 'ar' ? 'مرحباً عمون قطر، أود التحدث مع فريقكم بشأن مستحق متأخر.' : 'Hello Ammon Qatar, I would like to talk to your team about an overdue receivable.',
  );

  return (
    <section className="relative overflow-hidden bg-primary-gradient text-white">
      <ShieldMotif className="pointer-events-none absolute -start-16 top-8 hidden h-[120%] opacity-40 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -end-40 top-1/3 size-[36rem] rounded-full bg-gold-500/15 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -start-32 bottom-0 size-[28rem] rounded-full bg-primary-500/25 blur-[120px]" />

      <div className="container-x relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28 2xl:py-36">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-light motion-safe:animate-fade-up">{hero.eyebrow}</p>
          <h1 className="mt-5 text-balance text-display font-bold text-white motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
            {hero.heading}
          </h1>
          <GoldLine className="is-in mt-7 w-28 motion-safe:[animation-delay:300ms]" />
          <p className="mt-7 max-w-xl text-pretty text-lead text-white/78 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            {hero.subcopy}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <Button asChild variant="gold" size="lg">
              <TrackedLink href={localePath(locale, 'contact')} event={{ event: 'cta_click', cta_id: 'hero_assessment', location: 'hero' }}>
                {hero.primaryCta}
              </TrackedLink>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <TrackedLink href={wa} external event={{ event: 'whatsapp_click', location: 'hero' }}>
                <MessageCircle /> {hero.secondaryCta}
              </TrackedLink>
            </Button>
          </div>
          <p className="mt-8 text-sm font-medium text-gold-300/90 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">{hero.positioning}</p>
        </div>

        <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
          {/* First slide is the LCP image; the rest cross-fade behind it. */}
          <HeroCarousel
            locale={locale}
            slides={['dohaSkyline', 'heroMeeting', 'team']}
            caption={hero.imageCaption}
            labels={hero.carousel}
          />
        </div>
      </div>
    </section>
  );
}
