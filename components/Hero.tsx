import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ButtonPrimary from './ButtonPrimary';

export default function Hero() {
  return (
    <Box
      component="section"
      aria-label="Hero"
      sx={{
        pt: { xs: '96px', sm: '120px', md: '128px' },
        px: { xs: '16px', sm: '16px', md: '24px' },
        pb: { xs: '24px', sm: '24px', md: '24px' },
        backgroundColor: 'background.paper',
      }}
    >
      <Stack
        sx={{
          gap: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: '32px', sm: '40px', md: '48px' },
            textAlign: 'center',
            color: 'text.primary',
          }}
        >
          The Ultimate AI <Box component="span">Productivity Platform</Box>
        </Typography>
        <Typography
          variant="h2"
          component="p"
          sx={{
            fontSize: { xs: '16px', sm: '20px', md: '24px' },
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          AI workspace built for professionals. One platform — endless
          possibilities.
        </Typography>
        <ButtonPrimary
          label="Get Started"
          href="/sign-up"
        />
      </Stack>
      {/* Hero image placeholder */}
      <Box
        sx={{
          px: { xs: '0px', sm: '0px', md: '64px' },
          py: { xs: '24px', sm: '24px', md: '24px' },
          height: { xs: '240px', sm: '360px', md: '420px' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/simple.png"
            alt="placeholder image"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            loading="eager"
          />
        </Box>
      </Box>
    </Box>
  );
}
