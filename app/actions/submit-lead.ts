'use server';

import { randomBytes } from 'node:crypto';
import { headers } from 'next/headers';
import { isLeadBackendConfigured, persistLead, toLeadRecord } from '@/lib/amplify/server-lead';
import { isRateLimited } from '@/lib/rate-limit';
import { coerceLeadInput, validateLead, type LeadErrors } from '@/lib/validation/lead';

export type SubmitLeadResult =
  | { ok: true; reference: string }
  | { ok: false; code: 'validation'; errors: LeadErrors }
  | { ok: false; code: 'rate_limited' }
  | { ok: false; code: 'server' };

/** Human-friendly, non-sequential reference, e.g. AQ-7K3M9P. */
function makeReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(6);
  let out = '';
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `AQ-${out}`;
}

async function clientKey() {
  const h = await headers();
  const fwd = h.get('x-forwarded-for');
  const ip = (fwd ? fwd.split(',')[0] : h.get('x-real-ip')) ?? 'unknown';
  return ip.trim();
}

export async function submitLead(raw: unknown): Promise<SubmitLeadResult> {
  const input = coerceLeadInput(raw);
  if (!input) return { ok: false, code: 'validation', errors: { name: 'required' } };

  // Honeypot: bots fill hidden fields. Pretend success so they stop retrying.
  if (input.website) return { ok: true, reference: makeReference() };

  if (isRateLimited(await clientKey())) return { ok: false, code: 'rate_limited' };

  // Server-side validation is authoritative regardless of client checks.
  const errors = validateLead(input);
  if (Object.keys(errors).length) return { ok: false, code: 'validation', errors };

  const reference = makeReference();
  const record = toLeadRecord(input, reference);

  if (!isLeadBackendConfigured) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[lead] backend not configured in production — lead not stored');
      return { ok: false, code: 'server' };
    }
    console.warn('[lead] Amplify backend not configured — lead accepted but not stored (dev only)', { reference });
    return { ok: true, reference };
  }

  try {
    await persistLead(record);
    return { ok: true, reference };
  } catch (err) {
    console.error('[lead] persist failed', err instanceof Error ? err.message : err);
    return { ok: false, code: 'server' };
  }
}
