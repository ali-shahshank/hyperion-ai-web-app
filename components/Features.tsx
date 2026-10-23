import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SectionHeading from './SectionHeading';
import FeatureCard from '@/components/FeatureCard';

export default function Features() {
  return (
    <Box>
      <SectionHeading
        eyebrow="Features"
        heading="Supercharge your workflow"
        subheading="10x your productivity with enterprise grade AI tools."
      />
      <FeatureCard />
    </Box>
  );
}
