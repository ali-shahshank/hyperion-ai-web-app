'use client';
import { useState, useTransition } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { createClient } from '@/utils/supabase/client';

const googleMark =
  'https://www.figma.com/api/mcp/asset/4fa45bec-ecff-4e86-a2be-5f5cd9a7fa25.svg';

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignUp = () => {
    startTransition(async () => {
      setError(null);
      setMessage(null);
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/api/auth/callback` },
      });
      if (authError) setError(authError.message);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      setMessage(null);
      const formData = new FormData(event.currentTarget);
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: String(formData.get('email')),
        password: String(formData.get('password')),
        options: { data: { full_name: String(formData.get('name')) } },
      });
      if (authError) {
        setError(authError.message);
      } else {
        setMessage('Check your email to confirm your account.');
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--white)',
        color: 'var(--text-primary)',
      }}
    >
      <Nav />
      <Box
        component="main"
        sx={{
          minHeight: { xs: 'auto', md: '832px' },
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: '16px', sm: '24px' },
          pt: { xs: '0px', md: '0px' },
          pb: { xs: '40px', md: '40px' },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '460px',
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
                sx={{ fontSize: '28px', fontWeight: 500, lineHeight: 'normal' }}
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

            <Button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isPending}
              variant="contained"
              sx={{
                width: '100%',
                height: '56px',
                borderRadius: '100px',
                bgcolor: 'var(--white)',
                color: 'var(--background-secondary)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.46px',
                boxShadow:
                  '0px 1px 5px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: 'var(--white)', opacity: 0.7 },
              }}
            >
              <Box
                component="img"
                src={googleMark}
                alt=""
                sx={{ width: '20px', height: '20px', mr: '8px' }}
              />
              CONTINUE WITH GOOGLE
            </Button>

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
                name="name"
                label="Name"
                placeholder="John Doe"
                required
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                placeholder="jdoe@example.com"
                required
                fullWidth
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                placeholder="********"
                required
                fullWidth
              />
            </Stack>

            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              sx={{
                width: '100%',
                height: '56px',
                borderRadius: '100px',
                bgcolor: 'var(--background-secondary)',
                color: 'var(--white)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.46px',
                '&:hover': {
                  bgcolor: 'var(--background-secondary)',
                  opacity: 0.7,
                },
              }}
            >
              {isPending ? 'SIGNING UP...' : 'SIGN UP'}
            </Button>
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
            <Box
              component="span"
              sx={{ fontWeight: 700 }}
            >
              Privacy Policy
            </Box>{' '}
            and{' '}
            <Box
              component="span"
              sx={{ fontWeight: 700 }}
            >
              Terms
            </Box>
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
