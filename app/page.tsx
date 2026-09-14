import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Chip from '@mui/material/Chip';
import Nav from '@/components/Nav';
import ButtonSecondary from '@/components/ButtonSecondary';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'The AI workspace built for how professionals actually work. Automate meetings, emails, and documents into structured action plans.',
  openGraph: {
    title: 'Hyperion AI — The Ultimate AI Productivity Platform',
    description: 'The AI workspace built for how professionals actually work.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <Box
        component="main"
        sx={{ height: '100vh', overflow: 'hidden' }}
      >
        <Box
          component="section"
          aria-label="Hero"
          sx={{
            pt: { xs: '40px', sm: '48px', md: '64px' },
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
                color: 'rgba(0,0,200,0.8)',
                borderColor: 'rgba(0,0,255,0.4)',
                bgcolor: 'rgba(0,0,255,0.06)',
                borderRadius: '24px',
              }}
            />

            <Stack
              sx={{
                gap: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h1"
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
                variant="h2"
                component="p"
                sx={{
                  color: 'var(--text-secondary)',
                  fontSize: { xs: '16px', sm: '20px', md: '24px' },
                  fontWeight: 400,
                }}
              >
                AI workspace built for professionals. One platform — endless
                possibilities.
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing="12px"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <ButtonSecondary
                label="Get Started"
                href="/sign-up"
              />
            </Stack>
          </Stack>

          {/* Hero image placeholder */}
          <Box sx={{ height: { xs: '220px', sm: '360px', md: '460px' } }}>
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                bgcolor: 'var(--background-secondary)',
                border: '1px solid var(--stroke-dark)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/placeholder-img.png"
                alt="placeholder image"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                loading="eager"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
