# Ammon Qatar — عمون قطر لخدمات التحصيل

Bilingual (English / Arabic, LTR / RTL) website for **Ammon Qatar for Collection Services W.L.L.**, a Doha-based debt collection and receivables recovery company.

**Stack:** Next.js 15 (App Router, React 19, Server Components) · AWS Amplify Gen 2 (Data, Auth, Storage, Lambda + SES) · Tailwind CSS v4 · Lucide icons · CSS-first animation system (no animation library).

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000 → /en or /ar
```

Without a deployed backend the site runs fully; the case-assessment form accepts submissions in dev only (they are logged, not stored) and refuses them in production so a lead is never silently lost. To persist leads and email the operations inbox:

```bash
cp .env.example .env.local   # fill in verified company details
npx ampx sandbox             # personal cloud sandbox → writes amplify_outputs.json
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `clean` (clears stale `.next` output), `sandbox`, `assets:placeholders`, `assets:favicon`.

## Where things live

```text
app/[locale]/                 pages: home, about, services(+8), industries, process, case-studies,
                              insights(+articles), faq, contact, doha, privacy, terms, 404, OG image
app/actions/submit-lead.ts    server action: honeypot → rate limit → validation → Amplify write
content/en, content/ar        ALL copy, services, industries, process, FAQs, articles, form strings
content/images.ts             image slots (path, intrinsic size, alt per locale)
components/                   layout · navigation · hero · sections · services · process ·
                              industries · forms · insights · seo · ui
lib/constants/company.ts      NAP + legal identity (env-driven, TODO placeholders)
lib/seo/                      metadata builder (canonical + hreflang) and JSON-LD builders
lib/validation/lead.ts        shared client/server validation (returns error keys, localised in UI)
lib/analytics/events.ts       dataLayer events — categorical values only, never PII
amplify/                      Lead model (public key: create-only), staff auth, private storage,
                              DynamoDB-stream → SES notification Lambda
middleware.ts                 edge locale routing (cookie → Accept-Language → en), no IP forcing
```

## Editing content

| Change | File |
| --- | --- |
| Phone, WhatsApp, email, address, hours, CR number, socials | `.env` → `lib/constants/company.ts` |
| Any UI copy, page intros, FAQs | `content/{en,ar}/site.ts`, `content/{en,ar}/process.ts` |
| Services (8) | `content/{en,ar}/services.ts` |
| Industries | `content/{en,ar}/industries.ts` |
| Articles | `content/{en,ar}/insights.ts` (same slugs in both locales) |
| Case studies / testimonials | `content/{en,ar}/evidence.ts` — only with written permission |
| Photography | replace files in `public/images/` keeping the aspect ratios in `content/images.ts` |
| Logo | replace `public/logo/*.svg` (see `public/logo/README.md`) |

Both locales share slugs, so the language switcher always lands on the equivalent page.

## Deployment (AWS Amplify Hosting)

1. Connect the repository; `amplify.yml` is picked up automatically (backend + SSR frontend).
2. Set the environment variables from `.env.example` in the Amplify console.
3. Verify `NOTIFY_FROM_EMAIL` / `NOTIFY_TO_EMAIL` in Amazon SES (request production access if the account is sandboxed).
4. Attach the custom domain; `/` redirects at the edge to `/en` or `/ar`.

## Open items requiring company input (TODO)

- Verified phone, WhatsApp, email, street address, coordinates, hours, CR number (`.env`).
- Exact registered legal name in both languages.
- Legal Follow-Up wording: confirm the operating model (referral to licensed external lawyers vs. in-house licensed capacity). Current text makes no claim of legal authority.
- Fee model statement in `unpaid-invoice-recovery` FAQ.
- Team profiles (About page section is hidden until provided).
- Case studies and testimonials — only with written client permission.
- Final photography for the four image slots; official vector logo.
- Legal review of Privacy Policy, Terms of Use and the footer disclaimer (`NEXT_PUBLIC_SHOW_LEGAL_DISCLAIMER`).
- Which trust credentials may be displayed (`NEXT_PUBLIC_VERIFIED_CREDENTIALS`).
- Article author/reviewer names (`author` field in `content/*/insights.ts`).
