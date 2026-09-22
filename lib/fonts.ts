import { IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';

// Variable font, latin only → one small file. Self-hosted by next/font (no layout shift, no third-party request).
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: 'variable',
});

// IBM Plex Sans Arabic is static-weight only; load only the three weights the design uses.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-plex-arabic',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const fontClassName = `${manrope.variable} ${plexArabic.variable}`;
