/**
 * Central company configuration (NAP + legal identity).
 *
 * Every value marked TODO is a placeholder that must be confirmed by the
 * business owner before launch. Values are read from environment variables so
 * they can be set in Amplify Hosting without a code change. Nothing here is a
 * secret — all values are public-facing contact details.
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : fallback;
};

export const SITE_URL = env('NEXT_PUBLIC_SITE_URL', 'https://ammonqatar.com').replace(/\/$/, '');

export const COMPANY = {
  brand: 'Ammon Qatar',
  brandArabic: 'عمون قطر',
  /** TODO(owner): confirm the exact registered legal name in English and Arabic. */
  legalNameEn: env('NEXT_PUBLIC_LEGAL_NAME_EN', 'AMMON QATAR FOR COLLECTION SERVICES W.L.L.'),
  legalNameAr: env('NEXT_PUBLIC_LEGAL_NAME_AR', 'عمون قطر لخدمات التحصيل ذ.م.م.'),
  /** TODO(owner): Commercial Registration number — rendered only when set. */
  crNumber: env('NEXT_PUBLIC_CR_NUMBER', ''),
  /** TODO(owner): verified +974 landline/mobile in E.164, e.g. +97444001234 */
  phoneE164: env('NEXT_PUBLIC_PHONE_E164', '+97400000000'),
  /** TODO(owner): WhatsApp Business number, digits only, e.g. 97455001234 */
  whatsappNumber: env('NEXT_PUBLIC_WHATSAPP_NUMBER', '97400000000').replace(/\D/g, ''),
  /** TODO(owner): verified business email. */
  email: env('NEXT_PUBLIC_EMAIL', 'info@ammonqatar.com'),
  address: {
    /** TODO(owner): street / building / zone as registered. */
    streetAddress: env('NEXT_PUBLIC_ADDRESS_STREET', 'Doha, Qatar'),
    addressLocality: 'Doha',
    addressRegion: 'Ad Dawhah',
    addressCountry: 'QA',
    postOfficeBoxNumber: env('NEXT_PUBLIC_PO_BOX', ''),
  },
  /** TODO(owner): exact office coordinates (used for map link + LocalBusiness geo). */
  geo: {
    latitude: Number(env('NEXT_PUBLIC_GEO_LAT', '25.2854')),
    longitude: Number(env('NEXT_PUBLIC_GEO_LNG', '51.5310')),
  },
  /** TODO(owner): confirm working days/hours. */
  hours: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: env('NEXT_PUBLIC_HOURS_OPEN', '08:00'),
    closes: env('NEXT_PUBLIC_HOURS_CLOSE', '17:00'),
  },
  /** Social profiles render only when a URL is provided. TODO(owner). */
  social: {
    linkedin: env('NEXT_PUBLIC_SOCIAL_LINKEDIN', ''),
    instagram: env('NEXT_PUBLIC_SOCIAL_INSTAGRAM', ''),
    x: env('NEXT_PUBLIC_SOCIAL_X', ''),
  },
  foundingYear: env('NEXT_PUBLIC_FOUNDING_YEAR', ''),
} as const;

/**
 * Trust badges are only rendered when their credential has been verified by
 * the owner (set NEXT_PUBLIC_VERIFIED_CREDENTIALS="cr,moci" for example).
 * Keys map to entries in content/{locale}/site.ts → trust.credentials.
 */
export const VERIFIED_CREDENTIALS: readonly string[] = env('NEXT_PUBLIC_VERIFIED_CREDENTIALS', '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/** Feature flags that depend on owner confirmation. */
export const FLAGS = {
  /** TODO(legal): keep or replace the general-information disclaimer in the footer. */
  showLegalDisclaimer: env('NEXT_PUBLIC_SHOW_LEGAL_DISCLAIMER', 'true') !== 'false',
  /** Renders the "Doha" local page link in navigation/footer. */
  showDohaPage: true,
} as const;

export const GTM_ID = env('NEXT_PUBLIC_GTM_ID', '');

/** Human-readable phone for display; falls back to E.164 spacing. */
export function formatPhoneDisplay(e164: string = COMPANY.phoneE164) {
  const digits = e164.replace(/\D/g, '');
  if (digits.startsWith('974') && digits.length === 11) {
    return `+974 ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return e164;
}

export const isPhoneConfigured = COMPANY.phoneE164 !== '+97400000000';
export const isWhatsAppConfigured = COMPANY.whatsappNumber !== '97400000000';

export function whatsappLink(message: string) {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${COMPANY.geo.latitude},${COMPANY.geo.longitude}`;
}
