import type { Article } from '../types';

/**
 * Original editorial content. Dates are review dates for the copy in this
 * file. TODO(owner): set `author` to the real reviewer once approved.
 */
export const insights: Article[] = [
  {
    slug: 'when-to-refer-an-overdue-account-for-collection',
    category: 'receivables-management',
    title: 'When Should You Refer an Overdue Account for Collection?',
    seo: {
      title: 'When to Refer an Overdue Account for Collection in Qatar',
      description:
        'A practical guide for Qatar businesses on the signals that an overdue invoice needs external collection — timing, warning signs and what to do before you refer.',
    },
    excerpt: 'The right moment to bring in external help is earlier than most businesses think — and it is defined by behaviour, not just days past due.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-22',
    readingMinutes: 6,
    quickAnswer:
      'Refer an account when your reminders have stopped producing a firm payment date, when the debtor is avoiding contact, or when the balance is approaching 90 days past due. Referring earlier, with a complete file, makes amicable recovery far more practical.',
    sections: [
      {
        id: 'why-timing-matters',
        heading: 'Why timing matters more than the amount',
        paragraphs: [
          'Most finance teams decide to escalate based on the size of the balance. In practice, the age of the debt and the debtor’s behaviour are better predictors of how much effort recovery will need.',
          'A receivable that is 45 days overdue with an engaged customer usually resolves with structured reminders. The same balance at 150 days, with unanswered emails and a changed contact person, needs a different approach entirely.',
        ],
      },
      {
        id: 'warning-signs',
        heading: 'Five warning signs an account needs external follow-up',
        paragraphs: ['Watch for these patterns regardless of how long the invoice has been outstanding:'],
        bullets: [
          'Promised payment dates pass without payment or explanation.',
          'Your contact stops responding, or you are redirected between departments.',
          'The debtor raises a new dispute each time payment is requested.',
          'Partial payments arrive without any agreed schedule.',
          'You learn the debtor is delaying other suppliers as well.',
        ],
      },
      {
        id: 'before-you-refer',
        heading: 'What to do before you refer',
        paragraphs: [
          'A clean file makes the first external contact effective. Reconcile the balance, gather delivery evidence and collect the correspondence so the debtor cannot restart the conversation from zero.',
          'Decide internally what outcome you would accept: full payment over a short plan, a discount for immediate settlement, or a firm position. The collection partner needs a mandate, not just a file.',
        ],
        example: {
          title: 'Example: a distributor with three overdue invoices',
          body: 'A Doha trading company had QAR-denominated invoices at 40, 75 and 110 days with the same customer. Instead of chasing each separately, the team consolidated them into one statement, confirmed all deliveries were signed for, and set a mandate of full payment over 60 days. One structured approach replaced three parallel email threads.',
        },
      },
      {
        id: 'earlier-is-better',
        heading: 'Why earlier referral works better',
        paragraphs: [
          'Debtors prioritise the creditors who follow up consistently. A professional, courteous third party signals that the balance is being managed, which usually moves your invoice up the payment queue without damaging the relationship.',
          'Early referral also preserves options. A customer at 60 days can still be offered a plan that keeps the relationship; at 180 days the practical choices narrow.',
        ],
      },
    ],
    checklist: {
      title: 'Referral readiness checklist',
      items: [
        'Balance reconciled and statement of account prepared',
        'Contract, purchase order or signed quotation located',
        'Proof of delivery or acceptance for each invoice',
        'Correspondence about the balance saved in one place',
        'Internal mandate agreed: acceptable settlement and timing',
        'Decision-maker named on your side for approvals',
      ],
    },
    faqs: [
      {
        q: 'Is 30 days overdue too early to refer?',
        a: 'For full collection, usually yes — but early-stage follow-up from 30 days is often the most cost-effective option and prevents the balance from ageing.',
      },
      {
        q: 'Will referral end the customer relationship?',
        a: 'Not when the approach is professional. Many customers continue trading after a structured resolution because the process was clear and respectful.',
      },
    ],
    relatedService: 'early-stage-debt-collection',
    relatedArticles: ['documents-to-prepare-for-debt-collection-in-qatar', 'credit-control-checklist-to-reduce-invoice-ageing'],
  },
  {
    slug: 'documents-to-prepare-for-debt-collection-in-qatar',
    category: 'debt-collection',
    title: 'Documents to Prepare Before Starting Debt Collection in Qatar',
    seo: {
      title: 'Documents Needed for Debt Collection in Qatar',
      description:
        'The documents that make debt collection in Qatar faster and more effective: contracts, invoices, delivery proof, statements and correspondence — and what not to send at the first stage.',
    },
    excerpt: 'A complete file is the single biggest factor in how quickly an overdue balance moves. Here is what to gather, and what to keep back until it is needed.',
    publishedAt: '2026-09-05',
    updatedAt: '2026-09-22',
    readingMinutes: 5,
    quickAnswer:
      'Prepare the agreement, all invoices, a statement of account, proof of delivery or acceptance, and the correspondence about the balance. Keep identity documents, bank details and internal financial data until they are specifically requested for a later stage.',
    sections: [
      {
        id: 'core-documents',
        heading: 'The core documents',
        paragraphs: ['Whether the debtor is a company or an individual, these five items establish the debt clearly:'],
        bullets: [
          'The agreement: contract, purchase order, signed quotation, lease or application form.',
          'Invoices: every open invoice with dates, amounts and references.',
          'Statement of account: one reconciled summary of charges, payments and the balance.',
          'Evidence of performance: delivery notes, completion certificates, acceptance emails or service reports.',
          'Correspondence: reminders sent, replies received and any promises to pay.',
        ],
      },
      {
        id: 'common-gaps',
        heading: 'Common gaps that slow recovery',
        paragraphs: [
          'Unsigned delivery notes, invoices addressed to the wrong legal entity and missing purchase orders are the gaps we see most often. None is fatal, but each gives the debtor a reason to delay.',
          'Check that the customer name on the invoice matches the registered entity that placed the order. Trade names and group companies are frequently confused.',
        ],
        example: {
          title: 'Example: invoice issued to a trade name',
          body: 'A services firm invoiced “Al Example Trading” for six months of work. The contracting entity was actually “Al Example Trading & Contracting W.L.L.” Re-issuing the invoices to the correct legal name removed the debtor’s main objection before any negotiation started.',
        },
      },
      {
        id: 'what-not-to-send',
        heading: 'What not to send at the first stage',
        paragraphs: [
          'A responsible collection partner will not ask for sensitive identity documents, bank credentials or unrelated internal financial records in the initial assessment. Provide a summary first; specific documents are requested only when a stage requires them.',
        ],
      },
      {
        id: 'organising-the-file',
        heading: 'Organising the file',
        paragraphs: [
          'Use one folder per debtor with sub-folders for agreement, invoices, evidence and correspondence. Name files by date and type. A chronology — a one-page list of what happened and when — is the most useful document you can add.',
        ],
      },
    ],
    checklist: {
      title: 'File preparation checklist',
      items: [
        'Agreement or purchase order located and legible',
        'All open invoices exported with numbers and dates',
        'Statement of account reconciled to the ledger',
        'Signed delivery notes or acceptance emails attached to each invoice',
        'Correspondence exported and ordered by date',
        'One-page chronology written',
        'Correct legal name of the debtor confirmed',
      ],
    },
    relatedService: 'unpaid-invoice-recovery',
    relatedArticles: ['when-to-refer-an-overdue-account-for-collection', 'amicable-settlement-versus-escalation-what-to-consider'],
  },
  {
    slug: 'amicable-settlement-versus-escalation-what-to-consider',
    category: 'settlements',
    title: 'Amicable Settlement or Escalation? What to Consider',
    seo: {
      title: 'Amicable Debt Settlement vs Escalation in Qatar: What to Consider',
      description:
        'How to decide between negotiating a settlement and escalating an unpaid debt in Qatar — cost, time, evidence, relationship value and the debtor’s behaviour.',
    },
    excerpt: 'Escalation is sometimes necessary, but it is rarely the first best option. A structured way to make the decision.',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-22',
    readingMinutes: 6,
    quickAnswer:
      'Attempt a documented amicable settlement first. Consider escalation only when the debt is well evidenced, the debtor is not engaging in good faith, and the amount justifies the time and cost. Take the decision with a complete file and a candid assessment.',
    sections: [
      {
        id: 'the-decision',
        heading: 'A decision, not a reflex',
        paragraphs: [
          'The instinct after months of unpaid invoices is to escalate. The better question is which route is most likely to produce actual payment, soonest, at acceptable cost.',
          'A settlement that is paid over four months often beats a formal process that takes longer and still ends in negotiation.',
        ],
      },
      {
        id: 'factors',
        heading: 'Five factors to weigh',
        paragraphs: [],
        bullets: [
          'Evidence: is the debt clearly documented, or is there a genuine dispute to resolve first?',
          'Behaviour: is the debtor engaging, even slowly, or avoiding contact entirely?',
          'Capacity: can the debtor realistically pay, and over what period?',
          'Relationship: is future business with this customer valuable?',
          'Proportionality: does the amount justify the cost and time of escalation?',
        ],
      },
      {
        id: 'structuring-a-settlement',
        heading: 'Structuring a settlement that gets paid',
        paragraphs: [
          'Good settlements are specific: amounts, dates, payment method and what happens on default. They are confirmed in writing before the first payment, and monitored after it.',
          'Set your mandate before negotiating. Decide the minimum acceptable total, the longest acceptable period and whether any discount is available for prompt payment.',
        ],
        example: {
          title: 'Example: a plan with default terms',
          body: 'A contractor owed a retention balance agreed to five monthly payments. The written plan stated that if any instalment was more than seven days late, the full remaining balance became immediately due. Two payments were late by a day, both were chased the same day, and the plan completed on time.',
        },
      },
      {
        id: 'when-escalation-is-right',
        heading: 'When escalation is the right step',
        paragraphs: [
          'Escalation is appropriate when the debtor refuses to engage, disputes without substance, or breaks a documented agreement. At that point the file should already be complete, so that licensed legal professionals can act on it efficiently.',
          'This article is general information. Legal proceedings in Qatar are conducted by licensed legal professionals, and specific advice on your case should come from them.',
        ],
      },
    ],
    checklist: {
      title: 'Before deciding to escalate',
      items: [
        'Amicable offer made in writing and documented',
        'Debtor’s response (or silence) recorded with dates',
        'Evidence bundle complete and organised',
        'Cost and time of escalation estimated and compared to the balance',
        'Relationship value assessed with the commercial team',
        'Candid assessment obtained from your collection partner',
      ],
    },
    faqs: [
      {
        q: 'Can we still settle after escalation starts?',
        a: 'Usually yes. Many debtors re-engage once a formal step is taken, and a documented settlement remains available if you choose to accept it.',
      },
    ],
    relatedService: 'negotiation-settlement',
    relatedArticles: ['when-to-refer-an-overdue-account-for-collection', 'documents-to-prepare-for-debt-collection-in-qatar'],
  },
  {
    slug: 'credit-control-checklist-to-reduce-invoice-ageing',
    category: 'business-credit',
    title: 'A Credit Control Checklist to Reduce Invoice Ageing',
    seo: {
      title: 'Credit Control Checklist for Qatar Businesses: Reduce Invoice Ageing',
      description:
        'A practical credit control checklist for Qatar businesses — onboarding, terms, invoicing, reminders and escalation — to reduce overdue invoices before they become bad debts.',
    },
    excerpt: 'Most bad debts start as small process gaps. A short, repeatable checklist closes them.',
    publishedAt: '2026-09-15',
    updatedAt: '2026-09-22',
    readingMinutes: 5,
    quickAnswer:
      'Reduce ageing by controlling credit at onboarding, invoicing accurately and promptly, sending reminders on a fixed schedule, reviewing the ageing report weekly and escalating on defined triggers rather than on frustration.',
    sections: [
      {
        id: 'onboarding',
        heading: '1. Onboarding and terms',
        paragraphs: ['Receivables problems are cheapest to prevent before the first invoice.'],
        bullets: [
          'Confirm the customer’s exact legal name and registration.',
          'Agree payment terms in writing, including late-payment consequences.',
          'Set a credit limit and a named approver for exceptions.',
          'Record the customer’s accounts payable contact, not just the buyer.',
        ],
      },
      {
        id: 'invoicing',
        heading: '2. Invoicing discipline',
        paragraphs: ['An invoice that is late, inaccurate or unsupported gives the customer a reason to delay.'],
        bullets: [
          'Invoice on delivery or milestone, not at month end.',
          'Attach the delivery note, timesheet or acceptance.',
          'State the due date, bank details and reference clearly.',
          'Confirm receipt of the invoice with accounts payable.',
        ],
      },
      {
        id: 'reminders',
        heading: '3. A fixed reminder schedule',
        paragraphs: [
          'Reminders work when they are predictable. A typical sequence: a courtesy note before the due date, a reminder at 7 days past due, a call at 21 days, and a formal statement at 45 days.',
        ],
        example: {
          title: 'Example: shifting from ad hoc to scheduled reminders',
          body: 'An SME services company sent reminders only when cash was tight. Moving to a fixed weekly reminder run, owned by one person, made customer responses more predictable and highlighted the two accounts that genuinely needed escalation.',
        },
      },
      {
        id: 'review-and-escalation',
        heading: '4. Weekly review and defined triggers',
        paragraphs: [
          'Review the ageing report every week and decide actions per account. Define triggers for escalation in advance — for example, 60 days past due with no payment date agreed — so that decisions are consistent and not personal.',
        ],
      },
    ],
    checklist: {
      title: 'Weekly credit control checklist',
      items: [
        'Ageing report reviewed and actions assigned',
        'All new invoices confirmed received by customers',
        'Scheduled reminders sent for every overdue invoice',
        'Promised payment dates logged and followed up',
        'Accounts past the escalation trigger referred or decided',
        'Disputes logged with an owner and a resolution date',
      ],
    },
    relatedService: 'early-stage-debt-collection',
    relatedArticles: ['when-to-refer-an-overdue-account-for-collection', 'documents-to-prepare-for-debt-collection-in-qatar'],
  },
];
