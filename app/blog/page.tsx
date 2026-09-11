import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'AI workflows, productivity strategies, and product updates from the Hyperion team.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Blog | Hyperion AI',
    description:
      'AI workflows, productivity strategies, and product updates from the Hyperion team.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <Box
        component="main"
        sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}
      >
        <Typography
          variant="h1"
          component="h1"
        >
          Blog
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
