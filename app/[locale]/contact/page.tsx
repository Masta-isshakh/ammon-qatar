import type { Metadata } from 'next';
import { Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { LeadCapture } from '@/components/forms/LeadCapture';
import { LocationSection } from '@/components/sections/LocationSection';
import { TrackedLink } from '@/components/navigation/TrackedLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getContent } from '@/content';
import { COMPANY, formatPhoneDisplay, whatsappLink } from '@/lib/constants/company';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, organizationNode, webPageNode, websiteNode } from '@/lib/seo/schema';

export const revalidate = 3600;
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const { site } = await getContent(locale);
  return buildMetadata({ locale, path: 'contact', title: site.pages.contact.title, description: site.pages.contact.description });
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const content = await getContent(locale);
  const { site } = content;
  const page = site.pages.contact;
  const wa = whatsappLink(locale === 'ar' ? 'مرحباً عمون قطر، أود طلب تقييم لملف مستحق متأخر.' : 'Hello Ammon Qatar, I would like to request an assessment for an overdue receivable.');
  const schema = graph([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode(locale, 'contact', page.title, page.description, { '@type': ['WebPage', 'ContactPage'] }),
    breadcrumbNode([{ name: site.common.home, path: '' }, { name: site.nav.contact, path: 'contact' }], locale),
  ]);

  const direct = [
    { icon: Phone, label: site.location.phone, value: formatPhoneDisplay(), href: `tel:${COMPANY.phoneE164}`, event: { event: 'call_click' as const, location: 'contact_page' } },
    { icon: MessageCircle, label: site.nav.whatsapp, value: formatPhoneDisplay(`+${COMPANY.whatsappNumber}`), href: wa, external: true, event: { event: 'whatsapp_click' as const, location: 'contact_page' } },
    { icon: Mail, label: site.location.email, value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ];

  return (
    <>
      <JsonLd id="ld-contact" data={schema} />
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} crumbs={[{ href: `/${locale}`, label: site.common.home }, { label: site.nav.contact }]} crumbsLabel={site.common.breadcrumb} />

      <section className="container-x -mt-6 pb-2 pt-10 sm:pt-12" aria-labelledby="direct-heading">
        <h2 id="direct-heading" className="sr-only">{page.directHeading}</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {direct.map(({ icon: Icon, label, value, href, external, event }) => {
            const inner = (
              <>
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-900 text-gold-300">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-muted">{label}</span>
                  <span className="block font-semibold text-primary-900" dir="ltr">{value}</span>
                </span>
              </>
            );
            return (
              <li key={label} className="card card-hover">
                {event ? (
                  <TrackedLink href={href} external={external} event={event} className="flex min-h-11 items-center gap-4 p-5">
                    {inner}
                  </TrackedLink>
                ) : (
                  <a href={href} className="flex min-h-11 items-center gap-4 p-5">{inner}</a>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-muted">
          <Clock className="size-4 text-gold-600" aria-hidden />
          {site.location.hoursValue} · <span dir="ltr">{COMPANY.hours.opens}–{COMPANY.hours.closes}</span>
        </p>
      </section>

      <LeadCapture locale={locale} content={content} id="assessment" compactHeading />
      <LocationSection locale={locale} copy={site.location} />
    </>
  );
}
