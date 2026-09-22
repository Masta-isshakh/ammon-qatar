/**
 * Content contracts shared by content/en and content/ar.
 * Keep copy in the locale files; keep shapes here so translators can work in
 * one file per locale without touching components.
 */

export type ServiceSlug =
  | 'corporate-debt-collection'
  | 'individual-debt-collection'
  | 'early-stage-debt-collection'
  | 'unpaid-invoice-recovery'
  | 'bank-finance-settlements'
  | 'negotiation-settlement'
  | 'payment-monitoring'
  | 'legal-follow-up';

export type ServiceIcon =
  | 'building'
  | 'user'
  | 'clock'
  | 'file-text'
  | 'landmark'
  | 'handshake'
  | 'chart'
  | 'scale';

export interface SeoFields {
  title: string;
  description: string;
}

export interface Service {
  slug: ServiceSlug;
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

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  /** Verified by the company with written consent. */
  verified: boolean;
}
