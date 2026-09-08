'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const productLinks = [
  { name: 'Product', icon: '', href: '/product' },
  { name: 'Blog', icon: '', href: '/blog' },
  { name: 'Resources', icon: '', href: '/resources' },
  { name: 'Affiliates', icon: '', href: 'affiliates' },
];
const companyLinks = [
  { name: 'About', icon: '', href: '/about' },
  { name: 'Contact', icon: '', href: '/contact' },
  { name: 'FAQ', icon: '', href: '/faq' },
  { name: 'Sign Up', icon: '', href: 'sign-up' },
];

function FooterLinks({
  links,
}: {
  links: { name: string; icon: string; href: string }[];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        gap: '24px',
      }}
    >
      {links.map((link) => (
        <Typography
          key={link.name}
          component="a"
          href={link.href}
          sx={{
            color: 'var(--text-light-secondary)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 'normal',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              opacity: 0.7,
              transition: 'opacity 0.3s ease-in-out',
            },
          }}
        >
          {link.name}
        </Typography>
      ))}
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-start' },
        justifyContent: 'center',
        gap: '40px',
        overflow: 'hidden',
        px: { xs: '16px', sm: '24px' },
        pt: '32px',
        pb: '24px',
        bgcolor: 'var(--black)',
      }}
    >
      <Box
        component="img"
        src="/atlas-logo-white.png"
        alt="Atlas AI"
        sx={{ width: '108px', height: '24px', objectFit: 'contain' }}
      />

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: { xs: '16px', sm: '24px' },
        }}
      >
        <Box
          component="nav"
          aria-label="Footer navigation"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'space-between' },
            gap: { xs: '16px', sm: '24px' },
          }}
        >
          <FooterLinks links={productLinks} />
          <FooterLinks links={companyLinks} />
        </Box>

        <Box
          sx={{
            width: '100%',
            height: '2px',
            flexShrink: 0,
            bgcolor: 'var(--text-light-secondary)',
          }}
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: '16px', sm: '24px' },
          }}
        >
          <Typography
            sx={{
              color: 'var(--text-light-secondary)',
              fontSize: { xs: '8px', sm: '12px', md: '12px' },
              fontWeight: 400,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            All rights reserved © Atlas AI 2026
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{
              color: 'var(--text-light-secondary)',
              fontSize: { xs: '8px', sm: '12px', md: '12px' },
              fontWeight: 400,
              lineHeight: 1,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            Privacy Policy &amp; Terms and Conditions
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
