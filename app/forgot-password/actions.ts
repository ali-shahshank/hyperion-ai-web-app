'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  // 1. Safely extract and trim email
  const email = formData.get('email')?.toString().trim();

  if (!email) {
    return { error: 'Email address is required.' };
  }

  // 2. Dynamically determine domain origin
  const origin = (await headers()).get('origin');
  // Hash flow - const redirectTo = `${origin}/auth/confirm?next=/reset-password`;
  const redirectTo = `${origin}/auth/callback?next=/reset-password`;

  // 3. Request password reset email from Supabase
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  // 4. Handle response
  if (error) {
    console.error('Reset Password Error:', error.message);
    return { error: error.message };
  }

  return { message: 'Check your email for a password reset link.' };
}
