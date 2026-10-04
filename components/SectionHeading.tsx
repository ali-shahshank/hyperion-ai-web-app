'use client';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const SectionHeading = ({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
}) => {
  return (
    <>
      <Stack
        sx={{
          px: { xs: '16px', sm: '16px', md: '24px' },
          py: { xs: '40px', sm: '48px', md: '64px' },
        }}
      >
        <Typography
          variant="body1"
          component="h6"
          sx={{
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'var(--text-disabled)',
          }}
        >
          {eyebrow}
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: { xs: '24px', sm: '28px', md: '32px' },
            color: 'var(--text-primary)',
            textTransform: 'none',
            textAlign: 'center',
          }}
        >
          {heading}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h1"
          sx={{
            color: 'var(--text-secondary)',
            fontSize: { xs: '16px', sm: '20px', md: '24px' },
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          {subheading}
        </Typography>
      </Stack>
    </>
  );
};

export default SectionHeading;
