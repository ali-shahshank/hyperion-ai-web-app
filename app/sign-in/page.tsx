'use client';
import { useState, useTransition } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import ButtonStartIcon from '@/components/ButtonStartIcon';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Window';
import ButtonSecondary from '@/components/ButtonSecondary';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Link from 'next/link';
import {
  signInWithEmail,
  signInWithGoogle,
  signInWithMicrosoft,
} from './actions';

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      setError(null);
      const result = await signInWithGoogle();
      if (result?.error) setError(result.error);
    });
  };

  const handleMicrosoftSignIn = () => {
    startTransition(async () => {
      setError(null);
      const result = await signInWithMicrosoft();
      if (result?.error) setError(result.error);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      const formData = new FormData(event.currentTarget);
      const result = await signInWithEmail(formData);
      if (result?.error) setError(result.error);
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
            minHeight: { xs: 'auto', md: 'auto' },
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
                <Typography
                  sx={{
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Sign In
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

              {/* OAuth Buttons */}
              <Stack
                spacing="12px"
                sx={{ width: '100%' }}
              >
                <ButtonStartIcon
                  fullWidth
                  icon={<GoogleIcon />}
                  label="Continue with Google"
                  onClick={handleGoogleSignIn}
                  disabled={isPending}
                />
                <ButtonStartIcon
                  fullWidth
                  icon={<MicrosoftIcon />}
                  label="Continue with Microsoft"
                  onClick={handleMicrosoftSignIn}
                  disabled={isPending}
                />
              </Stack>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <Divider sx={{ flex: 1 }} />
                <Typography
                  sx={{
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    fontWeight: 500,
                    letterSpacing: '0.46px',
                  }}
                >
                  OR
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>

              <Stack
                spacing="16px"
                sx={{ width: '100%' }}
              >
                <TextField
                  size="small"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="jdoe@example.com"
                  required
                  fullWidth
                />
                <TextField
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="********"
                  required
                  fullWidth
                />
                <Typography sx={{ fontSize: '14px', textAlign: 'right' }}>
                  <Link
                    href="/forgot-password"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </Stack>

              <ButtonSecondary
                type="submit"
                fullWidth
                size="large"
                loading={isPending}
                loadingPosition="start"
                label={isPending ? 'Signing in...' : 'Sign In'}
                disabled={isPending}
              />
            </Stack>

            <Typography
              sx={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                textAlign: 'center',
              }}
            >
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                style={{ fontWeight: 600, color: 'inherit' }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
