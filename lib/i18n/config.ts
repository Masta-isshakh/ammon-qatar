export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<
  Locale,
  { dir: 'ltr' | 'rtl'; hreflang: string; ogLocale: string; label: string; nativeLabel: string }
> = {
  en: { dir: 'ltr', hreflang: 'en-QA', ogLocale: 'en_QA', label: 'English', nativeLabel: 'English' },
  ar: { dir: 'rtl', hreflang: 'ar-QA', ogLocale: 'ar_QA', label: 'Arabic', nativeLabel: 'العربية' },
};

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}

/** Build a locale-prefixed path. `path` may be '' / '/' / '#quote' / '/services/x'. */
export function localePath(locale: Locale, path = '') {
  if (path.startsWith('#')) return `/${locale}${path}`;
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
