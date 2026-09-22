import { MainNav } from '@/components/navigation/MainNav';
import { UtilityBar } from '@/components/layout/UtilityBar';
import type { LocaleContent } from '@/content';
import { COMPANY, whatsappLink } from '@/lib/constants/company';
import { localePath, type Locale } from '@/lib/i18n/config';

interface SiteHeaderProps {
  locale: Locale;
  content: LocaleContent;
}

/** Server wrapper: resolves links/labels once and passes plain props to the client nav. */
export function SiteHeader({ locale, content }: SiteHeaderProps) {
  const { nav, utility } = content.site;
  const links = [
    { href: localePath(locale, 'services'), label: nav.services },
    { href: localePath(locale, 'industries'), label: nav.industries },
    { href: localePath(locale, 'process'), label: nav.howItWorks },
    { href: localePath(locale, 'insights'), label: nav.insights },
    { href: localePath(locale, 'about'), label: nav.about },
    { href: localePath(locale, 'contact'), label: nav.contact },
  ];
  const waMessage =
    locale === 'ar'
      ? 'مرحباً عمون قطر، أود الاستفسار عن خدمات تحصيل المستحقات.'
      : 'Hello Ammon Qatar, I would like to enquire about debt collection support.';

  return (
    <>
      <UtilityBar tagline={utility.tagline} hoursLabel={utility.hours} />
      <MainNav
        locale={locale}
        links={links}
        labels={{
          cta: nav.cta,
          whatsapp: nav.whatsapp,
          whatsappLabel: nav.whatsappLabel,
          call: nav.call,
          menu: nav.menu,
          close: nav.close,
          home: nav.home,
          switchLocale: nav.switchLocale,
          switchLocaleLabel: nav.switchLocaleLabel,
        }}
        whatsappHref={whatsappLink(waMessage)}
        phoneHref={`tel:${COMPANY.phoneE164}`}
      />
    </>
  );
}
