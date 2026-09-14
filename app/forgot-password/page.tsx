'use client';
import { useState, useTransition } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Link from 'next/link';
import ButtonSecondary from '@/components/ButtonSecondary';
import { resetPassword } from './actions';

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      setMessage(null);
      const formData = new FormData(event.currentTarget);
      const result = await resetPassword(formData);
      if (result?.error) setError(result.error);
      if (result?.message) setMessage(result.message);
    });
  };

  return (
    <>
      <Nav />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--white)',
          color: 'var(--text-primary)',
        }}
      >
        <Box
          component="main"
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: '16px', sm: '16px', md: '24px' },
            py: { xs: '40px', sm: '48px', md: '64px' },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: '400px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              p: '24px',
              bgcolor: 'var(--background-primary)',
              border: '1px solid var(--stroke-dark)',
              borderRadius: '16px',
              boxShadow:
                '0px 1px 5px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
            }}
          >
            <Stack
              spacing="24px"
              sx={{ width: '100%', alignItems: 'center' }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>
                  Reset Password
                </Typography>
                <Typography
                  sx={{
                    mt: '8px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Enter your email and we'll send you a reset link.
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{ width: '100%' }}
                >
                  {error}
                </Alert>
              )}
              {message && (
                <Alert
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  {message}
                </Alert>
              )}

              <TextField
                size="small"
                name="email"
                label="Email"
                type="email"
                placeholder="jdoe@example.com"
                required
                fullWidth
              />

              <ButtonSecondary
                type="submit"
                fullWidth
                size="large"
                loading={isPending}
                loadingPosition="start"
                label={isPending ? 'Sending...' : 'Send Reset Link'}
                disabled={isPending}
              />
            </Stack>

            <Typography
              sx={{ fontSize: '14px', color: 'var(--text-secondary)' }}
            >
              Remember your password?{' '}
              <Link
                href="/sign-in"
                style={{ fontWeight: 600, color: 'inherit' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
