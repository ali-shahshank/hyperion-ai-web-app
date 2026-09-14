import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/proxy';

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
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const requestWithHeaders = new NextRequest(req.url, {
    headers: requestHeaders,
    method: req.method,
  });

  const { supabase, supabaseResponse } = createClient(requestWithHeaders);

  // [auth routes]
  const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
    '/blog',
    '/product',
    '/pricing',
  ];

  // [auth] refresh session — getUser() not getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/share'),
  );

  // [auth] redirect unauthenticated users to sign-in
  if (!user && !isPublicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/sign-in';
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // [auth] redirect authenticated users away from auth pages
  if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/chat', req.url));
  }

  supabaseResponse.headers.set('Content-Security-Policy', cspHeader);
  supabaseResponse.headers.set('x-nonce', nonce);

  return supabaseResponse;
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
