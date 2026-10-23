import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Box from '@mui/material/Box';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Features from '@/components/Features';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'The AI workspace built for how professionals actually work. Automate meetings, emails, and documents into structured action plans.',
  openGraph: {
    title: 'Hyperion AI — The Ultimate AI Productivity Platform',
    description: 'The AI workspace built for how professionals actually work.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
