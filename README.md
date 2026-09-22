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

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `clean` (clears stale `.next` output), `sandbox`,
`assets:logo` (regenerates every logo asset from `assets-source/logo/`), `assets:images` (converts new photos in
`public/images` to web-sized JPEGs — run this after adding any photograph).

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
| Photography | drop the file in `public/images/`, run `npm run assets:images`, then point the slot in `content/images.ts` at it |
| Hero carousel slides | `slides` prop in [components/hero/HomeHero.tsx](components/hero/HomeHero.tsx) — first entry is the default and the LCP image |
| Logo | drop new artwork in `public/logo/` and run `npm run assets:logo` (see `public/logo/README.md`) |

Both locales share slugs, so the language switcher always lands on the equivalent page.

## Performance notes

Measured locally against the production build (Edge, 1366×800, warm cache):

| Page | LCP | CLS | Transfer |
| --- | --- | --- | --- |
| Home EN | ~610 ms | 0.0004 | 91 KB |
| Service EN | ~284 ms | 0.0005 | 43 KB |
| Contact EN | ~264 ms | 0.0004 | 67 KB |
| Article AR | ~288 ms | 0.0085 | 99 KB |

What keeps it fast:

- Source photographs are converted once to web-sized JPEGs (18 MB → 2.1 MB) and then served as AVIF/WebP by `next/image`.
- Only the default hero slide is in the initial payload; the other carousel slides mount when the browser is idle.
- English pages load one variable font (24 KB); the Arabic family (69 KB extra) is only requested on `/ar` pages.
- `priority` is set on exactly one image per page; everything else lazy-loads. Every image has fixed dimensions, so CLS stays near zero.
- Animations are CSS-only and animate `opacity`/`transform` exclusively; there is no animation library in the bundle.

## Deployment (AWS Amplify Hosting)

1. Connect the repository; `amplify.yml` is picked up automatically (backend + SSR frontend).
2. Set the environment variables from `.env.example` in the Amplify console.
3. Verify `NOTIFY_FROM_EMAIL` / `NOTIFY_TO_EMAIL` in Amazon SES (request production access if the account is sandboxed).
4. Attach the custom domain; `/` redirects at the edge to `/en` or `/ar`.

## Known behaviour

- The localized 404 page returns a correct **404 status** and renders with the full header/footer, but because
  `notFound()` is thrown from a dynamic catch-all route, React fills the page in on the client. With JavaScript
  disabled the body is empty (the status code is still 404). Crawlers execute JS and honour the status, so this is
  acceptable; revisit if a no-JS 404 body becomes a requirement.

## Open items requiring company input (TODO)

- Street address, office coordinates, working hours and CR number (`.env`). Phone (+974 6668 5108), WhatsApp and email (info@ammonqatar.com) are set.
- Create the Facebook page **facebook.com/ammonqatar.qa** (handle matches Instagram), then set `NEXT_PUBLIC_SOCIAL_FACEBOOK`. A LinkedIn company page is also recommended.
- Exact registered legal name in both languages.
- Legal Follow-Up wording: confirm the operating model (referral to licensed external lawyers vs. in-house licensed capacity). Current text makes no claim of legal authority.
- Fee model statement in `unpaid-invoice-recovery` FAQ.
- Team profiles (About page section is hidden until provided).
- Case studies and testimonials — only with written client permission.
- A vector (SVG/AI) version of the logo when available — the current assets are generated from the supplied PNG.
- Legal review of Privacy Policy, Terms of Use and the footer disclaimer (`NEXT_PUBLIC_SHOW_LEGAL_DISCLAIMER`).
- Which trust credentials may be displayed (`NEXT_PUBLIC_VERIFIED_CREDENTIALS`).
- Article author/reviewer names (`author` field in `content/*/insights.ts`).
