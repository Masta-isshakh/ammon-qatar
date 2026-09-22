import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LocaleContent } from '@/content';
import { whatsappLink } from '@/lib/constants/company';
import type { Locale } from '@/lib/i18n/config';

// Split the form (client, ~form logic + server-action stub) into its own chunk.
const LeadForm = dynamic(() => import('@/components/forms/LeadForm').then((m) => m.LeadForm), {
  loading: () => <div className="card min-h-[32rem] animate-pulse bg-white" aria-hidden />,
});

interface LeadCaptureProps {
  locale: Locale;
  content: LocaleContent;
  /** Heading level context: homepage section (h2) or contact page (h2 under page h1). */
  id?: string;
  compactHeading?: boolean;
}

export function LeadCapture({ locale, content, id = 'assessment', compactHeading = false }: LeadCaptureProps) {
  const { lead } = content.site;
  const wa = whatsappLink(locale === 'ar' ? 'مرحباً عمون قطر، أرسلت طلب تقييم ملف عبر الموقع.' : 'Hello Ammon Qatar, I have submitted a case assessment request on your website.');

  return (
    <section id={id} className="scroll-mt-24 bg-section-soft py-16 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          {compactHeading ? (
            <h2 className="text-h2 font-bold text-primary-900">{lead.heading}</h2>
          ) : (
            <SectionHeading eyebrow={lead.eyebrow} heading={lead.heading} body={lead.body} />
          )}
          {compactHeading && <p className="mt-4 text-lead text-slate-muted">{lead.body}</p>}
          <ul className="mt-8 space-y-3">
            {lead.reassurance.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-ink">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-500/40">
                  <Check className="size-3" aria-hidden />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
        <div>
          <Suspense fallback={<div className="card min-h-[32rem] animate-pulse bg-white" aria-hidden />}>
            <LeadForm locale={locale} copy={content.form} whatsappHref={wa} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
