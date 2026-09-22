/**
 * Lead validation shared by the client form and the server action.
 * Returns error KEYS (not messages) so each side can localise them.
 */

export const COMPANY_TYPES = ['company', 'individual'] as const;
export const DEBT_CATEGORIES = ['commercial_invoices', 'contract_balance', 'rent_service_fees', 'personal_loan', 'instalments', 'other'] as const;
export const AMOUNT_RANGES = ['under_50k', '50k_250k', '250k_1m', 'over_1m', 'undisclosed'] as const;
export const DEBT_AGES = ['under_30', '30_60', '60_90', '90_180', 'over_180'] as const;
export const CONTACT_METHODS = ['phone', 'whatsapp', 'email'] as const;

export type CompanyType = (typeof COMPANY_TYPES)[number];
export type DebtCategory = (typeof DEBT_CATEGORIES)[number];
export type AmountRange = (typeof AMOUNT_RANGES)[number];
export type DebtAge = (typeof DEBT_AGES)[number];
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export interface LeadInput {
  locale: 'en' | 'ar';
  name: string;
  companyType: CompanyType | '';
  companyName: string;
  phone: string;
  email: string;
  debtCategory: DebtCategory | '';
  amountRange: AmountRange | '';
  debtAge: DebtAge | '';
  preferredContact: ContactMethod | '';
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export type LeadField = keyof Omit<LeadInput, 'locale' | 'website' | 'sourcePage' | 'utmSource' | 'utmMedium' | 'utmCampaign'>;
export type ErrorKey = 'required' | 'name' | 'companyName' | 'phone' | 'email' | 'select' | 'message' | 'consent';
export type LeadErrors = Partial<Record<LeadField, ErrorKey>>;

export const STEP_FIELDS: LeadField[][] = [
  ['name', 'companyType', 'companyName', 'phone', 'email'],
  ['debtCategory', 'amountRange', 'debtAge'],
  ['preferredContact', 'message', 'consent'],
];

export const LIMITS = { name: 80, companyName: 120, email: 160, message: 1000, utm: 100 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalisePhone(raw: string) {
  const cleaned = raw.replace(/[\s\-().]/g, '').replace(/^00/, '+');
  return cleaned;
}

export function isValidPhone(raw: string) {
  const p = normalisePhone(raw);
  return /^\+?[0-9]{8,15}$/.test(p);
}

function oneOf<T extends readonly string[]>(list: T, v: string): v is T[number] {
  return (list as readonly string[]).includes(v);
}

export function validateFields(input: LeadInput, fields: LeadField[]): LeadErrors {
  const errors: LeadErrors = {};
  for (const f of fields) {
    switch (f) {
      case 'name': {
        const v = input.name.trim();
        if (!v) errors.name = 'required';
        else if (v.length < 2 || v.length > LIMITS.name) errors.name = 'name';
        break;
      }
      case 'companyType':
        if (!oneOf(COMPANY_TYPES, input.companyType)) errors.companyType = 'select';
        break;
      case 'companyName': {
        if (input.companyType === 'company') {
          const v = input.companyName.trim();
          if (!v) errors.companyName = 'required';
          else if (v.length > LIMITS.companyName) errors.companyName = 'companyName';
        }
        break;
      }
      case 'phone':
        if (!input.phone.trim()) errors.phone = 'required';
        else if (!isValidPhone(input.phone)) errors.phone = 'phone';
        break;
      case 'email': {
        const v = input.email.trim();
        if (!v) errors.email = 'required';
        else if (!EMAIL_RE.test(v) || v.length > LIMITS.email) errors.email = 'email';
        break;
      }
      case 'debtCategory':
        if (!oneOf(DEBT_CATEGORIES, input.debtCategory)) errors.debtCategory = 'select';
        break;
      case 'amountRange':
        if (!oneOf(AMOUNT_RANGES, input.amountRange)) errors.amountRange = 'select';
        break;
      case 'debtAge':
        if (!oneOf(DEBT_AGES, input.debtAge)) errors.debtAge = 'select';
        break;
      case 'preferredContact':
        if (!oneOf(CONTACT_METHODS, input.preferredContact)) errors.preferredContact = 'select';
        break;
      case 'message':
        if (input.message.length > LIMITS.message) errors.message = 'message';
        break;
      case 'consent':
        if (!input.consent) errors.consent = 'consent';
        break;
    }
  }
  return errors;
}

export function validateLead(input: LeadInput): LeadErrors {
  return validateFields(input, STEP_FIELDS.flat());
}

/** Strict server-side coercion of an untrusted payload into LeadInput. */
export function coerceLeadInput(raw: unknown): LeadInput | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const str = (k: string, max = 500) => (typeof r[k] === 'string' ? (r[k] as string).slice(0, max) : '');
  const locale = r.locale === 'ar' ? 'ar' : 'en';
  return {
    locale,
    name: str('name', LIMITS.name + 20),
    companyType: str('companyType', 20) as LeadInput['companyType'],
    companyName: str('companyName', LIMITS.companyName + 20),
    phone: str('phone', 40),
    email: str('email', LIMITS.email + 20),
    debtCategory: str('debtCategory', 40) as LeadInput['debtCategory'],
    amountRange: str('amountRange', 40) as LeadInput['amountRange'],
    debtAge: str('debtAge', 40) as LeadInput['debtAge'],
    preferredContact: str('preferredContact', 20) as LeadInput['preferredContact'],
    message: str('message', LIMITS.message + 50),
    consent: r.consent === true,
    website: str('website', 200),
    sourcePage: str('sourcePage', 300),
    utmSource: str('utmSource', LIMITS.utm) || undefined,
    utmMedium: str('utmMedium', LIMITS.utm) || undefined,
    utmCampaign: str('utmCampaign', LIMITS.utm) || undefined,
  };
}
