import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

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

  // 1. Prepare request headers with the CSP nonce
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // 2. Clone the request with updated headers
  const requestWithHeaders = new NextRequest(req.url, {
    headers: requestHeaders,
    method: req.method,
  });

  // 3. Refresh session and retrieve response containing updated cookies
  const response = await updateSession(requestWithHeaders);

  // 4. Attach security headers to the final outgoing response
  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
