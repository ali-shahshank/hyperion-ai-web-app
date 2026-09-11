import './globals.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Chip from '@mui/material/Chip';
import Nav from '@/components/Nav';
import ButtonSecondary from '@/components/ButtonSecondary';
import Card from '@/components/Card';

// Section heading component
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          color: 'var(--text-disabled)',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.46px',
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '28px', md: '32px' },
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: 'var(--text-secondary)',
          fontSize: { xs: '16px', md: '20px' },
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
}

// Primary page component
export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{ overflow: 'hidden' }}
    >
      <Nav />
      <Box
        component="section"
        sx={{
          pt: { xs: '40px', sm: '48', md: '64px' },
          px: { xs: '16px', sm: '16px', md: '24px' },
          pb: { xs: '24px', sm: '24px', md: '24px' },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pb: '24px',
          }}
        >
          <Chip
            label="Inference native architecture"
            variant="outlined"
            sx={{
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.46px',
              color: 'rgba(0,0,255,0.6)',
              borderColor: 'rgba(0,0,255,0.24)',
              bgcolor: 'rgba(0,0,255,0.06)',
              borderRadius: '24px',
            }}
          />

          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '32px', sm: '40px', md: '48px' },
                fontWeight: 400,
              }}
            >
              The Ultimate{' '}
              <Box
                component="span"
                sx={{ color: 'var(--accent-primary)' }}
              >
                AI Productivity Platform
              </Box>
            </Typography>
            <Typography
              sx={{
                color: 'var(--text-secondary)',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
              }}
            >
              AI workspace built for professionals. One platform — endless
              possibilities.
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={'12px'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <ButtonSecondary
              label={'Get Started'}
              href="/sign-up"
            />
          </Stack>
        </Stack>

        <Box
          sx={{
            height: { xs: '220px', sm: '360px', md: '460px' },
          }}
        >
          {' '}
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: 'var(--background-secondary)',
              border: '1px solid var(--stroke-dark)',
              borderRadius: '16px',
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
