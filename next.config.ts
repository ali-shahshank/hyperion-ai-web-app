import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const cspHeader = `
  default-src 'self';
  script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  worker-src 'self' blob:;
  manifest-src 'self';
  frame-ancestors 'none';
  connect-src 'self' https://*.supabase.co https://api.groq.com https://api.openai.com https://api.anthropic.com;
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspHeader.replace(/\n/g, ''),
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(self), microphone=(self), geolocation=()',
        },
      ],
    },
  ],
};

export default nextConfig;
