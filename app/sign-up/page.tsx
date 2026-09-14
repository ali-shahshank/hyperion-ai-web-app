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
  signUpWithEmail,
  signUpWithGoogle,
  signUpWithMicrosoft,
} from './actions';

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignUp = () => {
    startTransition(async () => {
      setError(null);
      setMessage(null);
      const result = await signUpWithGoogle();
      if (result?.error) setError(result.error);
    });
  };

  const handleMicrosoftSignUp = () => {
    startTransition(async () => {
      setError(null);
      setMessage(null);
      const result = await signUpWithMicrosoft();
      if (result?.error) setError(result.error);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      setMessage(null);
      const formData = new FormData(event.currentTarget);
      const result = await signUpWithEmail(formData);
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
            minHeight: { xs: 'auto', md: '832px' },
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: '16px', sm: '24px' },
            pb: { xs: '40px', md: '40px' },
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
              px: '24px',
              py: '32px',
              bgcolor: 'var(--background-primary)',
              border: '1px solid var(--stroke-dark)',
              borderRadius: '24px',
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
                    fontSize: '28px',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Sign Up For Free!
                </Typography>
                <Typography
                  sx={{
                    mt: '16px',
                    color: 'var(--text-secondary)',
                    fontSize: '20px',
                    lineHeight: 'normal',
                  }}
                >
                  Please register for a new account.
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

              {/* OAuth Buttons */}
              <Stack
                spacing="12px"
                sx={{ width: '100%' }}
              >
                <ButtonStartIcon
                  fullWidth
                  icon={<GoogleIcon />}
                  label="Continue with Google"
                  onClick={handleGoogleSignUp}
                  disabled={isPending}
                />
                <ButtonStartIcon
                  fullWidth
                  icon={<MicrosoftIcon />}
                  label="Continue with Microsoft"
                  onClick={handleMicrosoftSignUp}
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
                    fontSize: '20px',
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
                  name="name"
                  label="Name"
                  placeholder="John Doe"
                  required
                  fullWidth
                />
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
              </Stack>

              <ButtonSecondary
                type="submit"
                fullWidth
                size="large"
                loading={isPending}
                loadingPosition="start"
                label={isPending ? 'Signing up...' : 'Sign Up'}
                disabled={isPending}
              />
            </Stack>

            <Typography
              sx={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.47,
                textAlign: 'center',
              }}
            >
              By continuing you agree to our{' '}
              <Link
                href="/privacy"
                style={{ fontWeight: 700, color: 'inherit' }}
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                href="/terms"
                style={{ fontWeight: 700, color: 'inherit' }}
              >
                Terms
              </Link>
            </Typography>

            <Typography
              sx={{ fontSize: '14px', color: 'var(--text-secondary)' }}
            >
              Already have an account?{' '}
              <Link
                href="/sign-in"
                style={{ fontWeight: 700, color: 'inherit' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>{' '}
    </>
  );
}
