'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  // 1. Safely extract password without String(null) coercion
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  // 2. Validate input presence and length
  if (!password) {
    return { error: 'Password is required.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  // Optional: Confirm password matching if present in form
  if (confirmPassword && password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  // 3. Update user password via Supabase Auth
  const { error } = await supabase.auth.updateUser({
    password,
  });

  // 4. Return early on error
  if (error) {
    console.error('Password Update Error:', error.message);
    return { error: error.message };
  }

  // 5. Redirect to sign-in page upon success
  redirect('/sign-in?message=Password updated successfully');
}
