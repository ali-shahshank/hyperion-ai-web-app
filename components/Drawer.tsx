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
import type { Page } from './Nav'; // Import shared type

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  pages: Page[];
}

export default function AppDrawer({ open, onClose, pages }: AppDrawerProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') onClose(); // Only close on Escape
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
        }}
        role="presentation"
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
              <ListItemButton href={link}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Auth Buttons — FIX: moved inside flex parent */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
          <Button
            href="/sign-in"
            variant="text"
            fullWidth
            sx={{
              color: 'black',
              borderRadius: 6,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
            }}
          >
            Sign In
          </Button>
          <Button
            href="sign-up"
            variant="outlined"
            fullWidth
            sx={{
              color: 'black',
              borderColor: 'black',
              borderRadius: 6,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
