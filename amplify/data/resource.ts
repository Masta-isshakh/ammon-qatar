import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Ammon Qatar lead capture.
 *
 * Access model (least privilege):
 * - Public API key: `create` on Lead only. It cannot list, read, update or
 *   delete leads, and the staff-only fields below reject public writes.
 * - Authenticated staff (Cognito user pool): full access for the ops CRM.
 *
 * The website writes leads from a Next.js server action (never from the
 * browser), after server-side validation, honeypot and rate limiting.
 */
const schema = a.schema({
  LeadStatus: a.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'ENGAGED', 'CLOSED', 'SPAM']),

  Lead: a
    .model({
      reference: a.string().required(),
      locale: a.string().required(),
      name: a.string().required(),
      companyType: a.string().required(),
      companyName: a.string(),
      phone: a.string().required(),
      email: a.string().required(),
      /** Which line of work the enquiry is about: debt | formation | government. */
      service: a.string().required(),
      // Debt-collection enquiries only, so these are optional at the model level
      // and enforced conditionally by lib/validation/lead.ts.
      debtCategory: a.string(),
      amountRange: a.string(),
      debtAge: a.string(),
      // Company formation
      businessActivity: a.string(),
      // Government transactions
      governmentTransactionType: a.string(),
      /** Target start date (formation) or deadline (government transactions). */
      timeline: a.string(),
      preferredContact: a.string().required(),
      message: a.string(),
      sourcePage: a.string(),
      utmSource: a.string(),
      utmMedium: a.string(),
      utmCampaign: a.string(),
      status: a.ref('LeadStatus'),
      consentTimestamp: a.datetime().required(),
      submittedAt: a.datetime().required(),
      // ---- Staff-only fields: not readable or writable with the public key ----
      assignedTo: a.string().authorization((allow) => [allow.authenticated()]),
      internalNotes: a.string().authorization((allow) => [allow.authenticated()]),
      contactedAt: a.datetime().authorization((allow) => [allow.authenticated()]),
    })
    .secondaryIndexes((index) => [
      index('status').sortKeys(['submittedAt']).queryField('leadsByStatus'),
      index('reference').queryField('leadByReference'),
    ])
    .authorization((allow) => [allow.publicApiKey().to(['create']), allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      // Rotated by redeploying; the key only permits creating leads.
      expiresInDays: 365,
    },
  },
});
