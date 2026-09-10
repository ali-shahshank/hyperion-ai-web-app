'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppDrawer from './Drawer';
import ButtonPrimary from './ButtonPrimary';
import ButtonTertiary from './ButtonTertiary';

export interface Page {
  title: string;
  Icon: React.ElementType;
  link: string;
}

const pages: Page[] = [
  { title: 'Product', Icon: AutoAwesomeIcon, link: '/product' },
  { title: 'Blog', Icon: ArticleIcon, link: '/blog' },
  { title: 'Resources', Icon: LibraryBooksIcon, link: '/resources' },
  { title: 'Pricing', Icon: CheckCircleIcon, link: '/pricing' },
];

export default function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <AppBar
      position="relative"
      sx={{
        p: 0,
        mb: 0,
        bgcolor: '#ffffff',
        boxShadow: 'none',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ p: 0, m: 0 }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            m: 0,
            p: { xs: '16px', sm: '0px', md: '0px' },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            aria-label="Hyperion home"
            sx={{
              fontWeight: 500,
              color: 'black',
              textDecoration: 'none',
              width: '300px',
            }}
          >
            Hyperion
          </Typography>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                href={page.link}
                sx={{
                  fontSize: '16px',
                  textTransform: 'none',
                  fontWeight: 400,
                  color: 'black',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Desktop Auth Buttons */}
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
                width: '300px',
                justifyContent: 'end',
                alignItems: 'end',
              },
              gap: 1,
            }}
          >
            <ButtonTertiary
              label={'Sign-in'}
              href={'sign-in'}
            />
            <ButtonPrimary
              label={'Get Started'}
              href={'sign-up'}
            />
          </Box>

          {/* Mobile Hamburger — FIX: hidden on desktop */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </IconButton>
            <AppDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              pages={pages}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
