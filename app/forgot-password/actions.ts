'use server';
import { createClient } from '@/lib/supabase/server';

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    String(formData.get('email')),
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/confirm?next=/reset-password`,
    },
  );
  if (error) return { error: error.message };
  return { message: 'Check your email for a password reset link.' };
}
