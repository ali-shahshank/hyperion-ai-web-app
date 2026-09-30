'use client';
import '../globals.css';
import Nav from '@/components/Nav';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import ButtonSecondary from '@/components/ButtonSecondary';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <Box
        sx={{
          gap: '24px',
          m: '0px',
          pt: { xs: '40px', sm: '48px', md: '64px' },
          px: { xs: '16px', sm: '16px', md: '24px' },
          pb: { xs: '40px', sm: '48px', md: '64px' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          sx={{
            m: '0px',
            pt: { xs: '0px', sm: '0px', md: '0px' },
            px: { xs: '0px', sm: '0px', md: '0px' },
            pb: { xs: '0px', sm: '0px', md: '0px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography variant="h4">Product page heading</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '400',
              color: 'var(--text-secondary)',
              mb: '24px',
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Typography>
          <ButtonSecondary
            label="Get Started"
            href="/sign-up"
          />
        </Container>
        <Container
          sx={{
            width: '100%',
            height: '100%',
            pt: { xs: '0px', sm: '0px', md: '0px' },
            px: { xs: '0px', sm: '0px', md: '0px' },
            pb: { xs: '0px', sm: '0px', md: '0px' },
          }}
        >
          <Image
            src="/placeholder-img.png"
            alt="placeholder image"
            height={800}
            width={800}
          />
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'blue',
          gap: '24px',
          m: '0px',
          pt: { xs: '40px', sm: '48px', md: '64px' },
          px: { xs: '16px', sm: '16px', md: '24px' },
          pb: { xs: '40px', sm: '48px', md: '64px' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            backgroundColor: 'orange',
            m: '0px',
            p: '0px',
            width: '100%',
            height: '160px',
          }}
        ></Stack>
      </Box>

      {/* <Footer /> */}
      <Footer />
    </>
  );
}
