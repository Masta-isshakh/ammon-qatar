/**
 * Content contracts shared by content/en and content/ar.
 * Keep copy in the locale files; keep shapes here so translators can work in
 * one file per locale without touching components.
 */

/**
 * The three pillars Ammon Qatar operates. Services are grouped by these on the
 * homepage and the services index so the offering reads clearly.
 */
export type ServiceCategory = 'debt' | 'formation' | 'government';

export type ServiceSlug =
  | 'corporate-debt-collection'
  | 'individual-debt-collection'
  | 'early-stage-debt-collection'
  | 'unpaid-invoice-recovery'
  | 'bank-finance-settlements'
  | 'negotiation-settlement'
  | 'payment-monitoring'
  | 'legal-follow-up'
  | 'company-formation'
  | 'government-transactions';

export type ServiceIcon =
  | 'building'
  | 'user'
  | 'clock'
  | 'file-text'
  | 'landmark'
  | 'handshake'
  | 'chart'
  | 'scale'
  | 'briefcase'
  | 'stamp';

export interface SeoFields {
  title: string;
  description: string;
}

export interface Service {
  slug: ServiceSlug;
  category: ServiceCategory;
  icon: ServiceIcon;
  name: string;
  shortName: string;
  /** One-line summary used on cards. */
  summary: string;
  seo: SeoFields;
  hero: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  /** Who it is for. */
  audience: string[];
  /** What the engagement typically covers. */
  scope: string[];
  /** How the service is delivered, in order. */
  approach: { title: string; body: string }[];
  /** Documents / information that make the assessment faster. */
  preparation: string[];
  faqs: { q: string; a: string }[];
  relatedServices: ServiceSlug[];
  relatedInsights: string[];
  /** Compliance note rendered under the hero when set (e.g. legal authority wording). */
  note?: string;
}

export interface Industry {
  slug: string;
  name: string;
  summary: string;
  /** Typical receivables challenges — written as general sector knowledge, not experience claims. */
  challenges: string[];
  relevantServices: ServiceSlug[];
}

export interface ProcessStep {
  number: number;
  title: string;
  body: string;
  outcomes: string[];
}

export interface FaqItem {
  q: string;
  a: string;
  /** Optional related service for internal linking. */
  service?: ServiceSlug;
}

export type InsightCategory =
  | 'debt-collection'
  | 'receivables-management'
  | 'business-credit'
  | 'settlements'
  | 'legal-recovery-education'
  | 'qatar-business-guides';

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Original worked example, rendered as a highlighted aside. */
  example?: { title: string; body: string };
}

export interface Article {
  slug: string;
  category: InsightCategory;
  title: string;
  seo: SeoFields;
  excerpt: string;
  /** ISO dates. */
  publishedAt: string;
  updatedAt: string;
  /** TODO(owner): replace with the real author/reviewer name; rendered only when set. */
  author?: string;
  readingMinutes: number;
  quickAnswer: string;
  sections: ArticleSection[];
  checklist: { title: string; items: string[] };
  faqs?: { q: string; a: string }[];
  relatedService: ServiceSlug;
  relatedArticles: string[];
  /** Cited sources for any legal/regulatory statements. */
  sources?: { label: string; url: string }[];
}

export interface CaseStudy {
  id: string;
  industry: string;
  challenge: string;
  debtType: string;
  ageRange: string;
  approach: string;
  resolution: string;
  duration: string;
  testimonial?: string;
  /** Client has given written permission to publish. */
  permissionGranted: boolean;
  /** Identifying details removed. */
  anonymized: boolean;
}

/**
 * One section of a legal page (privacy, terms, data deletion).
 * Inline tokens in any string: `{email}` → mailto link to the company email,
 * `{company}` → registered legal name for the locale, `[label](/path)` →
 * locale-prefixed internal link, `[label](https://…)` → external link.
 */
export interface LegalSection {
  heading: string;
  /** Paragraphs rendered in order. */
  body: string[];
  /** Optional bulleted list rendered after `body`. */
  bullets?: string[];
  /** Optional numbered steps rendered after `bullets`. */
  steps?: string[];
  /** Optional paragraphs rendered after the lists. */
  after?: string[];
}

/** Prominent email-request card (used on the data deletion page). */
export interface LegalRequestCard {
  heading: string;
  body: string;
  button: string;
  /** Shown under the button for visitors without a mail client. */
  fallback: string;
  subject: string;
  /** Pre-filled email body; `\n` separates lines. */
  template: string;
}

export interface LegalPageContent {
  title: string;
  description: string;
  heading: string;
  updated: string;
  /** Lead paragraph rendered above the sections. */
  intro?: string;
  request?: LegalRequestCard;
  sections: LegalSection[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  /** Verified by the company with written consent. */
  verified: boolean;
}
