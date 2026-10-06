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
          pb: { xs: '32px', sm: '40px', md: '48px' },
        }}
      >
        <Typography
          variant="body1"
          component="h6"
          sx={{
            fontSize: { xs: '12px', sm: '14px', md: '14px' },
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
            fontSize: { xs: '24px', sm: '24px', md: '28px' },
            color: 'var(--text-primary)',
            textTransform: 'none',
            textAlign: 'center',
          }}
        >
          {heading}
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            color: 'var(--text-secondary)',
            fontSize: { xs: '16px', sm: '16px', md: '20px' },
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
