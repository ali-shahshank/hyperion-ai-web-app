import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Nav from '@/components/Nav';

export default function Contact() {
  return (
    <>
      <Nav />
      <Box>
        <Typography
          variant="h4"
          component="h1"
        >
          Contact Page
        </Typography>
      </Box>
    </>
  );
}
