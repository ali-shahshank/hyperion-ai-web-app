// import { createServerClient } from '@supabase/ssr';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function proxy(req: NextRequest) {
//   let res = NextResponse.next({ request: req });

//   const supabase = createServerClient(
//     supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
//     supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
//     {
//       cookies: {
//         getAll() {
//           return req.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             req.cookies.set(name, value),
//           );
//           res = NextResponse.next({ request: req });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             res.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (
//     !session &&
//     !req.nextUrl.pathname.startsWith('/sign-in') &&
//     !req.nextUrl.pathname.startsWith('/sign-up') &&
//     !req.nextUrl.pathname.startsWith('/share') &&
//     !req.nextUrl.pathname.startsWith('/api/auth')
//   ) {
//     const redirectUrl = req.nextUrl.clone();
//     redirectUrl.pathname = '/sign-in';
//     redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
//     return NextResponse.redirect(redirectUrl);
//   }

//   return res;
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };

export async function proxy() {}
