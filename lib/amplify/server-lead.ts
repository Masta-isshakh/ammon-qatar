import 'server-only';
import outputs from '@/amplify_outputs.json';
import type { LeadInput } from '@/lib/validation/lead';

/*
 * Server-side write to the Amplify Data (AppSync) API using the public API
 * key, which is scoped in amplify/data/resource.ts to `create` on Lead only.
 * No secrets are involved and nothing is exposed to the browser: the
 * mutation runs inside the server action.
 */
interface DataOutputs {
  data?: { url?: string; api_key?: string; default_authorization_type?: string };
}

const cfg = (outputs as unknown as DataOutputs).data;

export const isLeadBackendConfigured = Boolean(cfg?.url && cfg?.api_key);

export interface LeadRecord {
  reference: string;
  locale: string;
  name: string;
  companyType: string;
  companyName?: string;
  phone: string;
  email: string;
  service: string;
  debtCategory?: string;
  amountRange?: string;
  debtAge?: string;
  businessActivity?: string;
  governmentTransactionType?: string;
  timeline?: string;
  preferredContact: string;
  message?: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: 'NEW';
  consentTimestamp: string;
  submittedAt: string;
}

const MUTATION = /* GraphQL */ `
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(input: $input) {
      id
      reference
    }
  }
`;

export function toLeadRecord(input: LeadInput, reference: string): LeadRecord {
  const now = new Date().toISOString();
  return {
    reference,
    locale: input.locale,
    name: input.name.trim(),
    companyType: input.companyType,
    companyName: input.companyType === 'company' ? input.companyName.trim() : undefined,
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase(),
    service: input.service,
    debtCategory: input.debtCategory || undefined,
    amountRange: input.amountRange || undefined,
    debtAge: input.debtAge || undefined,
    businessActivity: input.businessActivity.trim() || undefined,
    governmentTransactionType: input.governmentTransactionType || undefined,
    timeline: input.timeline || undefined,
    preferredContact: input.preferredContact,
    message: input.message.trim() || undefined,
    sourcePage: input.sourcePage || undefined,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    status: 'NEW',
    consentTimestamp: now,
    submittedAt: now,
  };
}

export async function persistLead(record: LeadRecord): Promise<{ id: string }> {
  if (!cfg?.url || !cfg.api_key) throw new Error('Lead backend not configured');
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': cfg.api_key },
    body: JSON.stringify({ query: MUTATION, variables: { input: record } }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`AppSync HTTP ${res.status}`);
  const json = (await res.json()) as { data?: { createLead?: { id: string } }; errors?: { message: string }[] };
  if (json.errors?.length || !json.data?.createLead) {
    throw new Error(json.errors?.map((e) => e.message).join('; ') || 'createLead returned no data');
  }
  return { id: json.data.createLead.id };
}
