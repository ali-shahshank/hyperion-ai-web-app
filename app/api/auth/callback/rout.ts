import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  const type = searchParams.get('type');
  const redirectedFrom = searchParams.get('redirectedFrom') ?? '/chat';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // [auth] redirect password recovery to reset page
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/reset-password', origin));
      }
      return NextResponse.redirect(new URL(redirectedFrom, origin));
    }
  }

  return NextResponse.redirect(new URL('/sign-in?error=auth_failed', origin));
}
