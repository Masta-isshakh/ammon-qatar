import Link from 'next/link';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/Button';
import { getContent } from '@/content';
import { fontClassName } from '@/lib/fonts';
import { LOCALE_META, isLocale, localePath, type Locale } from '@/lib/i18n/config';

export default async function NotFound() {
  const h = await headers();
  const raw = h.get('x-locale');
  const locale: Locale = isLocale(raw ?? undefined) ? (raw as Locale) : 'en';
  const { site } = await getContent(locale);
  const meta = LOCALE_META[locale];

  return (
    <section dir={meta.dir} lang={meta.hreflang} className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      {/*
        A notFound() thrown from the dynamic catch-all is streamed after the
        shell, so React fills in this boundary on the client and the <html>
        attributes from the layout are not applied. This restores lang, dir and
        the font classes. The response status is a correct 404 either way.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(d){d.lang=${JSON.stringify(meta.hreflang)};d.dir=${JSON.stringify(meta.dir)};d.className=${JSON.stringify(`js ${fontClassName(locale)}`)}})(document.documentElement)`,
        }}
      />
      <p className="text-6xl font-bold text-gold-500" dir="ltr">404</p>
      <h1 className="mt-4 text-h2 font-bold text-primary-900">{site.common.notFoundTitle}</h1>
      <p className="mt-3 max-w-md text-slate-muted">{site.common.notFoundBody}</p>
      <Button asChild variant="primary" size="lg" className="mt-8">
        <Link href={localePath(locale)}>{site.common.backHome}</Link>
      </Button>
    </section>
  );
}
