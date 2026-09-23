/**
 * Lead validation shared by the client form and the server action.
 * Returns error KEYS (not messages) so each side can localise them.
 */

export const SERVICE_LINES = ['debt', 'formation', 'government'] as const;
export const COMPANY_TYPES = ['company', 'individual'] as const;
export const DEBT_CATEGORIES = ['commercial_invoices', 'contract_balance', 'rent_service_fees', 'personal_loan', 'instalments', 'other'] as const;
export const AMOUNT_RANGES = ['under_50k', '50k_250k', '250k_1m', 'over_1m', 'undisclosed'] as const;
export const DEBT_AGES = ['under_30', '30_60', '60_90', '90_180', 'over_180'] as const;
export const GOVERNMENT_TRANSACTIONS = ['registration_licence', 'renewal_amendment', 'labour_recruitment', 'visa_residence', 'attestation', 'other'] as const;
export const TIMELINES = ['urgent', 'within_month', 'within_quarter', 'exploring'] as const;
export const CONTACT_METHODS = ['phone', 'whatsapp', 'email'] as const;

export type ServiceLine = (typeof SERVICE_LINES)[number];
export type CompanyType = (typeof COMPANY_TYPES)[number];
export type DebtCategory = (typeof DEBT_CATEGORIES)[number];
export type AmountRange = (typeof AMOUNT_RANGES)[number];
export type DebtAge = (typeof DEBT_AGES)[number];
export type GovernmentTransaction = (typeof GOVERNMENT_TRANSACTIONS)[number];
export type Timeline = (typeof TIMELINES)[number];
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export interface LeadInput {
  locale: 'en' | 'ar';
  /** Which line of work the enquiry is about; drives the conditional step. */
  service: ServiceLine | '';
  name: string;
  companyType: CompanyType | '';
  companyName: string;
  phone: string;
  email: string;
  // --- debt collection ---
  debtCategory: DebtCategory | '';
  amountRange: AmountRange | '';
  debtAge: DebtAge | '';
  // --- company formation ---
  businessActivity: string;
  // --- government transactions ---
  governmentTransactionType: GovernmentTransaction | '';
  /** Target start date (formation) or deadline (government transactions). */
  timeline: Timeline | '';
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
export type ErrorKey = 'required' | 'name' | 'companyName' | 'phone' | 'email' | 'select' | 'message' | 'activity' | 'consent';
export type LeadErrors = Partial<Record<LeadField, ErrorKey>>;

export const STEP_FIELDS: LeadField[][] = [
  ['service'],
  ['companyType', 'debtCategory', 'amountRange', 'debtAge', 'businessActivity', 'governmentTransactionType', 'timeline'],
  ['name', 'companyName', 'phone', 'email', 'preferredContact', 'message', 'consent'],
];

export const LIMITS = { name: 80, companyName: 120, email: 160, message: 1000, activity: 160, utm: 100 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalisePhone(raw: string) {
  return raw.replace(/[\s\-().]/g, '').replace(/^00/, '+');
}

export function isValidPhone(raw: string) {
  return /^\+?[0-9]{8,15}$/.test(normalisePhone(raw));
}

function oneOf<T extends readonly string[]>(list: T, v: string): v is T[number] {
  return (list as readonly string[]).includes(v);
}

/**
 * Fields on step 2 depend on the service chosen on step 1, so a debt enquiry is
 * never asked for a business activity and vice versa.
 */
export function isFieldActive(field: LeadField, input: LeadInput): boolean {
  switch (field) {
    case 'debtCategory':
    case 'amountRange':
    case 'debtAge':
      return input.service === 'debt';
    case 'businessActivity':
      return input.service === 'formation';
    case 'governmentTransactionType':
      return input.service === 'government';
    case 'timeline':
      return input.service === 'formation' || input.service === 'government';
    case 'companyName':
      return input.companyType === 'company';
    default:
      return true;
  }
}

export function validateFields(input: LeadInput, fields: LeadField[]): LeadErrors {
  const errors: LeadErrors = {};
  for (const f of fields) {
    if (!isFieldActive(f, input)) continue;
    switch (f) {
      case 'service':
        if (!oneOf(SERVICE_LINES, input.service)) errors.service = 'select';
        break;
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
        const v = input.companyName.trim();
        if (!v) errors.companyName = 'required';
        else if (v.length > LIMITS.companyName) errors.companyName = 'companyName';
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
      case 'businessActivity': {
        const v = input.businessActivity.trim();
        if (!v) errors.businessActivity = 'required';
        else if (v.length < 2 || v.length > LIMITS.activity) errors.businessActivity = 'activity';
        break;
      }
      case 'governmentTransactionType':
        if (!oneOf(GOVERNMENT_TRANSACTIONS, input.governmentTransactionType)) errors.governmentTransactionType = 'select';
        break;
      case 'timeline':
        if (!oneOf(TIMELINES, input.timeline)) errors.timeline = 'select';
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
    service: str('service', 20) as LeadInput['service'],
    name: str('name', LIMITS.name + 20),
    companyType: str('companyType', 20) as LeadInput['companyType'],
    companyName: str('companyName', LIMITS.companyName + 20),
    phone: str('phone', 40),
    email: str('email', LIMITS.email + 20),
    debtCategory: str('debtCategory', 40) as LeadInput['debtCategory'],
    amountRange: str('amountRange', 40) as LeadInput['amountRange'],
    debtAge: str('debtAge', 40) as LeadInput['debtAge'],
    businessActivity: str('businessActivity', LIMITS.activity + 20),
    governmentTransactionType: str('governmentTransactionType', 40) as LeadInput['governmentTransactionType'],
    timeline: str('timeline', 40) as LeadInput['timeline'],
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
