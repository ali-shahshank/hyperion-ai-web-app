'use client';
import '../globals.css';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Nav from '@/components/Nav';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';
import HelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { useState, useTransition } from 'react';
import { signInWithEmail, signInWithGoogle } from './actions';
import Alert from '@mui/material/Alert';

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const theme = useTheme();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signInWithEmail(formData);
      if (result?.error) setError(result.error);
    });
  };

  const handleGoogle = () => {
    startTransition(async () => {
      const result = await signInWithGoogle();
      if (result?.error) setError(result.error);
    });
  };

  {
    /* Password Form-field Visibility */
  }
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Nav />
      <Box
        sx={{
          p: { xs: 2, sm: 2, md: 3 },
          m: 0,
          gap: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          height: '728px',
          width: '100%',
        }}
      >
        {/* Sign In Form */}
        <Container
          sx={{
            height: 'auto',
            width: { xs: '100%', md: '400px', lg: '460px' },
            m: 0,
            p: 3,
            bgcolor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              gap: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
            }}
          >
            <Stack
              sx={{
                m: 0,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              spacing={2}
            >
              <Typography variant="h4">Sign In</Typography>
              <Typography
                variant="h6"
                sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 400 }}
              >
                Please sign-in to your account.
              </Typography>
            </Stack>
            {error && (
              <Alert
                severity="error"
                sx={{ width: '100%' }}
              >
                {error}
              </Alert>
            )}
            <Stack
              sx={{ width: '100%' }}
              spacing={2}
            >
              <Button
                variant="outlined"
                onClick={handleGoogle}
                disabled={isPending}
                sx={{
                  borderRadius: 10,
                  height: '48px',
                  width: '100%',
                  borderColor: 'black',
                  color: 'black',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
                }}
                size="large"
              >
                Continue With Google
              </Button>
              <Button
                variant="contained"
                disabled={isPending}
                sx={{
                  backgroundColor: 'black',
                  borderRadius: 10,
                  height: '48px',
                  width: '100%',
                  borderColor: 'black',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,3)' },
                }}
                size="large"
              >
                Continue With Apple
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: 'space-between',
                }}
              >
                <Divider sx={{ borderColor: 'black' }} /> OR <Divider />
              </Box>
            </Stack>
            <Stack
              sx={{ width: '100%' }}
              spacing={2}
            >
              <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder="jdoe@example.com"
                disabled={isPending}
              />
              {/* Password Field */}
              <FormControl
                sx={{ m: 1, width: '100%' }}
                variant="outlined"
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  disabled={isPending}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <HelperText>
                  <a
                    href="#"
                    style={{
                      textDecoration: 'underline',
                      color: 'inherit',
                    }}
                  >
                    Forgot password?
                  </a>
                </HelperText>
              </FormControl>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 10,
                height: '48px',
                width: '100%',
                bgcolor: 'black',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.8)',
                },
              }}
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Don't have an account? <a href="#">Sign up</a>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
