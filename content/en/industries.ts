import type { Industry } from '../types';

/**
 * Sector list. Copy describes general receivables characteristics of each
 * sector — it does not claim past engagements or experience figures.
 * TODO(owner): remove any sector Ammon Qatar does not wish to serve.
 */
export const industries: Industry[] = [
  {
    slug: 'construction-contracting',
    name: 'Construction & Contracting',
    summary: 'Certified work, retentions and variations create receivables that are large, documented and slow.',
    challenges: [
      'Interim payment certificates paid late or short',
      'Retention balances outstanding after completion',
      'Disputed variations delaying the whole account',
      'Long chains from main contractor to subcontractor to supplier',
    ],
    relevantServices: ['corporate-debt-collection', 'negotiation-settlement', 'legal-follow-up'],
  },
  {
    slug: 'trading-distribution',
    name: 'Trading & Distribution',
    summary: 'High invoice volumes and credit terms make consistent follow-up the difference between cash and bad debt.',
    challenges: [
      'Many open invoices per customer with partial payments',
      'Credit limits exceeded without formal approval',
      'Returns and credit notes complicating the statement',
      'Customers spread across Qatar with varying payment discipline',
    ],
    relevantServices: ['early-stage-debt-collection', 'unpaid-invoice-recovery', 'payment-monitoring'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    summary: 'Rent arrears, service charges and post-handover balances require firm but relationship-aware handling.',
    challenges: [
      'Residential and commercial rent arrears',
      'Service and maintenance charges outstanding',
      'Cheque-related arrears and re-scheduling requests',
      'Tenant relocation without settlement',
    ],
    relevantServices: ['individual-debt-collection', 'corporate-debt-collection', 'payment-monitoring'],
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    summary: 'Regulated lenders and finance companies need consistent, compliant follow-up on delinquent accounts.',
    challenges: [
      'Overdue instalments on personal and business finance',
      'Restructuring requests that need documentation',
      'Communication with guarantors',
      'Consistent, professional contact standards',
    ],
    relevantServices: ['individual-debt-collection', 'bank-finance-settlements', 'payment-monitoring'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary: 'Patient balances and insurer receivables need sensitive handling and accurate documentation.',
    challenges: [
      'Self-pay balances after treatment',
      'Rejected or delayed insurance claims',
      'Corporate client accounts for staff medical services',
      'Sensitivity around patient communication',
    ],
    relevantServices: ['individual-debt-collection', 'corporate-debt-collection', 'early-stage-debt-collection'],
  },
  {
    slug: 'logistics-transportation',
    name: 'Logistics & Transportation',
    summary: 'Freight, customs and storage charges accumulate quickly when customers delay payment.',
    challenges: [
      'Freight and clearance invoices disputed on charges',
      'Storage and demurrage balances growing daily',
      'Customers with cross-border operations',
      'Proof-of-delivery documentation gaps',
    ],
    relevantServices: ['unpaid-invoice-recovery', 'corporate-debt-collection', 'negotiation-settlement'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    summary: 'Consultancies, agencies and firms often under-collect because chasing fees feels awkward.',
    challenges: [
      'Milestone fees unpaid after deliverables accepted',
      'Scope disputes used to delay payment',
      'Retainers lapsing with balances outstanding',
      'Reluctance to escalate with valued clients',
    ],
    relevantServices: ['unpaid-invoice-recovery', 'negotiation-settlement', 'early-stage-debt-collection'],
  },
  {
    slug: 'smes',
    name: 'SMEs',
    summary: 'Smaller businesses feel every late payment. A structured process protects cash flow without a full credit team.',
    challenges: [
      'A few large customers paying late',
      'No dedicated credit control staff',
      'Owner time consumed by chasing payments',
      'Uncertainty about when and how to escalate',
    ],
    relevantServices: ['early-stage-debt-collection', 'unpaid-invoice-recovery', 'payment-monitoring'],
  },
];
