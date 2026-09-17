import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSecondary from '@/components/ButtonSecondary';

export default function AuthCodeError() {
  return (
    <Box
      sx={{
        m: '0px',
        px: { xs: '16px', sm: '16px', md: '24px' },
        py: { xs: '40px', sm: '48px', md: '64px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Typography
        variant="h5"
        component="h5"
      >
        Authentication Error
      </Typography>
      <Typography variant="body1">Please try again</Typography>
      <ButtonSecondary
        label="Try Again"
        href="/sign-up"
      />
    </Box>
  );
}
