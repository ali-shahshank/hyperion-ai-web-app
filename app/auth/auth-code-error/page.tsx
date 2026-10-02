import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ButtonSecondary from '@/components/ButtonSecondary';

export default function AuthCodeError() {
  return (
    <>
      <Nav />
      <Box sx={{ minHeight: '100vh', bgcolor: 'var(--white)' }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              textAlign: 'center',
              gap: 3,
            }}
          >
            <Typography
              component="p"
              variant="overline"
              sx={{ color: 'rgba(0,0,0,0.38)', letterSpacing: '0.2em' }}
            >
              Auth Error
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, color: 'var(--text-primary)' }}
            >
              Invalid or expired link.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'var(--text-secondary)', maxWidth: 360 }}
            >
              This link has expired or is no longer valid. Please request a new
              one.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <ButtonSecondary
                label="Sign In"
                href="/sign-in"
              />
              <ButtonSecondary
                label="Reset Password"
                href="/forgot-password"
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
