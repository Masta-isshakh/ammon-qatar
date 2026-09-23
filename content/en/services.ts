import type { Service } from '../types';

/**
 * TODO(owner): the wording of "Legal Follow-Up" must reflect Ammon Qatar's
 * actual operating model (in-house licensed capacity vs. referral to external
 * licensed lawyers). The current text describes coordination and file
 * preparation only and makes no claim of legal authority.
 */
export const services: Service[] = [
  {
    slug: 'corporate-debt-collection',
    category: 'debt',
    icon: 'building',
    name: 'Corporate Debt Collection',
    shortName: 'Corporate',
    summary:
      'Structured recovery support for overdue invoices, contractual receivables, supplier and customer balances, and business-to-business debts.',
    seo: {
      title: 'Corporate Debt Collection in Qatar',
      description:
        'Commercial debt collection and corporate debt recovery in Qatar. Ammon Qatar recovers overdue B2B invoices and contractual receivables through structured, professional follow-up in Doha.',
    },
    hero: {
      eyebrow: 'Commercial debt collection',
      heading: 'Corporate debt collection in Qatar',
      intro:
        'Recover overdue business receivables without damaging the customer relationships your company depends on. We manage contact, negotiation and settlement on your behalf, with a documented plan and regular reporting.',
    },
    audience: [
      'Companies with overdue trade receivables from customers or distributors',
      'Contractors and subcontractors with unpaid certified work',
      'Suppliers owed balances under supply or service agreements',
      'Finance teams that need an external, structured collection function',
    ],
    scope: [
      'Reconciliation of the balance and supporting documents',
      'Formal statement of account and written demand in Arabic or English',
      'Professional contact with the debtor’s finance and management',
      'Negotiation of payment plans, partial settlements or discounts you approve',
      'Monitoring of agreed payments until the balance is cleared',
      'Preparation of the file for escalation if amicable recovery fails',
    ],
    approach: [
      { title: 'Assess', body: 'We review the contract, invoices, delivery evidence and correspondence to confirm the balance and identify any disputes.' },
      { title: 'Plan', body: 'A written recovery strategy sets out the contact sequence, negotiation limits and decision points, agreed with you.' },
      { title: 'Engage', body: 'Structured, courteous contact with the debtor, escalating in tone only as necessary and always within your instructions.' },
      { title: 'Resolve', body: 'Settlement or payment plan documented in writing and monitored to completion; otherwise a clear recommendation on next steps.' },
    ],
    preparation: [
      'Contract, purchase order or signed quotation',
      'Invoices and statement of account',
      'Delivery notes, completion certificates or acceptance emails',
      'Correspondence about the overdue balance',
      'Any partial payments received',
    ],
    faqs: [
      {
        q: 'Will contacting our customer through a collection company damage the relationship?',
        a: 'Our first approach is professional and amicable, and the customer is given clear options. In practice a neutral third party often de-escalates a stalled conversation rather than inflaming it.',
      },
      {
        q: 'What if the customer disputes the invoice?',
        a: 'We identify disputes early during assessment and work with you to resolve them with documents before pressing for payment. Genuine disputes are handled as commercial negotiations, not demands.',
      },
      {
        q: 'Can you collect from a company that has closed or changed ownership?',
        a: 'It depends on the entity and the documents. We assess the file and tell you honestly whether recovery is practical before any engagement.',
      },
    ],
    relatedServices: ['unpaid-invoice-recovery', 'negotiation-settlement', 'legal-follow-up'],
    relatedInsights: ['when-to-refer-an-overdue-account-for-collection', 'documents-to-prepare-for-debt-collection-in-qatar'],
  },
  {
    slug: 'individual-debt-collection',
    category: 'debt',
    icon: 'user',
    name: 'Individual Debt Collection',
    shortName: 'Individual',
    summary:
      'Respectful, structured recovery of amounts owed by individuals — personal loans, rent, service fees, and instalment balances.',
    seo: {
      title: 'Individual Debt Collection in Qatar',
      description:
        'Professional, respectful debt collection from individuals in Qatar. Ammon Qatar recovers personal debts, rent arrears, unpaid fees and instalment balances through structured contact and settlement.',
    },
    hero: {
      eyebrow: 'Personal debt recovery',
      heading: 'Individual debt collection in Qatar',
      intro:
        'Amounts owed by individuals require a different approach from corporate receivables: clear communication, realistic payment plans and consistent follow-up, delivered with respect and discretion.',
    },
    audience: [
      'Landlords and property managers with rent arrears',
      'Clinics, schools and service providers with unpaid fees',
      'Businesses with individual customers on instalment plans',
      'Individuals owed money under a written agreement',
    ],
    scope: [
      'Verification of the debt and supporting documents',
      'Contact with the debtor in their preferred language and channel',
      'Structured payment plans with written confirmation',
      'Monitoring and reminders for each instalment',
      'Reporting to you at agreed intervals',
    ],
    approach: [
      { title: 'Verify', body: 'We confirm the amount, the basis and the debtor’s contact details before any communication.' },
      { title: 'Contact', body: 'Courteous, private contact that explains the balance and the options available.' },
      { title: 'Agree', body: 'Where the debtor cannot pay in full, we propose realistic plans within the limits you approve.' },
      { title: 'Monitor', body: 'Each payment is tracked; missed instalments are followed up immediately.' },
    ],
    preparation: [
      'Signed agreement, lease or invoice',
      'Statement showing amounts due and payments received',
      'Debtor’s contact details',
      'Previous reminders or correspondence',
    ],
    faqs: [
      {
        q: 'How do you contact the individual?',
        a: 'By phone, WhatsApp, email or letter, according to the details you provide and the debtor’s preference. Contact is professional and private — never through employers, family or social media.',
      },
      {
        q: 'Can you accept payments on our behalf?',
        a: 'Payments are made directly to you unless a different arrangement is agreed in writing. We monitor and confirm each payment.',
      },
    ],
    relatedServices: ['payment-monitoring', 'negotiation-settlement', 'early-stage-debt-collection'],
    relatedInsights: ['amicable-settlement-versus-escalation-what-to-consider', 'documents-to-prepare-for-debt-collection-in-qatar'],
  },
  {
    slug: 'early-stage-debt-collection',
    category: 'debt',
    icon: 'clock',
    name: 'Early-Stage Collection',
    shortName: 'Early-stage',
    summary:
      'Early contact, payment reminders and structured follow-up that stop receivables from ageing into problem debts.',
    seo: {
      title: 'Early-Stage Debt Collection in Qatar',
      description:
        'Early-stage collection and receivables follow-up in Qatar. Ammon Qatar provides prompt reminders, professional contact and structured follow-up to prevent invoices from ageing.',
    },
    hero: {
      eyebrow: 'Prevent ageing',
      heading: 'Early-stage collection and follow-up',
      intro:
        'The most effective recovery happens in the first weeks after a due date. We provide the reminder and follow-up discipline that busy finance teams struggle to sustain.',
    },
    audience: [
      'Companies with many small or medium invoices past due',
      'Businesses without a dedicated credit control function',
      'Firms that want reminders handled professionally but not aggressively',
    ],
    scope: [
      'Reminder sequence aligned to your payment terms',
      'Professional calls and written follow-up at defined intervals',
      'Identification of disputes and missing documents early',
      'Weekly reporting on ageing and responses',
      'Hand-over to full recovery only if needed',
    ],
    approach: [
      { title: 'Map', body: 'We agree the reminder schedule, tone and channels for each customer segment.' },
      { title: 'Remind', body: 'Timely, polite reminders that reference the invoice, terms and payment options.' },
      { title: 'Follow up', body: 'Calls and messages that confirm receipt, resolve queries and secure a payment date.' },
      { title: 'Report', body: 'A simple ageing report so you can see what is moving and what needs a decision.' },
    ],
    preparation: [
      'Customer list with contact details',
      'Open invoices and due dates',
      'Your standard payment terms',
      'Any customer-specific arrangements',
    ],
    faqs: [
      {
        q: 'Is early-stage collection different from full debt collection?',
        a: 'Yes. It focuses on reminders and follow-up within the first 30–60 days, before a balance becomes a dispute or a problem debt. The tone is service-oriented rather than demanding.',
      },
      {
        q: 'Can this run continuously?',
        a: 'Yes. Many clients engage early-stage collection as an ongoing function alongside their accounts team.',
      },
    ],
    relatedServices: ['payment-monitoring', 'unpaid-invoice-recovery', 'corporate-debt-collection'],
    relatedInsights: ['credit-control-checklist-to-reduce-invoice-ageing', 'when-to-refer-an-overdue-account-for-collection'],
  },
  {
    slug: 'unpaid-invoice-recovery',
    category: 'debt',
    icon: 'file-text',
    name: 'Unpaid Invoice Recovery',
    shortName: 'Invoices',
    summary:
      'Recovery of overdue and unpaid invoices with a clear statement of account, professional demand and negotiated resolution.',
    seo: {
      title: 'Unpaid Invoice Recovery in Qatar',
      description:
        'Recover unpaid and overdue invoices in Doha and across Qatar. Ammon Qatar prepares the statement of account, contacts the customer professionally and negotiates payment.',
    },
    hero: {
      eyebrow: 'Overdue invoice collection',
      heading: 'Unpaid invoice recovery in Qatar',
      intro:
        'When invoices go unpaid beyond terms, a clear, well-documented approach recovers more than repeated emails. We prepare the account, present it professionally and negotiate to a resolution.',
    },
    audience: [
      'Suppliers and service providers with invoices past due',
      'Consultancies and agencies with unpaid milestone invoices',
      'Trading companies with customers holding multiple overdue invoices',
    ],
    scope: [
      'Consolidated statement of account across all open invoices',
      'Written demand referencing contract terms and evidence of delivery',
      'Direct engagement with the customer’s accounts payable and management',
      'Negotiation of payment dates, plans or approved settlements',
      'Confirmation and monitoring of every payment',
    ],
    approach: [
      { title: 'Reconcile', body: 'We build one accurate statement so there is nothing to argue about on the numbers.' },
      { title: 'Present', body: 'A professional demand with the documents attached leaves the customer a clear path to pay.' },
      { title: 'Negotiate', body: 'Within limits you set, we agree dates, plans or settlements that get funds moving.' },
      { title: 'Close', body: 'Payments are confirmed and the file is closed with a summary for your records.' },
    ],
    preparation: [
      'Open invoices with dates and amounts',
      'Contract, quotation or purchase order',
      'Proof of delivery or acceptance',
      'Payment history and any credit notes',
    ],
    faqs: [
      {
        q: 'How old can an invoice be for you to take it on?',
        a: 'We assess invoices of any age, but recovery is generally more practical the earlier a file is referred. We will tell you candidly if a balance looks impractical to pursue.',
      },
      {
        q: 'Do you charge a percentage or a fixed fee?',
        a: 'Fee structures are agreed per engagement and set out in writing before work starts. TODO(owner): publish the standard fee model once confirmed.',
      },
    ],
    relatedServices: ['corporate-debt-collection', 'negotiation-settlement', 'early-stage-debt-collection'],
    relatedInsights: ['documents-to-prepare-for-debt-collection-in-qatar', 'credit-control-checklist-to-reduce-invoice-ageing'],
  },
  {
    slug: 'negotiation-settlement',
    category: 'debt',
    icon: 'handshake',
    name: 'Negotiation & Settlement',
    shortName: 'Settlement',
    summary:
      'Structured negotiation that converts stalled balances into signed settlements and workable payment plans.',
    seo: {
      title: 'Debt Negotiation & Settlement in Qatar',
      description:
        'Debt settlement and negotiation in Qatar. Ammon Qatar negotiates payment plans and settlements for overdue receivables, documented in writing and monitored to completion.',
    },
    hero: {
      eyebrow: 'Debt settlement',
      heading: 'Negotiation and settlement of overdue balances',
      intro:
        'A settlement that is actually paid is worth more than a demand that is ignored. We negotiate within the limits you set and document every agreement.',
    },
    audience: [
      'Creditors with balances the debtor acknowledges but cannot pay in full',
      'Companies seeking to close long-outstanding accounts',
      'Parties who want an agreement without litigation',
    ],
    scope: [
      'Assessment of the debtor’s position and realistic capacity',
      'Settlement and payment plan proposals within your mandate',
      'Negotiation meetings and correspondence',
      'Written settlement agreements and payment schedules',
      'Monitoring of compliance with the agreement',
    ],
    approach: [
      { title: 'Mandate', body: 'You define the minimum acceptable outcome, timing and any conditions before we open discussions.' },
      { title: 'Negotiate', body: 'Fact-based negotiation focused on what the debtor can actually deliver and when.' },
      { title: 'Document', body: 'Every agreement is put in writing with dates, amounts and consequences of default.' },
      { title: 'Verify', body: 'We monitor performance and report any deviation immediately.' },
    ],
    preparation: [
      'Statement of the balance and its basis',
      'Your minimum acceptable settlement terms',
      'Any previous offers or discussions',
    ],
    faqs: [
      {
        q: 'Do we have to accept less than the full amount?',
        a: 'No. You set the mandate. A settlement can be full payment over time, a discount for prompt payment, or another structure you approve.',
      },
      {
        q: 'What happens if the debtor breaks the settlement?',
        a: 'Agreements include clear default terms. If a payment is missed we inform you at once and recommend the next step.',
      },
    ],
    relatedServices: ['payment-monitoring', 'bank-finance-settlements', 'legal-follow-up'],
    relatedInsights: ['amicable-settlement-versus-escalation-what-to-consider'],
  },
  {
    slug: 'bank-finance-settlements',
    category: 'debt',
    icon: 'landmark',
    name: 'Bank & Finance Settlement Support',
    shortName: 'Bank & finance',
    summary:
      'Support for individuals and businesses negotiating settlements or restructured repayment with banks and finance companies.',
    seo: {
      title: 'Bank & Finance Company Settlement Support in Qatar',
      description:
        'Support with bank debt settlement and finance company settlements in Qatar. Ammon Qatar helps prepare proposals, organise documents and communicate professionally with lenders.',
    },
    hero: {
      eyebrow: 'Lender settlements',
      heading: 'Bank and finance company settlement support',
      intro:
        'Preparing a credible settlement or restructuring proposal takes organisation. We help you present your position clearly and communicate professionally with the lender.',
    },
    audience: [
      'Individuals with overdue personal finance or card balances',
      'Businesses with facilities in arrears or under review',
      'Guarantors seeking to resolve an exposure',
    ],
    scope: [
      'Review of the facility, statements and correspondence',
      'Preparation of a realistic settlement or repayment proposal',
      'Organisation of supporting financial documents',
      'Professional communication with the lender on your behalf, where the lender permits',
      'Tracking of agreed terms after acceptance',
    ],
    approach: [
      { title: 'Understand', body: 'We map the facility, the arrears and the lender’s stated position.' },
      { title: 'Prepare', body: 'A clear proposal with supporting documents that a credit committee can assess.' },
      { title: 'Communicate', body: 'Consistent, professional correspondence and follow-up with the lender.' },
      { title: 'Track', body: 'Once terms are agreed, we help you monitor compliance.' },
    ],
    preparation: [
      'Facility agreement and latest statements',
      'Letters or notices received from the lender',
      'Summary of income or cash flow available for repayment',
    ],
    faqs: [
      {
        q: 'Can Ammon Qatar make a bank accept a settlement?',
        a: 'No. Whether to accept a proposal is entirely the lender’s decision under its own policies. Our role is to help you prepare and present a credible proposal and manage the communication.',
      },
      {
        q: 'Do you deal with the bank directly?',
        a: 'Where the lender accepts communication through an authorised representative and you authorise us in writing, yes. Otherwise we prepare everything for you to submit.',
      },
    ],
    relatedServices: ['negotiation-settlement', 'payment-monitoring', 'individual-debt-collection'],
    relatedInsights: ['amicable-settlement-versus-escalation-what-to-consider'],
    note: 'Ammon Qatar does not represent that any lender is obliged to accept a settlement proposal. Outcomes depend on the lender’s own assessment.',
  },
  {
    slug: 'payment-monitoring',
    category: 'debt',
    icon: 'chart',
    name: 'Payment Monitoring',
    shortName: 'Monitoring',
    summary:
      'Ongoing monitoring of payment plans and settlements, with reminders before due dates and immediate action on missed instalments.',
    seo: {
      title: 'Payment Plan Monitoring in Qatar',
      description:
        'Payment plan and settlement monitoring in Qatar. Ammon Qatar tracks instalments, sends reminders and acts immediately on missed payments so agreements are actually completed.',
    },
    hero: {
      eyebrow: 'Follow-through',
      heading: 'Payment plan monitoring',
      intro:
        'An agreement is only valuable if it is performed. We track every instalment, remind before due dates and act the day a payment is missed.',
    },
    audience: [
      'Creditors with active payment plans or settlements',
      'Businesses that agreed instalments but lack the capacity to chase them',
      'Clients of our negotiation service who want continued oversight',
    ],
    scope: [
      'Schedule of all agreed payments',
      'Reminders before each due date',
      'Confirmation of receipt with you',
      'Immediate follow-up on any missed or partial payment',
      'Monthly status report',
    ],
    approach: [
      { title: 'Schedule', body: 'The agreement is converted into a dated schedule with responsibilities.' },
      { title: 'Remind', body: 'Courteous reminders keep the plan visible to the debtor.' },
      { title: 'Confirm', body: 'Each payment is confirmed against your bank records.' },
      { title: 'Act', body: 'A missed payment triggers contact within the agreed window and a recommendation to you.' },
    ],
    preparation: [
      'Signed payment plan or settlement agreement',
      'Debtor contact details',
      'Your bank confirmation process for receipts',
    ],
    faqs: [
      {
        q: 'Do you monitor plans you did not negotiate?',
        a: 'Yes. We can take over monitoring of any documented arrangement.',
      },
    ],
    relatedServices: ['negotiation-settlement', 'early-stage-debt-collection', 'individual-debt-collection'],
    relatedInsights: ['credit-control-checklist-to-reduce-invoice-ageing'],
  },
  {
    slug: 'legal-follow-up',
    category: 'debt',
    icon: 'scale',
    name: 'Legal Follow-Up',
    shortName: 'Legal follow-up',
    summary:
      'When amicable recovery is exhausted, we prepare the file and coordinate the appropriate next step with licensed professionals.',
    seo: {
      title: 'Legal Follow-Up for Debt Recovery in Qatar',
      description:
        'Coordinated legal follow-up for unpaid debts in Qatar. Ammon Qatar prepares recovery files and coordinates with licensed legal professionals when amicable collection is unsuccessful.',
    },
    hero: {
      eyebrow: 'Appropriate escalation',
      heading: 'Legal follow-up and file preparation',
      intro:
        'Escalation should be a considered decision, taken with a complete file. We organise the evidence, summarise the recovery history and coordinate the next step with licensed legal professionals.',
    },
    audience: [
      'Creditors whose amicable recovery has stalled',
      'Companies that need the file organised before instructing lawyers',
      'Clients who want one point of contact through the escalation',
    ],
    scope: [
      'Complete chronology of the debt and recovery attempts',
      'Organised evidence bundle: contracts, invoices, delivery proof, correspondence',
      'Coordination with licensed legal counsel of your choice or introduced by us',
      'Ongoing communication and status updates during the legal process',
      'Continued negotiation where the debtor re-engages',
    ],
    approach: [
      { title: 'Review', body: 'We confirm that amicable options are exhausted and that escalation is proportionate.' },
      { title: 'Prepare', body: 'A structured file that a lawyer can act on immediately.' },
      { title: 'Coordinate', body: 'Introduction and hand-over to licensed counsel; we remain your point of contact.' },
      { title: 'Follow through', body: 'Updates at each stage and readiness to settle if the debtor returns to the table.' },
    ],
    preparation: [
      'All contract and invoice documents',
      'Record of contacts and responses to date',
      'Any settlement offers made or received',
    ],
    faqs: [
      {
        q: 'Is Ammon Qatar a law firm?',
        a: 'No. Ammon Qatar is a collection services company. Where legal proceedings are appropriate they are conducted by licensed legal professionals; our role is preparation, coordination and communication. TODO(owner): confirm operating model wording.',
      },
      {
        q: 'When is legal action the right step?',
        a: 'When the debt is documented, the debtor is not engaging in good faith, and the amount justifies the cost and time. We give you a candid assessment before recommending it.',
      },
    ],
    relatedServices: ['negotiation-settlement', 'corporate-debt-collection', 'unpaid-invoice-recovery'],
    relatedInsights: ['amicable-settlement-versus-escalation-what-to-consider', 'documents-to-prepare-for-debt-collection-in-qatar'],
    note: 'Ammon Qatar is not a law firm. Legal proceedings, where required, are conducted by licensed legal professionals. TODO(owner): confirm and finalise this wording.',
  },
  {
    slug: 'company-formation',
    category: 'formation',
    icon: 'briefcase',
    name: 'Company Formation',
    shortName: 'Company formation',
    summary:
      'Setting up in Qatar involves decisions about structure, activity and licensing. We help you see the route clearly before you file, then coordinate the steps.',
    seo: {
      title: 'Company Formation Qatar | Business Setup in Doha',
      description:
        'Company formation and business setup support in Qatar, including commercial registration, trade licensing, document coordination and ongoing PRO support with Ammon Qatar.',
    },
    hero: {
      eyebrow: 'Business setup',
      heading: 'Build your company in Qatar on a clearer foundation',
      intro:
        'A successful setup starts with the right structure, activity and documentation. Ammon Qatar helps you understand the route before filing, then coordinates the steps required to move from a business idea to an operating company.',
    },
    audience: [
      'Founders establishing a first company in Qatar',
      'Foreign companies opening a branch or subsidiary',
      'Existing businesses adding or changing a licensed activity',
      'Partners who need the setup route explained before committing',
    ],
    scope: [
      'Review of the intended activity and commercial requirements',
      'Explanation of the structure options available for that activity',
      'Trade name reservation and document coordination',
      'Follow-up on commercial registration and trade licence requirements',
      'Coordination with the relevant authorities for the agreed scope',
      'Post-incorporation PRO support, renewals and later amendments',
      'Residence and visa steps where they fall within the agreed scope',
    ],
    approach: [
      {
        title: 'Understand',
        body: 'We start with the activity you intend to carry out, who the partners are and the timeline you are working to.',
      },
      {
        title: 'Map the route',
        body: 'You receive the structure options, the documents each one needs and the sequence of approvals before anything is filed.',
      },
      {
        title: 'Coordinate',
        body: 'Name reservation, documents, registration and licensing are tracked as one workflow with a named point of contact.',
      },
      {
        title: 'Hand over',
        body: 'Once the company is operating we can continue with renewals, amendments and day-to-day PRO support.',
      },
    ],
    preparation: [
      'The business activity you intend to licence',
      'Passport or ID copies for each partner',
      'Preferred trade names, in order of preference',
      'Shareholding split and intended management structure',
      'Expected number of employees and target start date',
    ],
    faqs: [
      {
        q: 'How long does it take to set up a company in Qatar?',
        a: 'It depends on the activity, the structure and the approvals each authority requires. We give you a realistic sequence for your specific case after the assessment rather than quoting a fixed timeline before knowing the activity.',
      },
      {
        q: 'Can a foreign investor own the company fully?',
        a: 'Foreign ownership levels depend on the activity and the rules that apply to it. We confirm what applies to your intended activity rather than giving a blanket answer.',
      },
      {
        q: 'What is the difference between commercial registration and a trade licence?',
        a: 'The commercial registration establishes the company as a legal entity; the trade licence permits it to carry out its activity from its premises. Most businesses need both, and they are obtained in sequence.',
      },
    ],
    relatedServices: ['government-transactions', 'corporate-debt-collection'],
    relatedInsights: ['documents-to-prepare-for-debt-collection-in-qatar'],
    note: 'Ownership levels, approvals and timelines depend on the licensed activity and the rules in force at the time of filing. Ammon Qatar does not guarantee approval or a fixed processing time.',
  },
  {
    slug: 'government-transactions',
    category: 'government',
    icon: 'stamp',
    name: 'Government Transactions (PRO)',
    shortName: 'PRO services',
    summary:
      'Keep registrations, renewals, documents and applications moving without pulling your team away from running the business.',
    seo: {
      title: 'PRO Services Qatar | Government Transaction Support',
      description:
        'PRO services and government transaction follow-up in Qatar: company registrations, renewals, document attestation, labour and immigration files coordinated by Ammon Qatar in Doha.',
    },
    hero: {
      eyebrow: 'Government liaison',
      heading: 'PRO and government transaction support in Qatar',
      intro:
        'Your team should not spend hours working out where a transaction stands or when a document expires. Ammon Qatar organises and follows up the government-facing procedures for your company and its staff, within the agreed scope.',
    },
    audience: [
      'Companies without a dedicated PRO or government-relations officer',
      'Businesses with renewals and expiries that keep slipping',
      'HR and admin teams handling staff documentation',
      'Newly formed companies setting up their first filings',
    ],
    scope: [
      'Commercial registration and licence transactions',
      'Renewals, amendments and cancellations',
      'Labour and recruitment files within the agreed scope',
      'Visa and residence procedures where they form part of the service',
      'Document attestation and follow-up with the relevant authorities',
      'Corporate and administrative filings',
      'Expiry and renewal reminders, with clear status updates',
    ],
    approach: [
      {
        title: 'Register the file',
        body: 'We record what the transaction is, which authority handles it and any deadline attached to it.',
      },
      {
        title: 'Prepare',
        body: 'Documents are checked against the requirements before submission, so the file is not returned for a missing page.',
      },
      {
        title: 'Follow up',
        body: 'We track the transaction through to completion and tell you where it stands rather than waiting to be asked.',
      },
      {
        title: 'Stay ahead',
        body: 'Expiry dates are logged so renewals start before they become urgent.',
      },
    ],
    preparation: [
      'The transaction type and the authority concerned, if known',
      'Company commercial registration and licence details',
      'Any deadline or expiry date that applies',
      'Copies of the documents already issued',
      'The name of the person authorised to sign on behalf of the company',
    ],
    faqs: [
      {
        q: 'Which government transactions can you handle?',
        a: 'Company registration and licensing transactions, renewals and amendments, labour and immigration files, attestation and administrative filings. The exact scope is agreed in writing before we start, as some transactions require the signature or presence of an authorised signatory.',
      },
      {
        q: 'Can you guarantee a transaction will be approved?',
        a: 'No. Approvals and processing times are decided by the relevant authority. What we control is that the file is complete, submitted correctly and followed up consistently.',
      },
      {
        q: 'Do you handle ongoing renewals or only one-off transactions?',
        a: 'Both. Many clients engage us on a continuing basis so registrations, licences and staff documents are tracked and renewed before they expire.',
      },
    ],
    relatedServices: ['company-formation', 'payment-monitoring'],
    relatedInsights: ['credit-control-checklist-to-reduce-invoice-ageing'],
    note: 'Ammon Qatar coordinates and follows up transactions on the client behalf within an agreed, written scope. Approval and processing times are determined by the relevant authority.',
  },
];
