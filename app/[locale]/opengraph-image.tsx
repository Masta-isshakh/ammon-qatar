import { ImageResponse } from 'next/og';
import { getContent } from '@/content';
import { COMPANY } from '@/lib/constants/company';
import { isLocale, type Locale } from '@/lib/i18n/config';

export const alt = 'Ammon Qatar — Debt Collection & Recovery Support in Qatar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Per-locale Open Graph card. Satori ships no Arabic glyphs, so a
 * text-subsetted TTF is fetched from Google Fonts for exactly the characters
 * on the card and cached in module scope. Satori has no bidi algorithm, so
 * Arabic word order is reversed manually and text runs are kept LTR.
 */
const fontCache = new Map<string, Promise<ArrayBuffer>>();

async function loadGoogleFont(family: string, weight: number, text: string) {
  const key = `${family}-${weight}-${text}`;
  if (!fontCache.has(key)) {
    fontCache.set(
      key,
      (async () => {
        // No User-Agent on purpose: Google then serves a TTF, which Satori can parse.
        const css = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`).then((r) => r.text());
        const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
        if (!match) throw new Error(`No TTF source for ${family}`);
        const res = await fetch(match[1]);
        if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`);
        return res.arrayBuffer();
      })(),
    );
  }
  return fontCache.get(key)!;
}

function visualOrder(text: string, locale: Locale) {
  if (locale !== 'ar') return text;
  return text.trim().replace(/[.،!؟]+$/, '').split(/\s+/).reverse().join(' ');
}

function Card({ locale, heading, positioning, fontFamily }: { locale: Locale; heading: string; positioning: string; fontFamily: string }) {
  const ar = locale === 'ar';
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: ar ? 'flex-end' : 'flex-start',
        padding: 72,
        background: 'linear-gradient(135deg, #2b0d15 0%, #4a1622 60%, #62202e 100%)',
        color: '#ffffff',
        fontFamily,
      }}
    >
      <div style={{ display: 'flex', flexDirection: ar ? 'row-reverse' : 'row', alignItems: 'center', gap: 18 }}>
        <svg viewBox="0 0 64 64" width="64" height="64">
          <path d="M32 8 L52 17 V36 C52 47 43 55 32 59 C21 55 12 47 12 36 V17 Z" fill="none" stroke="#c9a227" strokeWidth="2" />
          <path d="M32 20 L41 42 H36.5 L32 30.5 L27.5 42 H23 Z" fill="#d9b85a" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: ar ? 'flex-end' : 'flex-start' }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 5 }}>AMMON</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 8, color: '#d9b85a' }}>QATAR</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: ar ? 'flex-end' : 'flex-start', gap: 22, maxWidth: 1000 }}>
        <div style={{ display: 'flex', width: 96, height: 4, background: '#c9a227', borderRadius: 4 }} />
        <div style={{ display: 'flex', direction: 'ltr', fontSize: 52, fontWeight: 700, lineHeight: 1.15, textAlign: ar ? 'right' : 'left' }}>{visualOrder(heading, locale)}</div>
        <div style={{ display: 'flex', direction: 'ltr', fontSize: 26, color: '#d9b85a', lineHeight: 1.4 }}>{visualOrder(positioning, locale)}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 20, color: 'rgba(255,255,255,0.6)' }}>{COMPANY.legalNameEn} · Doha, Qatar</div>
    </div>
  );
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  const heading = site.hero.heading;
  const positioning = site.hero.positioning;
  const text = `AMMONQATAR ${heading}${positioning}${COMPANY.legalNameEn} · Doha, Qatar`;

  try {
    const family = locale === 'ar' ? 'IBM Plex Sans Arabic' : 'Manrope';
    const fontData = await loadGoogleFont(family, 700, text);
    return new ImageResponse(<Card locale={locale} heading={heading} positioning={positioning} fontFamily={family} />, {
      ...size,
      fonts: [{ name: family, data: fontData, weight: 700, style: 'normal' }],
    });
  } catch (err) {
    console.warn('[og] font load failed, rendering English fallback', err);
    const en = locale === 'en' ? site : (await getContent('en')).site;
    return new ImageResponse(<Card locale="en" heading={en.hero.heading} positioning={en.hero.positioning} fontFamily="sans-serif" />, { ...size });
  }
}
