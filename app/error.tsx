'use client';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonTertiary from '@/components/ButtonTertiary';

export default function Error({
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
          <Typography
            component="p"
            variant="overline"
            sx={{
              color: 'rgba(0,0,0,0.38)',
              letterSpacing: '0.2em',
            }}
          >
            Error {error.digest}
          </Typography>

          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 500, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Something went wrong.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(0,0,0,0.6)',
              maxWidth: 400,
              lineHeight: 1.7,
            }}
          >
            An unexpected error occurred. Our team has been notified. You can
            try again or return home.
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
              label="Go Home"
              href="/"
            />
          </Box>
        </Box>
      </Container>
    </main>
  );
}
