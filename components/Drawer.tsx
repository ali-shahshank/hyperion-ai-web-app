'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import type { Page } from './Nav';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import ButtonTertiary from './ButtonTertiary';

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  pages: Page[];
  user: User | null;
  onSignOut: () => void;
}

export default function AppDrawer({
  open,
  onClose,
  pages,
  user,
  onSignOut,
}: AppDrawerProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 250,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'var(--background-primary)',
        }}
        onClick={onClose}
        onKeyDown={handleKeyDown}
      >
        {/* Nav Links */}
        <List sx={{ flexGrow: 1 }}>
          {pages.map(({ title, Icon, link }) => (
            <ListItem
              key={title}
              disablePadding
            >
              <ListItemButton
                component={Link}
                href={link}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Auth Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
          {user ? (
            <>
              <ButtonPrimary
                fullWidth
                label="Chat Now"
                href="/chat"
              />
              <ButtonTertiary
                fullWidth
                label="Sign Out"
                onClick={onSignOut}
              />
            </>
          ) : (
            <>
              <ButtonPrimary
                fullWidth
                label="Chat Now"
                href="/sign-in"
              />
              <ButtonTertiary
                fullWidth
                label="Sign Up"
                href="/sign-up"
              />
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
