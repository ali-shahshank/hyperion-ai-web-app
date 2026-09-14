'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: String(formData.get('password')),
  });
  if (error) return { error: error.message };
  redirect('/sign-in?message=Password updated successfully');
}
