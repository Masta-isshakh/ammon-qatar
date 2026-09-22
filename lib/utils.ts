import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge about the custom fluid type scale so `text-h2` is not
// mistaken for a colour utility and dropped when combined with `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-display', 'text-h1', 'text-h2', 'text-h3', 'text-lead'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, locale: 'en' | 'ar') {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-QA' : 'en-QA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
  }).format(new Date(iso));
}
