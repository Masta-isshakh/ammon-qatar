import 'server-only';
import type { Locale } from '@/lib/i18n/config';
import type { LocaleContent } from './en';

const loaders: Record<Locale, () => Promise<LocaleContent>> = {
  en: () => import('./en').then((m) => m.en),
  ar: () => import('./ar').then((m) => m.ar),
};

/** Server-only content loader — copy never ships to the client as JSON blobs. */
export async function getContent(locale: Locale): Promise<LocaleContent> {
  return loaders[locale]();
}

export type { LocaleContent };
