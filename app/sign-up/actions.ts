'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signUpWithEmail(formData: FormData) {
  const supabase = await createClient();

  // 1. Extract and sanitize inputs safely
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();
  const fullName = formData.get('name')?.toString().trim();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  // 2. Build origin for the email redirect link
  const origin = (await headers()).get('origin');

  // 3. Call Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName || '',
      },
    },
  });

  // 4. Handle error response properly
  if (error) {
    console.error('Supabase Sign Up Error:', error.message);
    return { error: error.message };
  }

  return { message: 'Check your email to confirm your account.' };
}

// Google Sign-up
export async function signUpWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  redirect(data.url);
}

// Microsoft Sign-up
export async function signUpWithMicrosoft() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: 'email profile',
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  redirect(data.url);
}
