'use client';
import React, { useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '@/app/theme/theme';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonTertiary from '@/components/ButtonTertiary';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    // [a11y] must include <html>/<body> — replaces root layout
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* [a11y] <main> landmark */}
            <main>
              <Container maxWidth="sm">
                <Box
                  sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: { xs: 2, md: 3 },
                    px: { xs: 2, sm: 4 },
                  }}
                >
                  {/* [a11y] status label — not a heading */}
                  <Typography
                    component="p"
                    variant="overline"
                    sx={{
                      color: 'rgba(0,0,0,0.38)',
                      letterSpacing: '0.2em',
                    }}
                  >
                    Critical Error {error.digest}
                  </Typography>

                  {/* [a11y] h1 — single, logical hierarchy */}
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                    }}
                  >
                    Application error.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(0,0,0,0.6)',
                      maxWidth: 400,
                      lineHeight: 1.7,
                    }}
                  >
                    A critical error occurred and the application could not
                    recover. Please try again or contact support if the issue
                    persists.
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2,
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    <ButtonSecondary
                      label={'Try Again'}
                      onClick={reset}
                    />
                    <ButtonTertiary
                      label={'Go Home'}
                      href="/"
                    />
                  </Box>
                </Box>
              </Container>
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
