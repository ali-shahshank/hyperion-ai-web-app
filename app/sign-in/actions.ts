'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Sign-in with email and password
export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/chat');
}

// Google Sign-in
export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  redirect(data.url);
}

// Microsoft Sign-in
export async function signInWithMicrosoft() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: 'email profile',
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  redirect(data.url);
}
