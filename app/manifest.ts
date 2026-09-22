import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/constants/company';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.legalNameEn,
    short_name: COMPANY.brand,
    description: 'Professional, confidential debt collection and receivables recovery support in Qatar.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#f9f8f5',
    theme_color: '#001c55',
    lang: 'en-QA',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
