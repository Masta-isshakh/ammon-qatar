import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { GoogleTagManager } from '@next/third-parties/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MobileStickyBar } from '@/components/navigation/MobileStickyBar';
import { getContent } from '@/content';
import { COMPANY, GTM_ID, whatsappLink } from '@/lib/constants/company';
import { LOCALES, LOCALE_META, isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { fontClassName } from '@/lib/fonts';
import '@/app/globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#4a1622',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Zoom is intentionally NOT disabled (accessibility).
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  const base = buildMetadata({ locale, path: '', title: site.meta.home.title, description: site.meta.home.description, absoluteTitle: true });
  return {
    ...base,
    title: { default: site.meta.home.title, template: site.meta.titleTemplate },
    applicationName: COMPANY.brand,
    creator: COMPANY.brand,
    publisher: COMPANY.brand,
    category: 'finance',
    formatDetection: { telephone: true, email: true, address: true },
    other: { 'geo.region': 'QA-DA', 'geo.placename': 'Doha' },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const content = await getContent(locale);
  const meta = LOCALE_META[locale];
  const waHref = whatsappLink(
    locale === 'ar' ? 'مرحباً عمون قطر، أود الاستفسار عن خدمات تحصيل المستحقات.' : 'Hello Ammon Qatar, I would like to enquire about debt collection support.',
  );

  return (
    <html lang={meta.hreflang} dir={meta.dir} className={`js ${fontClassName}`}>
      <head>
        {/* Without JS the noscript rules override the pre-reveal states, so content is never hidden. */}
        <noscript>
          <style>{`.reveal,.reveal-child,.gold-line,.process-track{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body className={`min-h-screen bg-ivory text-ink ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-primary-950"
        >
          {content.site.nav.skip}
        </a>
        <SiteHeader locale={locale} content={content} />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} content={content} />
        <MobileStickyBar locale={locale} labels={content.site.mobileBar} phoneHref={`tel:${COMPANY.phoneE164}`} whatsappHref={waHref} />
      </body>
    </html>
  );
}
