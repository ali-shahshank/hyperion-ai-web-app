'use client';
import { useState, useTransition, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import ButtonSecondary from '@/components/ButtonSecondary';
import { createClient } from '@/lib/supabase/client';
import { updatePassword } from './actions';

export default function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  useEffect(() => {
    // [auth] listen for PASSWORD_RECOVERY event per Supabase docs
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setVerified(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!verified) {
      setError('Invalid or expired reset link. Please request a new one.');
      return;
    }
    startTransition(async () => {
      setError(null);
      const formData = new FormData(event.currentTarget);
      if (formData.get('password') !== formData.get('confirm')) {
        setError('Passwords do not match.');
        return;
      }
      const result = await updatePassword(formData);
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
                  New Password
                </Typography>
                <Typography
                  sx={{
                    mt: '8px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Enter your new password below.
                </Typography>
              </Box>

              {/* [auth] show warning if recovery state not established */}
              {!verified && (
                <Alert
                  severity="warning"
                  sx={{ width: '100%' }}
                >
                  Waiting to verify your reset link...
                </Alert>
              )}

              {error && (
                <Alert
                  severity="error"
                  sx={{ width: '100%' }}
                >
                  {error}
                </Alert>
              )}

              <Stack
                spacing="16px"
                sx={{ width: '100%' }}
              >
                <TextField
                  size="small"
                  name="password"
                  label="New Password"
                  type="password"
                  placeholder="********"
                  required
                  fullWidth
                  disabled={!verified}
                />
                <TextField
                  size="small"
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  placeholder="********"
                  required
                  fullWidth
                  disabled={!verified}
                />
              </Stack>

              <ButtonSecondary
                type="submit"
                fullWidth
                size="large"
                loading={isPending}
                loadingPosition="start"
                label={isPending ? 'Updating...' : 'Update Password'}
                disabled={isPending || !verified}
              />
            </Stack>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
