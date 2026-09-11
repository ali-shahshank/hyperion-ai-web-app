'use client';
import '../globals.css';
import Nav from '@/components/Nav';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />

      <Typography variant="h1">Product Page</Typography>

      <Footer />
    </>
  );
}
