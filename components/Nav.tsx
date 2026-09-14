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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import AppDrawer from './Drawer';
import ButtonPrimary from './ButtonPrimary';
import ButtonStandard from './ButtonStandard';
import ButtonTertiary from './ButtonTertiary';

export interface Page {
  title: string;
  Icon: React.ElementType;
  link: string;
}

const pages: Page[] = [
  { title: 'Home', Icon: HomeIcon, link: '/' },
  { title: 'Product', Icon: AutoAwesomeIcon, link: '/product' },
  { title: 'Blog', Icon: ArticleIcon, link: '/blog' },
  { title: 'Pricing', Icon: CheckCircleIcon, link: '/pricing' },
];

export default function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // [auth] get initial session
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // [auth] listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) =>
      setUser(session?.user ?? null),
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <AppBar
      position="relative"
      sx={{
        p: 0,
        mb: 0,
        bgcolor: 'transparent',
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
            component={Link}
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
            {pages.slice(1).map((page) => (
              <Button
                key={page.title}
                component={Link}
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
              display: { xs: 'none', md: 'flex' },
              width: '300px',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {user ? (
              <>
                <ButtonStandard
                  label="Chat Now"
                  href="/chat"
                />
                <ButtonTertiary
                  label="Sign Out"
                  onClick={handleSignOut}
                />
              </>
            ) : (
              <>
                <ButtonStandard
                  label="Sign In"
                  href="/sign-in"
                />
                <ButtonPrimary
                  label="Get Started"
                  href="/sign-up"
                />
              </>
            )}
          </Box>

          {/* Mobile Hamburger */}
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
              user={user}
              onSignOut={handleSignOut}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
