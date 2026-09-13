import { NextResponse, type NextRequest } from 'next/server';

const isDev = process.env.NODE_ENV === 'development';

export async function proxy(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
    default-src 'self';
   script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ''};
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
  `.replace(/\n/g, '');

  const requestHeaders = new Headers(req.headers);
  // Pass nonce to layout via request header
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set('Content-Security-Policy', cspHeader);

  return res;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
