import './globals.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import Chip from '@mui/material/Chip';
import Nav from '@/components/Nav';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonTertiary from '@/components/ButtonTertiary';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import TableRowsIcon from '@mui/icons-material/TableRows';
import RepeatIcon from '@mui/icons-material/Repeat';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import Card from '@/components/Card';
import ButtonPrimary from './../components/ButtonPrimary';

const CardData = [
  {
    icon: TextSnippetIcon,
    title: 'Manage Documents',
    features: [
      'Compose accurate, on-brand documents',
      'Store and manage documents',
      'Summarize, edit and refine content',
    ],
  },
  {
    icon: EmailIcon,
    title: 'Streamline your Inbox',
    features: [
      'Summarize emails in seconds',
      'Gain valuable insight at a glance',
      'Edit, delete and draft new responses',
    ],
  },
  {
    icon: GroupsIcon,
    title: 'Manage Documents',
    features: [
      'Auto-summarize calls and live sessions.',
      'Document key insights and decision.',
      'Generate clear, shareable action items.',
    ],
  },
  {
    icon: TableRowsIcon,
    title: 'Gain Valuable Insight',
    features: [
      'Extract data from Docs and Images',
      'Restructure and organize data.',
      'Seamlessly analyze and export data',
    ],
  },
  {
    icon: RepeatIcon,
    title: 'Automate Repetitive Tasks',
    features: [
      'Convert emails into action items',
      'Turn meeting notes into task workflows',
      'Eliminate time-consuming routines',
    ],
  },
  {
    icon: DeviceHubIcon,
    title: 'Connect Apps',
    features: [
      'Recap meetings from Zoom',
      'Document key insights and decision',
      'Export and store data in Google Suite',
    ],
  },
];

// Section heading component
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          color: 'var(--text-disabled)',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.46px',
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '28px', md: '32px' },
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: 'var(--text-secondary)',
          fontSize: { xs: '16px', md: '20px' },
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
}

// Primary page component
export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{ overflow: 'hidden' }}
    >
      <Nav />
      <Box
        component="section"
        sx={{
          pt: { xs: '40px', sm: '48', md: '64px' },
          px: { xs: '16px', sm: '16px', md: '24px' },
          pb: { xs: '24px', sm: '24px', md: '24px' },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pb: '24px',
          }}
        >
          <Chip
            label="Inference native architecture"
            variant="outlined"
            sx={{
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.46px',
              color: 'rgba(0,0,255,0.6)',
              borderColor: 'rgba(0,0,255,0.24)',
              bgcolor: 'rgba(0,0,255,0.06)',
              borderRadius: '24px',
            }}
          />

          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '32px', sm: '40px', md: '48px' },
                fontWeight: 400,
              }}
            >
              The Ultimate{' '}
              <Box
                component="span"
                sx={{ color: 'var(--accent-primary)' }}
              >
                AI Productivity Platform
              </Box>
            </Typography>
            <Typography
              sx={{
                color: 'var(--text-secondary)',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
              }}
            >
              AI workspace built for professionals. One platform — endless
              possibilities.
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={'12px'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <ButtonSecondary
              label={'Get Started'}
              href="/sign-up"
            />
          </Stack>
        </Stack>

        <Box
          sx={{
            height: { xs: '220px', sm: '360px', md: '460px' },
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: 'var(--background-secondary)',
              border: '1px solid var(--stroke-dark)',
              borderRadius: '16px',
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
