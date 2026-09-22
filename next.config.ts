import type { NextConfig } from 'next';

const ONE_YEAR = 60 * 60 * 24 * 365;

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: `max-age=${ONE_YEAR}; includeSubDomains; preload` },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // AVIF first, WebP fallback — both served through the built-in optimizer.
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 78, 85],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: ONE_YEAR,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    // Tree-shake icon/animation barrels so client chunks stay tiny.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
    ];
  },
};

export default nextConfig;
