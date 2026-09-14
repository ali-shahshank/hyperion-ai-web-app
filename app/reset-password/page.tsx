'use client';
import { useState, useTransition } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import ButtonSecondary from '@/components/ButtonSecondary';
import { updatePassword } from './actions';

export default function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
                />
                <TextField
                  size="small"
                  name="confirm"
                  label="Confirm Password"
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
                label={isPending ? 'Updating...' : 'Update Password'}
                disabled={isPending}
              />
            </Stack>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
