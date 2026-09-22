'use client';

import { useCallback, useEffect, useId, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle } from 'lucide-react';
import { submitLead, type SubmitLeadResult } from '@/app/actions/submit-lead';
import { Button } from '@/components/ui/Button';
import type { FormContent } from '@/content/en/form';
import { track } from '@/lib/analytics/events';
import { localePath, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';
import {
  AMOUNT_RANGES,
  CONTACT_METHODS,
  DEBT_AGES,
  DEBT_CATEGORIES,
  LIMITS,
  STEP_FIELDS,
  validateFields,
  type LeadErrors,
  type LeadField,
  type LeadInput,
} from '@/lib/validation/lead';

interface LeadFormProps {
  locale: Locale;
  copy: FormContent;
  whatsappHref: string;
}

const FORM_ID = 'case_assessment';

const initial = (locale: Locale, sourcePage: string): LeadInput => ({
  locale,
  name: '',
  companyType: '',
  companyName: '',
  phone: '',
  email: '',
  debtCategory: '',
  amountRange: '',
  debtAge: '',
  preferredContact: '',
  message: '',
  consent: false,
  website: '',
  sourcePage,
});

const fieldClass =
  'block w-full min-h-12 rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-slate-muted/70 focus:border-primary-900 focus:outline-none focus:ring-4 focus:ring-gold-400/30 aria-[invalid=true]:border-red-600';

/** Defined at module level so React does not remount inputs (and drop focus) on every keystroke. */
function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary-900">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ locale, copy, whatsappHref }: LeadFormProps) {
  const pathname = usePathname();
  const search = useSearchParams();
  const uid = useId();
  const [data, setData] = useState<LeadInput>(() => initial(locale, pathname));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [serverError, setServerError] = useState<'rateLimited' | 'server' | null>(null);
  const [result, setResult] = useState<SubmitLeadResult | null>(null);
  const [pending, startTransition] = useTransition();
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Capture UTM attribution once (categorical marketing data only).
  useEffect(() => {
    setData((d) => ({
      ...d,
      utmSource: search.get('utm_source')?.slice(0, LIMITS.utm) || undefined,
      utmMedium: search.get('utm_medium')?.slice(0, LIMITS.utm) || undefined,
      utmCampaign: search.get('utm_campaign')?.slice(0, LIMITS.utm) || undefined,
    }));
  }, [search]);

  const update = useCallback(<K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    if (!started.current) {
      started.current = true;
      track({ event: 'form_start', form_id: FORM_ID });
    }
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!(key in e)) return e;
      const next = { ...e };
      delete next[key as LeadField];
      return next;
    });
  }, []);

  const errorText = (key: LeadField) => {
    const k = errors[key];
    return k ? copy.errors[k] : undefined;
  };

  const focusFirstError = (errs: LeadErrors) => {
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => {
      summaryRef.current?.focus();
      const el = document.getElementById(`${uid}-${first}`);
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  };

  const goNext = () => {
    const errs = validateFields(data, STEP_FIELDS[step]);
    if (Object.keys(errs).length) {
      setErrors(errs);
      track({ event: 'form_error', form_id: FORM_ID, step: step + 1, field_count: Object.keys(errs).length });
      focusFirstError(errs);
      return;
    }
    setStep((s) => s + 1);
    track({ event: 'form_step', form_id: FORM_ID, step: step + 2 });
    requestAnimationFrame(() => stepHeadingRef.current?.focus());
  };

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1));
    requestAnimationFrame(() => stepHeadingRef.current?.focus());
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFields(data, STEP_FIELDS[step]);
    if (Object.keys(errs).length) {
      setErrors(errs);
      track({ event: 'form_error', form_id: FORM_ID, step: step + 1, field_count: Object.keys(errs).length });
      focusFirstError(errs);
      return;
    }
    setServerError(null);
    track({ event: 'form_submit', form_id: FORM_ID });
    startTransition(async () => {
      const res = await submitLead(data);
      if (res.ok) {
        setResult(res);
        track({ event: 'form_success', form_id: FORM_ID });
        return;
      }
      if (res.code === 'validation') {
        setErrors(res.errors);
        const firstField = Object.keys(res.errors)[0] as LeadField | undefined;
        const stepIndex = STEP_FIELDS.findIndex((fields) => firstField && fields.includes(firstField));
        if (stepIndex >= 0) setStep(stepIndex);
        focusFirstError(res.errors);
        return;
      }
      setServerError(res.code === 'rate_limited' ? 'rateLimited' : 'server');
      requestAnimationFrame(() => summaryRef.current?.focus());
    });
  };

  if (result?.ok) {
    return (
      <div className="card p-8 sm:p-10" role="status" aria-live="polite">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-500/40">
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="mt-5 text-h2 font-bold text-primary-900">{copy.success.heading}</h3>
        <p className="mt-3 text-ink">{copy.success.body}</p>
        <p className="mt-5 rounded-xl bg-ivory p-4 text-sm">
          <span className="text-slate-muted">{copy.success.reference}: </span>
          <span className="font-mono text-base font-bold text-primary-900" dir="ltr">
            {result.reference}
          </span>
        </p>
        <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-muted">{copy.success.next}</h4>
        <ol className="mt-2 list-decimal space-y-1.5 ps-5 text-sm text-ink">
          {copy.success.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" size="lg">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => track({ event: 'whatsapp_click', location: 'form_success' })}>
              <MessageCircle /> {copy.success.whatsapp}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale)}>{copy.success.home}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([k]) => STEP_FIELDS[step].includes(k as LeadField));
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const ArrowBack = locale === 'ar' ? ArrowRight : ArrowLeft;

  const selectProps = (key: LeadField, id: string) => ({
    id,
    name: key,
    value: data[key] as string,
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${id}-error` : undefined,
    className: cn(fieldClass, 'appearance-none pe-10 bg-no-repeat bg-[length:1rem] bg-[position:right_1rem_center] rtl:bg-[position:left_1rem_center]'),
    style: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23c9a227' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
    },
  });

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" aria-labelledby={`${uid}-step-heading`}>
      {/* Progress */}
      <ol className="mb-6 grid grid-cols-3 gap-2" aria-label={copy.stepLabel}>
        {copy.steps.map((label, i) => (
          <li key={label} className="text-xs font-semibold">
            <span className={cn('block h-1.5 rounded-full transition-colors', i <= step ? 'bg-gold-500' : 'bg-line')} aria-hidden />
            <span className={cn('mt-2 block', i === step ? 'text-primary-900' : 'text-slate-muted')} aria-current={i === step ? 'step' : undefined}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <h3 id={`${uid}-step-heading`} ref={stepHeadingRef} tabIndex={-1} className="text-h3 font-bold text-primary-900 focus:outline-none">
        {copy.stepLabel} {step + 1}: {copy.steps[step]}
      </h3>

      {/* Error summary */}
      <div ref={summaryRef} tabIndex={-1} className="focus:outline-none" aria-live="assertive">
        {errorEntries.length > 0 && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">{copy.errors.summary}</p>
            <ul className="mt-1.5 list-disc ps-5">
              {errorEntries.map(([k, v]) => (
                <li key={k}>
                  <a href={`#${uid}-${k}`} className="underline">
                    {(k === 'consent' ? copy.fields.consentLabel : copy.fields[k as keyof typeof copy.fields]) as string}: {copy.errors[v as keyof typeof copy.errors]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {serverError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{copy.errors[serverError]}</div>
        )}
      </div>

      {/* Honeypot (visually hidden, not in tab order) */}
      <div className="absolute -start-[9999px] size-px overflow-hidden" aria-hidden>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update('website', e.target.value)} />
      </div>

      <div className="mt-6 space-y-5">
        {step === 0 && (
          <>
            <Field id={`${uid}-name`} label={copy.fields.name} error={errorText('name')}>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="name"
                maxLength={LIMITS.name}
                value={data.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                className={fieldClass}
              />
            </Field>
            <fieldset>
              <legend className="mb-1.5 text-sm font-semibold text-primary-900">{copy.fields.companyType}</legend>
              <div id={`${uid}-companyType`} className="grid grid-cols-2 gap-2" role="radiogroup" aria-invalid={Boolean(errors.companyType)}>
                {(['company', 'individual'] as const).map((opt) => (
                  <label
                    key={opt}
                    className={cn(
                      'flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors',
                      data.companyType === opt ? 'border-primary-900 bg-primary-900 text-white' : 'border-line bg-white text-primary-900 hover:border-primary-900/40',
                    )}
                  >
                    <input type="radio" name="companyType" value={opt} checked={data.companyType === opt} onChange={() => update('companyType', opt)} className="sr-only" />
                    {copy.fields.companyTypeOptions[opt]}
                  </label>
                ))}
              </div>
              {errorText('companyType') && <p className="mt-1.5 text-sm text-red-700">{errorText('companyType')}</p>}
            </fieldset>
            {data.companyType === 'company' && (
              <Field id={`${uid}-companyName`} label={copy.fields.companyName} error={errorText('companyName')}>
                <input
                  id={`${uid}-companyName`}
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  maxLength={LIMITS.companyName}
                  value={data.companyName}
                  onChange={(e) => update('companyName', e.target.value)}
                  aria-invalid={Boolean(errors.companyName)}
                  aria-describedby={errors.companyName ? `${uid}-companyName-error` : undefined}
                  className={fieldClass}
                />
              </Field>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-phone`} label={copy.fields.phone} error={errorText('phone')}>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  placeholder={copy.fields.phonePlaceholder}
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                  className={cn(fieldClass, 'text-start')}
                />
              </Field>
              <Field id={`${uid}-email`} label={copy.fields.email} error={errorText('email')}>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  dir="ltr"
                  maxLength={LIMITS.email}
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                  className={cn(fieldClass, 'text-start')}
                />
              </Field>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <Field id={`${uid}-debtCategory`} label={copy.fields.debtCategory} error={errorText('debtCategory')}>
              <select {...selectProps('debtCategory', `${uid}-debtCategory`)} onChange={(e) => update('debtCategory', e.target.value as LeadInput['debtCategory'])}>
                <option value="">—</option>
                {DEBT_CATEGORIES.map((v) => (
                  <option key={v} value={v}>
                    {copy.fields.debtCategoryOptions[v]}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={`${uid}-amountRange`} label={copy.fields.amountRange} error={errorText('amountRange')}>
              <select {...selectProps('amountRange', `${uid}-amountRange`)} onChange={(e) => update('amountRange', e.target.value as LeadInput['amountRange'])}>
                <option value="">—</option>
                {AMOUNT_RANGES.map((v) => (
                  <option key={v} value={v}>
                    {copy.fields.amountRangeOptions[v]}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset>
              <legend className="mb-1.5 text-sm font-semibold text-primary-900">{copy.fields.debtAge}</legend>
              <div id={`${uid}-debtAge`} className="grid grid-cols-2 gap-2 sm:grid-cols-5" role="radiogroup">
                {DEBT_AGES.map((v) => (
                  <label
                    key={v}
                    className={cn(
                      'flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-sm font-semibold transition-colors',
                      data.debtAge === v ? 'border-primary-900 bg-primary-900 text-white' : 'border-line bg-white text-primary-900 hover:border-primary-900/40',
                    )}
                  >
                    <input type="radio" name="debtAge" value={v} checked={data.debtAge === v} onChange={() => update('debtAge', v)} className="sr-only" />
                    {copy.fields.debtAgeOptions[v]}
                  </label>
                ))}
              </div>
              {errorText('debtAge') && <p className="mt-1.5 text-sm text-red-700">{errorText('debtAge')}</p>}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset>
              <legend className="mb-1.5 text-sm font-semibold text-primary-900">{copy.fields.preferredContact}</legend>
              <div id={`${uid}-preferredContact`} className="grid grid-cols-3 gap-2" role="radiogroup">
                {CONTACT_METHODS.map((v) => (
                  <label
                    key={v}
                    className={cn(
                      'flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-sm font-semibold transition-colors',
                      data.preferredContact === v ? 'border-primary-900 bg-primary-900 text-white' : 'border-line bg-white text-primary-900 hover:border-primary-900/40',
                    )}
                  >
                    <input type="radio" name="preferredContact" value={v} checked={data.preferredContact === v} onChange={() => update('preferredContact', v)} className="sr-only" />
                    {copy.fields.preferredContactOptions[v]}
                  </label>
                ))}
              </div>
              {errorText('preferredContact') && <p className="mt-1.5 text-sm text-red-700">{errorText('preferredContact')}</p>}
            </fieldset>
            <Field id={`${uid}-message`} label={copy.fields.message} error={errorText('message')} hint={copy.privacyNote}>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={4}
                maxLength={LIMITS.message}
                placeholder={copy.fields.messagePlaceholder}
                value={data.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                className={cn(fieldClass, 'min-h-28 resize-y')}
              />
            </Field>
            <div>
              <label htmlFor={`${uid}-consent`} className="flex cursor-pointer items-start gap-3 text-sm text-ink">
                <input
                  id={`${uid}-consent`}
                  name="consent"
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
                  className="mt-1 size-5 shrink-0 accent-primary-900"
                />
                <span>
                  {copy.fields.consent}{' '}
                  <Link href={localePath(locale, 'privacy')} className="font-semibold text-primary-900 underline underline-offset-2" target="_blank">
                    {copy.fields.consentLink}
                  </Link>
                </span>
              </label>
              {errorText('consent') && (
                <p id={`${uid}-consent-error`} className="mt-1.5 text-sm text-red-700">
                  {errorText('consent')}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" size="lg" onClick={goBack}>
            <ArrowBack /> {copy.back}
          </Button>
        ) : (
          <span />
        )}
        {step < STEP_FIELDS.length - 1 ? (
          <Button type="button" variant="primary" size="lg" onClick={goNext}>
            {copy.next} <Arrow />
          </Button>
        ) : (
          <Button type="submit" variant="gold" size="lg" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" aria-hidden /> : <Check aria-hidden />}
            {pending ? copy.submitting : copy.submit}
          </Button>
        )}
      </div>
    </form>
  );
}
