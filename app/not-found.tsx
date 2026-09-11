import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ButtonSecondary from '@/components/ButtonSecondary';

export default function NotFound() {
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
            404
          </Typography>

          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 500, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Page not found.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(0,0,0,0.6)',
              maxWidth: 400,
              lineHeight: 1.7,
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <ButtonSecondary
            label={'Go Home'}
            href="/"
          />
        </Box>
      </Container>
    </main>
  );
}
