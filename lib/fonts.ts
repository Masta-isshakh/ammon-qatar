import { IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';

// Variable font, latin only → one small file. Self-hosted by next/font (no layout shift, no third-party request).
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: 'variable',
});

// IBM Plex Sans Arabic ships static weights only, so each one is a separate
// file. Two weights cover the design (body 400, headings/labels 700); CSS
// font matching resolves 500/600 to the nearest of these without synthesis.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-plex-arabic',
  display: 'swap',
  weight: ['400', '700'],
});

/**
 * Latin pages load only Manrope. Arabic pages additionally load IBM Plex Sans
 * Arabic — applying the variable class is what makes next/font preload the
 * file, so English visitors never download the Arabic webfont.
 */
export function fontClassName(locale: 'en' | 'ar') {
  return locale === 'ar' ? `${manrope.variable} ${plexArabic.variable}` : manrope.variable;
}
