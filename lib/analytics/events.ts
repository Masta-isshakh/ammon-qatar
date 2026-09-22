/**
 * Privacy-safe analytics. Events are pushed to window.dataLayer (GTM).
 * NEVER pass names, phone numbers, emails, exact amounts, debtor identities,
 * message text or documents — only categorical values listed here.
 */
export type AnalyticsEvent =
  | { event: 'cta_click'; cta_id: string; location: string }
  | { event: 'call_click'; location: string }
  | { event: 'whatsapp_click'; location: string }
  | { event: 'language_switch'; from_locale: string; to_locale: string }
  | { event: 'service_view'; service_slug: string }
  | { event: 'form_start'; form_id: string }
  | { event: 'form_step'; form_id: string; step: number }
  | { event: 'form_error'; form_id: string; step: number; field_count: number }
  | { event: 'form_submit'; form_id: string }
  | { event: 'form_success'; form_id: string }
  | { event: 'article_cta_click'; article_slug: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(payload: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ ...payload, locale: document.documentElement.lang });
}
