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
import ButtonPrimaryOutline from './ButtonPrimaryOutline';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorScheme } from '@mui/material/styles';

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
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  // theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  // current mode
  const currentMode = mode === 'system' ? systemMode : mode;

  const toggleTheme = () => {
    setMode(currentMode === 'dark' ? 'light' : 'dark');
  };

  // supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) =>
      setUser(session?.user ?? null),
    );

    return () => subscription.unsubscribe();
  }, []);

  // handle sign-out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        p: 0,
        mb: 0,
        dropShadow: 'none',
        boxShadow: 'none',
        backgroundColor: 'background.paper',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ p: 0, m: 0, backgroundColor: 'background.paper' }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            m: 0,
            p: { xs: '16px', sm: '0px', md: '0px' },
            backgroundColor: 'background.paper',
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '8px',
              width: '300px',
            }}
          >
            <Image
              src="/logo-mark.png"
              alt="logo-mark image"
              height={24}
              width={24}
            />
            <Typography
              variant="h6"
              noWrap
              aria-label="Hyperion home"
              sx={{
                fontWeight: 500,
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Hyperion
            </Typography>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {pages.slice(1).map((page) => (
              <Button
                key={page.title}
                component={Link}
                href={page.link}
                sx={{
                  color: 'text.secondary',
                  letterSpacing: '1px',
                  '&:hover': { background: 'rgba(0,0,0,0.04)' },
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
            {/* Them toggle button */}
            <IconButton
              sx={{ color: 'text.primary' }}
              onClick={toggleTheme}
              disabled={!mounted || !currentMode}
              aria-label={
                mounted && currentMode === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {mounted && currentMode === 'dark' ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            {user ? (
              <>
                <ButtonPrimaryOutline
                  label="Start Chat"
                  href="/chat"
                />
                {/* <ButtonPrimaryOutline
                  label="Sign Out"
                  onClick={handleSignOut}
                /> */}
              </>
            ) : (
              <>
                {/* <ButtonStandard
                  label="Sign In"
                  href="/sign-in"
                /> */}
                <ButtonPrimaryOutline
                  label="Get Started"
                  href="/sign-up"
                />
              </>
            )}
          </Box>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {/* Theme toggle */}
            <IconButton
              onClick={toggleTheme}
              disabled={!mounted || !currentMode}
              aria-label={
                mounted && currentMode === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              // sx={{
              //   color: 'text.primary',
              // }}
            >
              {mounted && currentMode === 'dark' ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            {/* hanburger icon */}
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
