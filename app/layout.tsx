import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Loading from './loading';
import theme from '@/app/theme/theme';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),

  title: {
    default: 'Hyperion AI',
    template: '%s | Hyperion AI',
  },

  description:
    'The AI workspace built for how professionals actually work. Automate meetings, emails, and documents into structured action plans.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    siteName: 'Hyperion AI',
    title: 'Hyperion AI',
    description: 'The AI workspace built for how professionals actually work.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Hyperion AI',
    description: 'The AI workspace built for how professionals actually work.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<Loading />}> {children}</Suspense>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
