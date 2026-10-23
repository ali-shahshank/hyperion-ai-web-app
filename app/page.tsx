import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Box from '@mui/material/Box';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionHeading from '@/components/SectionHeading';
import FeatureCard from '@/components/FeatureCard';

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

      <Box
        component="section"
        aria-label="features"
        sx={{
          py: { xs: '40px', sm: '48px', md: '64px' },
          px: { xs: '16px', sm: '16px', md: '24px' },
          backgroundColor: '#f7f7f7',
        }}
      >
        <SectionHeading
          eyebrow="Features"
          heading="Supercharge your workflow"
          subheading="10x your productivity with enterprise grade AI tools."
        />
        <FeatureCard />
      </Box>

      <Footer />
    </>
  );
}
