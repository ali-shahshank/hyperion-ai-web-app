// 'use server';
// import { createClient } from '@/utils/supabase/server';
// import { redirect } from 'next/navigation';

// export async function signInWithEmail(formData: FormData) {
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword({
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   });
//   if (error) return { error: error.message };
//   redirect('/chat');
// }

// export async function signInWithGoogle() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
//     },
//   });
//   if (error) return { error: error.message };
//   redirect(data.url);
// }
