import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n/config';

/*
 * Edge locale routing.
 *
 * /            → 307 → /en or /ar (cookie → Accept-Language → default)
 * /services/x  → 307 → /{locale}/services/x
 * /en/...      → pass through, tag response with locale headers and refresh the cookie
 *
 * Redirect responses carry `Vary: Accept-Language, Cookie` so CDN/edge caches
 * key on them; locale-prefixed pages are fully static (ISR) and cacheable.
 */

const LOCALE_COOKIE = 'NEXT_LOCALE';
const ONE_YEAR = 60 * 60 * 24 * 365;

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const accept = request.headers.get('accept-language') ?? '';
  // Parse "ar-QA,ar;q=0.9,en;q=0.8" → ordered by q-value.
  const ranked = accept
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { lang: tag.toLowerCase().split('-')[0], q: q ? parseFloat(q.split('=')[1]) : 1, index };
    })
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { lang } of ranked) {
    if (isLocale(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [, first] = pathname.split('/');

  if (isLocale(first)) {
    const response = NextResponse.next();
    response.headers.set('x-locale', first);
    response.headers.set('Content-Language', first === 'ar' ? 'ar-QA' : 'en-QA');
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, { path: '/', maxAge: ONE_YEAR, sameSite: 'lax' });
    }
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  url.search = search;

  const response = NextResponse.redirect(url, 307);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600');
  response.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: ONE_YEAR, sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, metadata routes and anything with a file extension.
    '/((?!_next/static|_next/image|api|images|fonts|icon\\.svg|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
};
