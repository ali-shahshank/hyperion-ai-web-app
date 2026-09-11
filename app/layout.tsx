import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/app/theme/theme';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// [SEO] metadataBase required for absolute OG/canonical URLs
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),

  // [SEO] title template applies to all child pages
  title: {
    default: 'Hyperion AI',
    template: '%s | Hyperion AI',
  },

  description:
    'The AI workspace built for how professionals actually work. Automate meetings, emails, and documents into structured action plans.',

  // [SEO] robots — index all pages by default
  robots: {
    index: true,
    follow: true,
  },

  // [SEO] OG metadata for social sharing
  openGraph: {
    type: 'website',
    siteName: 'Hyperion AI',
    title: 'Hyperion AI',
    description: 'The AI workspace built for how professionals actually work.',
  },

  // [SEO] Twitter/X card
  twitter: {
    card: 'summary_large_image',
    title: 'Hyperion AI',
    description: 'The AI workspace built for how professionals actually work.',
  },
};

// [Next.js 15+] viewport must be a separate export
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
      {/* [a11y] <body> has no role — correct, landmark roles on inner elements */}
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
