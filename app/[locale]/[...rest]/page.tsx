import { notFound } from 'next/navigation';

/** Any unmatched path under a locale renders the localized not-found page (keeps header/footer). */
export default function CatchAll() {
  notFound();
}
