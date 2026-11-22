import type { LegalPageContent } from '../types';

export const site = {
  meta: {
    siteName: 'Ammon Qatar',
    titleTemplate: '%s | Ammon Qatar',
    home: {
      title: 'Debt Collection, Company Formation & PRO Services in Qatar | Ammon Qatar',
      description:
        'Ammon Qatar provides professional debt collection and receivables recovery, company formation and government transaction (PRO) support in Doha, Qatar. Request a confidential assessment.',
    },
    ogDescription: 'Recover what you are owed. Establish and run your business in Qatar with structured, confidential follow-up.',
  },
  utility: {
    tagline: 'Debt collection · Company formation · Government transactions — Doha, Qatar',
    hours: 'Sun–Thu',
  },
  nav: {
    services: 'Services',
    industries: 'Industries',
    howItWorks: 'How It Works',
    insights: 'Insights',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    doha: 'Doha',
    cta: 'Request Case Assessment',
    whatsapp: 'WhatsApp',
    whatsappLabel: 'Message us on WhatsApp',
    call: 'Call',
    menu: 'Open menu',
    close: 'Close menu',
    home: 'Ammon Qatar — Home',
    switchLocale: 'عربي',
    switchLocaleLabel: 'التبديل إلى العربية',
    skip: 'Skip to main content',
  },
  hero: {
    eyebrow: 'Debt Collection, Company Formation & PRO Services in Qatar',
    heading: 'Recover What You Are Owed. Move Your Business Forward in Qatar.',
    subcopy:
      'Ammon Qatar handles the work that needs consistent, professional follow-up in Qatar — overdue receivables, company formation and government transactions. One point of contact, a defined process and honest updates throughout.',
    primaryCta: 'Request a Confidential Case Assessment',
    secondaryCta: 'Talk to Our Team',
    positioning: 'Initial assessment · Confidential handling · No obligation to engage',
    servicesLabel: 'We help with',
    slides: {
      doha: 'Doha, Qatar — receivables, company setup and government files, managed locally.',
      meeting: 'Every file starts with an honest assessment.',
      team: 'A bilingual team that handles your case discreetly.',
    },
    carousel: {
      label: 'Ammon Qatar in Doha',
      slide: 'Show image {n} of {total}',
      pause: 'Pause image rotation',
      play: 'Resume image rotation',
    },
  },
  trust: {
    heading: 'How we work',
    items: [
      { title: 'Confidential Handling', body: 'Files are handled on a need-to-know basis with clear client communication.' },
      { title: 'Structured Recovery', body: 'Every file follows a documented plan from assessment to resolution.' },
      { title: 'Clear Follow-Up', body: 'You always know the status, the next step and who is responsible.' },
      { title: 'Qatar-Focused Service', body: 'Operating from Doha with an understanding of local business practice.' },
    ],
    /** Rendered only when the key appears in NEXT_PUBLIC_VERIFIED_CREDENTIALS. */
    credentials: {
      cr: 'Commercial Registration in Qatar',
      moci: 'Registered with the Ministry of Commerce & Industry',
      insured: 'Professional liability insured',
    },
  },
  problem: {
    heading: 'When receivables or transactions stall, the whole business feels it.',
    body: 'An overdue invoice is not just a line on a statement, and a stalled transaction is not just a piece of paper. Each delay consumes your team’s time, pressures cash flow and postpones decisions. Our role is to turn the file into a structured process with a named owner, clear steps and regular updates.',
    timelineHeading: 'Receivables ageing timeline',
    timeline: [
      { label: 'Current', body: 'Invoice issued and within terms. Clear documentation now prevents disputes later.' },
      { label: '30 Days', body: 'First reminder window. Early, courteous contact keeps the relationship intact.' },
      { label: '60 Days', body: 'Structured follow-up. Payment plans or partial settlements are often still practical.' },
      { label: '90+ Days', body: 'Formal recovery strategy. Negotiation, settlement and, where required, escalation.' },
    ],
    timelineNote:
      'Ageing bands are a planning guide, not a prediction of recovery outcomes. Each file is assessed on its own facts.',
  },
  services: {
    eyebrow: 'What we do',
    heading: 'Practical support for your receivables and your business operations',
    body: 'Three areas of work, one point of contact: recovering what you are owed, establishing your company in Qatar, and keeping government paperwork moving.',
    viewAll: 'View all services',
    learnMore: 'Service details',
    /** Grouping shown on the homepage and the services index. */
    categories: {
      debt: {
        label: 'Debt Collection & Recovery',
        body: 'Structured follow-up on overdue receivables, from the first reminder through negotiation, settlement and monitoring.',
      },
      formation: {
        label: 'Company Formation',
        body: 'Understand the setup route before you file, then have the registration and licensing steps coordinated for you.',
      },
      government: {
        label: 'Government Transactions',
        body: 'Registrations, renewals, documents and applications tracked and followed up so nothing expires unnoticed.',
      },
    },
  },
  difference: {
    eyebrow: 'The Ammon Qatar difference',
    heading: 'Recovery that protects the relationship as well as the balance',
    items: [
      {
        title: 'Amicable first',
        body: 'We open with professional, respectful contact. Most overdue accounts are resolved without escalation when the approach is right.',
      },
      {
        title: 'One documented plan',
        body: 'Every file has a written strategy, agreed with you, with clear milestones and decision points.',
      },
      {
        title: 'Bilingual, local communication',
        body: 'Debtor communication in Arabic or English, in a tone appropriate to Qatar’s business culture.',
      },
      {
        title: 'Transparent reporting',
        body: 'Status updates you can forward to management, with no surprises on fees or next steps.',
      },
      {
        title: 'Appropriate escalation',
        body: 'When amicable recovery stalls, we prepare the file properly so the next step is efficient.',
      },
      {
        title: 'Confidential by design',
        body: 'Information is shared only with the people who need it to move the file forward.',
      },
    ],
  },
  process: {
    eyebrow: 'How it works',
    heading: 'A five-step recovery process',
    body: 'Clear stages, clear ownership. You decide at each milestone whether to continue, settle or escalate.',
    viewFull: 'See the full process',
  },
  industries: {
    eyebrow: 'Industry expertise',
    heading: 'Receivables challenges differ by sector',
    body: 'Ammon Qatar structures its approach around how each sector invoices, contracts and pays.',
    viewAll: 'Explore industries',
  },
  amicable: {
    eyebrow: 'Amicable-first recovery',
    heading: 'We start with the solution, not the threat.',
    body: 'A well-prepared, courteous approach recovers more and preserves commercial relationships. Escalation is a decision we take with you — never the default.',
    points: [
      'Professional contact in the debtor’s preferred language',
      'Clear statement of account and supporting documents',
      'Realistic payment plans and settlement options',
      'Written confirmation of every agreement',
    ],
    quote: 'Recover what you’re owed — professionally, confidentially, and with a clear strategy.',
  },
  confidentiality: {
    eyebrow: 'Confidentiality',
    heading: 'Your Recovery File Deserves Discretion.',
    body: 'Receivables files contain commercial relationships, pricing and internal decisions. We treat them accordingly.',
    points: [
      { title: 'Controlled handling', body: 'Each file has a named handler; access is limited to the team working on it.' },
      { title: 'Responsible information access', body: 'We request only the documents needed for the current stage.' },
      { title: 'Clear client communication', body: 'You are informed before any external step is taken on your behalf.' },
      { title: 'Secure digital workflows', body: 'Files and correspondence are kept in access-controlled systems rather than personal devices.' },
    ],
  },
  evidence: {
    eyebrow: 'Case results',
    heading: 'Anonymised case studies',
    body: 'Published only with client permission and with identifying details removed.',
    educationalHeading: 'What a well-run recovery file looks like',
    educationalBody:
      'We publish case studies only with written client permission. Until then, here is how a typical engagement is structured and what you can expect at each stage.',
    educational: [
      { title: 'Clear file, faster answers', body: 'Contracts, invoices, delivery notes and correspondence are collected once and organised into a single statement of account.' },
      { title: 'Contact with a purpose', body: 'The first communication states the balance, the basis and the options — not just a demand.' },
      { title: 'Agreements in writing', body: 'Payment plans and settlements are documented and monitored to completion.' },
      { title: 'Decision points, not drift', body: 'If a plan is missed, you are told immediately and the next step is proposed.' },
    ],
    cta: 'Discuss your file',
  },
  testimonials: {
    eyebrow: 'Client feedback',
    heading: 'What clients say',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions we are asked most',
    viewAll: 'All questions',
  },
  lead: {
    eyebrow: 'Confidential case assessment',
    heading: 'Tell us about the receivable',
    body: 'Three short steps. No documents are needed at this stage — we will request what is relevant after reviewing your summary.',
    reassurance: [
      'Confidential — shared only with the assessing team',
      'No obligation and no fee for the initial assessment',
      'We reply in Arabic or English, as you prefer',
    ],
  },
  location: {
    eyebrow: 'Doha, Qatar',
    heading: 'Based in Doha, serving clients across Qatar',
    body: 'Meet us at our office, or start with a call or WhatsApp message.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Working hours',
    hoursValue: 'Sunday – Thursday',
    map: 'Open in Google Maps',
    serviceAreas: 'Service areas',
    serviceAreasValue: 'Doha, Lusail, Al Wakrah, Al Rayyan, Al Khor and all of Qatar',
    learnMore: 'About our Doha office',
  },
  footer: {
    positioning: 'Professional, confidential debt collection and receivables recovery support for businesses and individuals in Qatar.',
    services: 'Services',
    company: 'Company',
    insights: 'Insights',
    contact: 'Contact',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    dataDeletion: 'Data Deletion',
    cookies: 'Privacy preferences',
    disclaimer: 'Information on this website is general and does not constitute legal advice.',
    rights: 'All rights reserved.',
    cr: 'CR No.',
  },
  mobileBar: {
    call: 'Call',
    whatsapp: 'WhatsApp',
    assess: 'Request Assessment',
  },
  common: {
    readMore: 'Read more',
    learnMore: 'Learn more',
    contactUs: 'Contact us',
    requestAssessment: 'Request a case assessment',
    talkToTeam: 'Talk to our team',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    minutesRead: 'min read',
    updated: 'Updated',
    published: 'Published',
    reviewedBy: 'Reviewed by',
    tableOfContents: 'In this article',
    quickAnswer: 'Quick answer',
    checklist: 'Checklist',
    relatedService: 'Related service',
    relatedArticles: 'Related reading',
    sources: 'Sources',
    inThisSection: 'In this section',
    notFoundTitle: 'Page not found',
    notFoundBody: 'The page you requested does not exist or has moved.',
    backHome: 'Back to home',
    allServices: 'All services',
    whoItsFor: 'Who it is for',
    whatItCovers: 'What the engagement covers',
    howWeApproach: 'How we approach it',
    prepare: 'What to prepare',
    relatedServices: 'Related services',
    ctaBandHeading: 'Have receivables or a transaction that needs following up?',
    ctaBandBody: 'Share a short summary and we will come back to you with a recommended approach.',
    step: 'Step',
    of: 'of',
  },
  pages: {
    about: {
      title: 'About Ammon Qatar',
      description:
        'Ammon Qatar is a Doha-based debt collection and receivables recovery company supporting businesses and individuals with structured, confidential recovery.',
      eyebrow: 'About',
      heading: 'A receivables partner built on discretion and structure',
      intro:
        'Ammon Qatar for Collection Services W.L.L. was established to give businesses and individuals in Qatar a professional alternative to chasing overdue balances themselves.',
      missionHeading: 'What we do',
      mission:
        'We manage the recovery of overdue receivables from first contact to resolution: assessing the file, agreeing a strategy, communicating with the debtor professionally, negotiating settlements, monitoring payment plans and, where needed, preparing the file for the appropriate next step.',
      valuesHeading: 'How we work',
      values: [
        { title: 'Ethical', body: 'Respectful contact, accurate statements and no pressure tactics.' },
        { title: 'Precise', body: 'Every balance is reconciled and documented before contact begins.' },
        { title: 'Discreet', body: 'Your commercial relationships and information are protected.' },
        { title: 'Accountable', body: 'One named handler and clear reporting on every file.' },
      ],
      teamHeading: 'Leadership and team',
      /** TODO(owner): add real team members with consent; section hidden until provided. */
      teamNote: 'Team profiles will be published once approved by the company.',
      complianceHeading: 'Registration and compliance',
      compliance:
        'Ammon Qatar operates as a registered company in the State of Qatar. Registration details are displayed in the footer once confirmed.',
    },
    services: {
      title: 'Our Services in Qatar',
      description:
        'Debt collection and receivables recovery, company formation and business setup, and government transaction (PRO) support in Qatar — delivered by Ammon Qatar from Doha.',
      eyebrow: 'Services',
      heading: 'Services for your receivables and your business',
      intro:
        'Engage a single service or a fully managed scope. Each service below explains who it is for, what it covers and what to prepare.',
    },
    industries: {
      title: 'Industries We Support',
      description:
        'How Ammon Qatar structures receivables recovery for construction, trading, real estate, financial services, healthcare, logistics, professional services and SMEs in Qatar.',
      eyebrow: 'Industries',
      heading: 'Sector-aware receivables recovery',
      intro:
        'Payment terms, documentation and dispute patterns differ by sector. Understanding them shapes the approach we recommend.',
      challengesLabel: 'Typical receivables challenges',
      servicesLabel: 'Relevant services',
    },
    process: {
      title: 'How Debt Collection Works with Ammon Qatar',
      description:
        'Our five-step recovery process: case assessment, recovery strategy, professional contact, negotiation and settlement, and payment monitoring or appropriate escalation.',
      eyebrow: 'How it works',
      heading: 'The recovery process, step by step',
      intro:
        'You keep control at every stage. Each step ends with a clear recommendation and your decision on how to proceed.',
      outcomesLabel: 'What you receive',
    },
    caseStudies: {
      title: 'Case Studies',
      description: 'Anonymised examples of receivables recovery engagements, published only with client permission.',
      eyebrow: 'Case studies',
      heading: 'Results, published responsibly',
    },
    insights: {
      title: 'Insights on Debt Collection & Receivables in Qatar',
      description:
        'Practical guides for Qatar business owners, finance managers and credit controllers on receivables management, collection timing, settlements and documentation.',
      eyebrow: 'Insights',
      heading: 'Practical guidance on receivables and recovery',
      intro: 'Written for business owners, finance managers, credit controllers and individuals in Qatar.',
      categories: {
        'debt-collection': 'Debt Collection',
        'receivables-management': 'Receivables Management',
        'business-credit': 'Business Credit',
        settlements: 'Settlements',
        'legal-recovery-education': 'Legal Recovery Education',
        'qatar-business-guides': 'Qatar Business Guides',
      } as Record<string, string>,
    },
    faq: {
      title: 'Debt Collection FAQ',
      description: 'Answers to common questions about referring overdue accounts, documents, debtor contact, settlements, payment plans and confidentiality.',
      eyebrow: 'FAQ',
      heading: 'Frequently asked questions',
      intro: 'If your question is not answered here, request an assessment and we will respond directly.',
    },
    contact: {
      title: 'Contact Ammon Qatar',
      description: 'Request a confidential case assessment or contact the Ammon Qatar team in Doha by phone, WhatsApp or email.',
      eyebrow: 'Contact',
      heading: 'Request a confidential case assessment',
      intro: 'Complete the short form or contact us directly. We respond in Arabic or English.',
      directHeading: 'Contact us directly',
    },
    doha: {
      title: 'Debt Collection in Doha',
      description:
        'Ammon Qatar provides debt collection and receivables recovery support from its Doha office, serving businesses and individuals across Qatar.',
      eyebrow: 'Doha, Qatar',
      heading: 'Debt collection support from Doha',
      intro:
        'Our office is in Doha and our work covers clients and debtors across Qatar — from West Bay and Lusail to the Industrial Area, Al Wakrah and Al Khor.',
      localHeading: 'Working locally matters',
      localBody:
        'Face-to-face meetings, familiarity with local invoicing and payment practices, and communication in Arabic and English all affect how quickly an overdue account moves.',
      whatWeDoHeading: 'What we do for Doha clients',
      areasHeading: 'Areas we serve',
      areas: ['West Bay', 'Lusail', 'Msheireb', 'Al Sadd', 'Industrial Area', 'Al Wakrah', 'Al Rayyan', 'Al Khor'],
      visitHeading: 'Visit or contact us',
    },
    /*
     * Legal pages. Copy reflects what the site actually does (verified against the code):
     * lead form → Amplify Data (DynamoDB) + SES email, NEXT_LOCALE cookie, optional GTM,
     * no Facebook Login / Meta Pixel / Graph API on the website.
     * TODO(legal): have a Qatar-qualified lawyer review all three pages.
     */
    privacy: {
      title: 'Privacy Policy',
      description:
        'How Ammon Qatar collects, uses, shares and protects personal information — including enquiries, messages through Facebook, Instagram and WhatsApp, and your privacy rights.',
      heading: 'Privacy Policy',
      updated: 'Last updated',
      intro:
        'This Privacy Policy explains how {company} ("Ammon Qatar", "we", "us") handles personal information when you visit ammonqatar.com, submit an enquiry, or contact us by phone, email, WhatsApp, Facebook or Instagram.',
      sections: [
        {
          heading: 'Who we are',
          body: [
            '{company} is a company based in Doha, State of Qatar, providing debt collection and receivables recovery, company formation and government transaction (PRO) support. We are responsible for the personal information described in this policy.',
            'For any privacy question or request, contact us at {email}. Our phone number and office details are on our [Contact page](/contact).',
          ],
        },
        {
          heading: 'Information we collect',
          body: ['We collect only what we need to respond to you and provide our services:'],
          bullets: [
            'Case assessment form: your name, whether you are a company or an individual, company name (for companies), phone number, email address, preferred contact method, the service you are interested in, and the details you choose to give about your matter — for example the type, approximate amount range and age of a receivable, a business activity, a government transaction type, a timeline and an optional message.',
            'Technical details sent with the form: the language and page you submitted from, any campaign (UTM) tags in the link you followed, and the date and time of your consent and submission.',
            'Communications: the content of emails, phone calls, WhatsApp messages and Facebook or Instagram messages you send us, together with the contact details and profile name those channels show us.',
            'Client files: if you engage us, the documents and information needed to manage your matter, handled under your written engagement agreement.',
          ],
          after: [
            'Please do not send identity documents, bank details or other sensitive data through the website form. Your IP address is used briefly in server memory to block abusive or automated submissions and is not stored with your enquiry. Our hosting provider keeps standard technical and security logs (such as IP address, browser type and pages requested) to operate and protect the website.',
          ],
        },
        {
          heading: 'How we use your information',
          body: ['We use personal information to:'],
          bullets: [
            'review your enquiry, contact you about it and recommend an approach;',
            'provide, manage and report on services you engage us for;',
            'reply to messages you send us through any channel;',
            'keep the website and our systems secure and prevent spam or misuse;',
            'meet legal, regulatory and record-keeping obligations, and establish or defend legal claims.',
          ],
          after: [
            'We rely on your consent (given when you submit the form or contact us), the steps needed to enter into or perform an agreement with you, our legitimate business interests, and our legal obligations.',
            'We do not sell personal information, and we do not use it for automated decision-making or to build advertising profiles.',
          ],
        },
        {
          heading: 'Facebook, Instagram and WhatsApp (Meta)',
          body: [
            'This website does not use Facebook Login, does not include the Meta Pixel or any other Meta tracking code, and never asks for access to your Facebook or Instagram account.',
            'Ammon Qatar has registered a Meta app ("Ammon Qatar", App ID 1784765469276297) for use with its own business accounts on Meta platforms. When you message, comment on or otherwise interact with our Facebook Page, Instagram account or WhatsApp number, we receive the information you choose to share and the information Meta makes available to businesses for that interaction — typically your public name or username, profile identifier and the content of your messages.',
          ],
          after: [
            'We use this information only to respond to you and handle your enquiry as described in this policy. The data our app can access is limited to the permissions approved by Meta; we request only what these purposes need and will update this policy before using any new type of Meta data. We do not sell Meta platform data or use it for advertising profiling.',
            'Meta processes data on its own platforms under the [Meta Privacy Policy](https://www.facebook.com/privacy/policy/). To ask us to delete data we hold, see our [Data Deletion Instructions](/data-deletion).',
          ],
        },
        {
          heading: 'Cookies and analytics',
          body: [
            'We use one first-party cookie, NEXT_LOCALE, to remember whether you prefer English or Arabic. It contains only the language code, expires after one year, and is not used for tracking or advertising.',
            'We do not use advertising cookies. If we enable website analytics (for example through Google Tag Manager), it records only general usage events — such as pages viewed, buttons clicked and form steps completed — and never your name, phone number, email address or message content. The analytics provider may set its own cookies, which you can block or delete in your browser settings.',
            'Links to Google Maps, WhatsApp, Instagram or Facebook take you to those services, which apply their own cookies and privacy policies.',
          ],
        },
        {
          heading: 'How we share information',
          body: ['We share personal information only as needed for the purposes above:'],
          bullets: [
            'Our team: staff and authorised personnel who handle your enquiry or file, under confidentiality obligations.',
            'Service providers that operate our systems on our behalf: Amazon Web Services (AWS) for website hosting, enquiry storage, and sending and receiving email. Data centres used for these services may be located outside the State of Qatar.',
            'Licensed professionals: where progressing your matter requires it and you agree, lawyers or other licensed professionals engaged on your behalf.',
            'Authorities: where required by law, a court order or a competent authority, or to protect our rights, our clients or the public.',
          ],
          after: ['We do not sell, rent or trade personal information.'],
        },
        {
          heading: 'Information about debtors and other people',
          body: [
            'When a client refers a receivable to us, we receive information about the debtor from that client — such as name, contact details, the amount owed and supporting documents. We use it only to manage the recovery under our agreement with the client and applicable law, communicate respectfully, and keep it confidential.',
            'Debtors may contact us at {email} to ask what information we hold about them, correct inaccuracies or exercise their other rights, subject to legal limits — for example where we must keep information needed to pursue or defend a lawful claim.',
          ],
        },
        {
          heading: 'Data security',
          body: ['We protect personal information with technical and organisational safeguards suited to its sensitivity, including:'],
          bullets: [
            'encrypted HTTPS connections across the entire website;',
            'enquiries are written from our server, and the public website credentials can create an enquiry but cannot read, change or delete stored data;',
            'access to enquiries and client files is limited to authenticated, authorised staff;',
            'analytics never receive names, contact details or message content.',
          ],
          after: ['No method of transmission or storage is completely secure, but we work to protect your information and handle any security incident in line with applicable law.'],
        },
        {
          heading: 'How long we keep information',
          body: ['We keep personal information only as long as we need it:'],
          bullets: [
            'Enquiries that do not lead to an engagement are kept only as long as needed to respond and follow up, then deleted or anonymised.',
            'Client files are kept for the duration of the engagement and afterwards for as long as the law requires (for example commercial and accounting record-keeping) or as needed to establish or defend legal claims.',
            'Messages received by email, WhatsApp, Facebook or Instagram are kept while needed to handle the conversation and any related enquiry or file.',
          ],
          after: ['You can ask us to delete your information at any time — see our [Data Deletion Instructions](/data-deletion).'],
        },
        {
          heading: 'Your rights',
          body: ['Subject to applicable law in the State of Qatar, including Law No. 13 of 2016 on Personal Data Privacy Protection, you may:'],
          bullets: [
            'ask whether we hold personal information about you and request a copy;',
            'ask us to correct inaccurate or incomplete information;',
            'ask us to delete your information;',
            'withdraw your consent or object to processing at any time (this does not affect processing already carried out);',
            'raise a concern with us and, if it is not resolved, with the competent data protection authority in Qatar.',
          ],
          after: ['To exercise any of these rights, email {email}. We may need to verify your identity before acting on a request, and we will tell you if a legal exception applies.'],
        },
        {
          heading: 'Children',
          body: [
            'Our website and services are intended for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us information, contact us and we will delete it.',
          ],
        },
        {
          heading: 'Changes to this policy',
          body: [
            'We may update this policy when our services, systems or legal obligations change. The current version is always published on this page with its "Last updated" date. Where changes are significant, we will take reasonable steps to let you know.',
          ],
        },
        {
          heading: 'Contact us',
          body: ['Privacy questions and requests: {email}', '{company}, Doha, State of Qatar. More contact options are on our [Contact page](/contact).'],
        },
      ],
    } satisfies LegalPageContent as LegalPageContent,
    terms: {
      title: 'Terms of Service',
      description:
        'The terms that govern use of the Ammon Qatar website and its enquiry service, including acceptable use, intellectual property, third-party platforms and governing law.',
      heading: 'Terms of Service',
      updated: 'Last updated',
      intro:
        'These Terms of Service ("Terms") govern your use of ammonqatar.com (the "Website"), operated by {company} ("Ammon Qatar", "we", "us"), a company based in Doha, State of Qatar. Please read them carefully.',
      sections: [
        {
          heading: 'Acceptance of these Terms',
          body: [
            'By accessing or using the Website, or by submitting an enquiry, you agree to these Terms and to our [Privacy Policy](/privacy). If you do not agree, please do not use the Website. If you use the Website on behalf of a company, you confirm that you are authorised to accept these Terms for it.',
          ],
        },
        {
          heading: 'Our services',
          body: ['Ammon Qatar provides:'],
          bullets: [
            'debt collection and receivables recovery for businesses and individuals — including early-stage collection, unpaid invoice recovery, bank and finance settlements, negotiation and settlement, payment monitoring, and follow-up of matters that require legal action;',
            'company formation and business setup support in Qatar;',
            'government transaction (PRO) support.',
          ],
          after: [
            'The Website describes these services, publishes general guidance and lets you request a confidential case assessment. The services themselves are provided only under a separate written engagement agreement, which sets out the scope, fees and responsibilities of each party and prevails over these Terms for those services.',
          ],
        },
        {
          heading: 'No client relationship or advice through the Website',
          body: [
            'Submitting an enquiry or contacting us does not create a client relationship or oblige either party to proceed.',
            'Content on the Website is general information. It is not legal, financial or professional advice and should not be relied on as such. Ammon Qatar is not a law firm; where legal proceedings are required, they are conducted by licensed legal professionals.',
            'We do not guarantee that any debt will be recovered, that any settlement will be accepted, or that any authority will approve a transaction within a particular time.',
          ],
        },
        {
          heading: 'Your responsibilities',
          body: ['When you use the Website or send us information, you agree that:'],
          bullets: [
            'the information you provide is accurate, complete and not misleading;',
            'you are entitled to share any information you provide about other people or companies, such as a debtor, and doing so is lawful;',
            'any amount you refer to us is, to the best of your knowledge, genuinely and lawfully owed;',
            'you will not send identity documents, bank details or other sensitive data through the Website form.',
          ],
        },
        {
          heading: 'Acceptable use',
          body: ['You must not:'],
          bullets: [
            'use the Website for any unlawful, fraudulent or abusive purpose, or to threaten or intimidate anyone;',
            'submit false enquiries, impersonate another person or misrepresent your connection with a company;',
            'attempt to gain unauthorised access to the Website, its servers or data, or interfere with its security or operation;',
            'send spam or automated or bulk submissions, or introduce malware or harmful code;',
            'copy, scrape or republish Website content for commercial purposes without our written permission.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'The Website and its content — including text, articles, design, graphics and the Ammon Qatar name and logo — belong to Ammon Qatar or its licensors and are protected by applicable intellectual property laws. You may view and print pages for your own information. Any other use requires our prior written permission.',
          ],
        },
        {
          heading: 'Third-party platforms and links',
          body: [
            'The Website links to services operated by others, including WhatsApp, Instagram, Facebook and Google Maps. Those services are governed by their own terms and privacy policies, and we are not responsible for their content or practices.',
            "Ammon Qatar uses Meta platforms (Facebook, Instagram and WhatsApp), including a registered Meta app, for its own business accounts and communications. When you interact with us on those platforms, Meta's terms apply to your use of them, and our [Privacy Policy](/privacy) explains how we handle the information we receive. You can ask us to delete that information by following our [Data Deletion Instructions](/data-deletion).",
          ],
        },
        {
          heading: 'Disclaimer',
          body: [
            'The Website is provided "as is" and "as available". We aim to keep it accurate and available but, to the extent permitted by law, we do not warrant that it will be uninterrupted, error-free or free of harmful components, or that its content is complete or current.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'To the fullest extent permitted by the laws of the State of Qatar, Ammon Qatar is not liable for any indirect or consequential loss, or for loss of profit, revenue, data or goodwill, arising from your use of, or inability to use, the Website or your reliance on its content. Nothing in these Terms limits any liability that cannot be limited under applicable law. Liability for services we provide is governed by the relevant engagement agreement.',
          ],
        },
        {
          heading: 'Suspension and termination',
          body: [
            'We may suspend or restrict access to the Website, or decline or stop handling an enquiry, if we reasonably believe these Terms have been breached or the Website is being misused. We may also change or discontinue any part of the Website at any time. Provisions that by their nature should continue — including intellectual property, disclaimers, limitation of liability and governing law — survive termination.',
          ],
        },
        {
          heading: 'Changes to these Terms',
          body: [
            'We may update these Terms from time to time. The current version is published on this page with its "Last updated" date, and continuing to use the Website after a change means you accept the updated Terms.',
          ],
        },
        {
          heading: 'Governing law and jurisdiction',
          body: [
            'These Terms are governed by the laws of the State of Qatar. Any dispute arising from them or from use of the Website is subject to the exclusive jurisdiction of the competent courts of the State of Qatar.',
          ],
        },
        {
          heading: 'Contact',
          body: ['Questions about these Terms: {email}. {company}, Doha, State of Qatar. More contact options are on our [Contact page](/contact).'],
        },
      ],
    } satisfies LegalPageContent as LegalPageContent,
    dataDeletion: {
      title: 'Data Deletion Instructions',
      description:
        'How to ask Ammon Qatar to delete your personal data, how to remove the Ammon Qatar app from Facebook or Instagram, and how deletion requests are processed.',
      heading: 'Data Deletion Instructions',
      updated: 'Last updated',
      intro:
        'You can ask {company} to delete the personal data we hold about you at any time — whether you contacted us through this website, by email, by phone, on WhatsApp, or through Facebook or Instagram. You do not need an account, and there is no charge.',
      request: {
        heading: 'Request deletion of your data',
        body: 'Email us from the address you used to contact us, or include the phone number or social media username you used. The button below opens a pre-filled email you can complete and send.',
        button: 'Email a data deletion request',
        fallback: 'If the button does not open your email app, write to us at',
        subject: 'Data Deletion Request',
        template:
          'Hello Ammon Qatar,\n\nPlease delete the personal data you hold about me.\n\nFull name:\nEmail address and/or phone number I used to contact you:\nEnquiry reference (e.g. AQ-XXXXXX), if known:\nFacebook or Instagram name/username, if I contacted you there:\nData to delete (all, or describe specific data):\n\nThank you.',
      },
      sections: [
        {
          heading: 'What data this covers',
          body: ['A deletion request applies to personal data Ammon Qatar holds about you, including:'],
          bullets: [
            'case assessment form submissions from this website;',
            'emails, call notes and WhatsApp messages exchanged with us;',
            'messages, comments and profile information (such as your name or username) received when you interacted with our Facebook Page or Instagram account, including any data received through the Ammon Qatar Meta app (App ID 1784765469276297).',
          ],
        },
        {
          heading: 'How to request deletion',
          body: ['Deletion requests are handled by email:'],
          steps: [
            'Email {email} with the subject "Data Deletion Request", or use the button above.',
            'Include your full name and the email address, phone number, enquiry reference or Facebook/Instagram username you used with us, so we can find your records.',
            'If needed, we will reply from {email} to confirm the request comes from you. We only ask for what is needed to confirm your identity, and we will never ask for your Facebook, Instagram or email password.',
            'We delete the data and confirm by email once the request is complete.',
          ],
        },
        {
          heading: 'Remove the Ammon Qatar app from Facebook or Instagram',
          body: ['This website does not use Facebook Login. If you have connected the "Ammon Qatar" app to your Facebook account, you can remove it at any time:'],
          steps: [
            'On Facebook, open Settings & privacy, then Settings.',
            'Open Apps and websites.',
            'Find "Ammon Qatar" and select Remove.',
          ],
          after: [
            'On Instagram, go to Settings → Website permissions → Apps and websites, then remove "Ammon Qatar" from your active apps.',
            'Menu names can vary slightly between devices. Removing the app stops it receiving new information from your account; it does not delete information we have already received. To delete that, send a deletion request as described above.',
          ],
        },
        {
          heading: 'How we process your request',
          body: ['Our team reviews every request individually:'],
          bullets: [
            'We acknowledge your request within 5 working days.',
            'We complete the deletion within 30 days of confirming your identity. If we need longer, we tell you why.',
            'We delete or anonymise your data in our enquiry records, mailboxes and messaging records. Any copies in backups are removed when those backups expire and are not restored or used in the meantime.',
            'We email you a confirmation when the request is complete, including details of any data we must keep and why.',
          ],
        },
        {
          heading: 'Data we may need to keep',
          body: ['We may keep limited information where the law requires or permits it, for example:'],
          bullets: [
            'records we must retain under commercial, accounting, tax or other legal obligations;',
            'information needed for an active engagement or to perform a contract with you or a client;',
            'information needed to establish, exercise or defend legal claims, or to prevent fraud or misuse;',
            'a minimal record of your request (your name, contact details, the date and what we did) to show that we handled it.',
          ],
          after: [
            'Where a client has referred a debt to us, debtor information needed to pursue a lawful claim may be retained under these exceptions. We will explain what is kept and why.',
            'Data held by Meta on Facebook, Instagram or WhatsApp is controlled by Meta, not by us. To delete it, use the tools Meta provides in your account settings or see the [Meta Privacy Policy](https://www.facebook.com/privacy/policy/).',
          ],
        },
        {
          heading: 'Questions',
          body: ['For any question about your data, contact {email}. To learn more about how we handle personal information, see our [Privacy Policy](/privacy).'],
        },
      ],
    } satisfies LegalPageContent as LegalPageContent,
  },
};

export type SiteContent = typeof site;
