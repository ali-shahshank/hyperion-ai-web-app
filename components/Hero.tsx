import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BasicChip from '../components/BasicChip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ButtonPrimary from './ButtonPrimary';
import ButtonPrimaryOutline from './ButtonPrimaryOutline';

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
        <BasicChip label="Inference Native Architecture" />
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '32px', sm: '40px', md: '48px' },
            textAlign: 'center',
            color: 'text.primary',
          }}
        >
          AI Productivity Platform
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
          The ultimate workspace for knowledge workers. One platform — endless
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
