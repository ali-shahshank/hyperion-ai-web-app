import Box from '@mui/material/Box';
import Nav from '@/components/Nav';
import Typography from '@mui/material/Typography';
export default function About() {
  return (
    <>
      <Nav />
      <Box>
        <Typography
          variant="h4"
          component="h1"
        >
          About Page
        </Typography>
      </Box>
    </>
  );
}
