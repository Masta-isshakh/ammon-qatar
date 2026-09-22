import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { GoldLine } from '@/components/ui/BrandMotif';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import { whatsappLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

interface CTABandProps {
  locale: Locale;
  heading: string;
  body: string;
  primary: string;
  secondary: string;
  location: string;
}

export function CTABand({ locale, heading, body, primary, secondary, location }: CTABandProps) {
  const wa = whatsappLink(
    locale === 'ar' ? 'مرحباً عمون قطر، أود مناقشة مستحق متأخر.' : 'Hello Ammon Qatar, I would like to discuss an overdue account.',
  );
  return (
    <section className="container-x py-8 sm:py-12">
      <Reveal className="relative overflow-hidden rounded-3xl bg-primary-gradient px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
        <div aria-hidden className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <GoldLine className="mb-6" />
            <h2 className="text-balance text-h2 font-bold">{heading}</h2>
            <p className="mt-4 max-w-xl text-pretty text-white/75">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild variant="gold" size="lg">
              <TrackedLink href={localePath(locale, 'contact')} event={{ event: 'cta_click', cta_id: 'cta_band_assessment', location }}>
                {primary}
              </TrackedLink>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <TrackedLink href={wa} external event={{ event: 'whatsapp_click', location }}>
                <MessageCircle /> {secondary}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
