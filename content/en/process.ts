import type { FaqItem, ProcessStep } from '../types';

export const process: ProcessStep[] = [
  {
    number: 1,
    title: 'Case Assessment',
    body: 'We review the debt, the documents and the debtor’s position, and tell you candidly whether recovery is practical and how we would approach it.',
    outcomes: ['Written assessment of the file', 'Identification of disputes or gaps', 'Recommended approach and fee proposal'],
  },
  {
    number: 2,
    title: 'Recovery Strategy',
    body: 'A documented plan sets out the contact sequence, negotiation limits, timelines and the decision points where you choose how to proceed.',
    outcomes: ['Agreed recovery plan', 'Your negotiation mandate', 'Named file handler'],
  },
  {
    number: 3,
    title: 'Professional Contact',
    body: 'Structured, courteous communication with the debtor in Arabic or English — a clear statement of account, the basis of the debt and the options available.',
    outcomes: ['Statement of account and demand', 'Record of every contact', 'Early resolution where possible'],
  },
  {
    number: 4,
    title: 'Negotiation & Settlement',
    body: 'Where full immediate payment is not possible, we negotiate within your mandate and document the agreement in writing.',
    outcomes: ['Settlement or payment plan in writing', 'Clear default terms', 'Your approval before signature'],
  },
  {
    number: 5,
    title: 'Payment Monitoring / Appropriate Escalation',
    body: 'Agreed payments are monitored to completion. If the debtor fails to engage, we prepare the file and coordinate the appropriate next step with licensed professionals.',
    outcomes: ['Payment tracking and confirmation', 'Immediate action on missed payments', 'Organised file for escalation if required'],
  },
];

export const faqs: FaqItem[] = [
  {
    q: 'What types of debts does Ammon Qatar handle?',
    a: 'Overdue commercial invoices and contractual receivables, supplier and customer balances, rent and service-fee arrears, instalment balances and amounts owed by individuals under written agreements. We assess each file before confirming we can assist.',
    service: 'corporate-debt-collection',
  },
  {
    q: 'When should I refer an overdue account for collection?',
    a: 'Generally once your own reminders have not produced a payment date — often around 60 to 90 days past due. Earlier referral tends to make recovery more practical, and our early-stage service can start well before that point.',
    service: 'early-stage-debt-collection',
  },
  {
    q: 'What documents should I prepare?',
    a: 'The contract or purchase order, invoices, a statement of account, proof of delivery or acceptance, and any correspondence about the balance. Do not send identity documents or bank details in the initial enquiry.',
    service: 'unpaid-invoice-recovery',
  },
  {
    q: 'Can you contact debtors on our behalf?',
    a: 'Yes. With your written authorisation we communicate with the debtor professionally by phone, email, WhatsApp or letter, and keep a record of every contact.',
    service: 'corporate-debt-collection',
  },
  {
    q: 'Do you handle individual and corporate debts?',
    a: 'Both. Corporate receivables and individual debts follow different approaches, and each has a dedicated service.',
    service: 'individual-debt-collection',
  },
  {
    q: 'Can an amicable settlement be attempted first?',
    a: 'Amicable resolution is always our first step. Escalation is a decision we take together only when it is proportionate and the debtor is not engaging in good faith.',
    service: 'negotiation-settlement',
  },
  {
    q: 'How are payment plans followed up?',
    a: 'Every plan becomes a dated schedule. We remind the debtor before each due date, confirm receipt with you and act immediately on any missed instalment.',
    service: 'payment-monitoring',
  },
  {
    q: 'What happens if amicable collection is unsuccessful?',
    a: 'We give you a candid assessment. If escalation is appropriate, we organise the file and coordinate the next step with licensed legal professionals, remaining your point of contact throughout.',
    service: 'legal-follow-up',
  },
  {
    q: 'Is my information confidential?',
    a: 'Yes. Files are handled on a need-to-know basis, stored in access-controlled systems and shared only with those working on your file or, with your agreement, professionals engaged on your behalf.',
  },
  {
    q: 'How do I request an assessment?',
    a: 'Complete the short case assessment form, or contact us by phone, WhatsApp or email. We will review the summary and reply with a recommended approach.',
  },
];
