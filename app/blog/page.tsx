'use client';
import '../globals.css';
import Nav from '@/components/Nav';
import Typography from '@mui/material/Typography';

const page = () => {
  return (
    <>
      <Nav />
      <Typography
        variant="h1"
        component="h1"
      >
        Blog Page
      </Typography>
    </>
  );
};

export default page;
