'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '@/lib/actions';

const SIDEBAR_KEY = 'hyperion_sidebar_open';
const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 270;

interface Chat {
  id: string;
  title: string;
}

interface ChatSidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatarUrl?: string;
  recentChats?: Chat[];
}

const navItems = [
  { icon: <EditIcon fontSize="small" />, label: 'New Chat', href: '/chat' },
  {
    icon: <SearchIcon fontSize="small" />,
    label: 'Search',
    href: '/chat/search',
  },
  {
    icon: <DescriptionIcon fontSize="small" />,
    label: 'Documents',
    href: '/chat/documents',
  },
  {
    icon: <ImageIcon fontSize="small" />,
    label: 'Images',
    href: '/chat/images',
  },
  {
    icon: <AccountTreeIcon fontSize="small" />,
    label: 'Connect',
    href: '/chat/connect',
  },
  {
    icon: <DeleteIcon fontSize="small" />,
    label: 'Trash',
    href: '/chat/trash',
  },
];

export default function ChatSidebar({
  userName = 'User',
  userEmail = '',
  userAvatarUrl,
  recentChats = [],
}: ChatSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      if (stored !== null) setOpen(stored === 'true');
    } catch {}
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggleSidebar = () => {
    const next = !open;
    setOpen(next);
    try {
      localStorage.setItem(SIDEBAR_KEY, String(next));
    } catch {}
  };

  const handleNav = (href: string) => {
    router.push(href);
    if (isMobile) setMobileOpen(false);
  };

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sidebarContent = (expanded: boolean) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        bgcolor: 'var(--background-primary, #F5F5F5)',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        borderRight: '1px solid var(--stroke-dark, #E0E0E0)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'space-between' : 'center',
          px: expanded ? 2 : 0,
          py: 1.5,
          minHeight: 56,
        }}
      >
        {expanded ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Compass logo placeholder */}
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'var(--brand-primary, #1A1A1A)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              ></Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary, #1A1A1A)',
                  letterSpacing: '0.02em',
                }}
              >
                Hyperion
              </Typography>
            </Box>
            <Tooltip
              title="Collapse"
              placement="right"
            >
              <IconButton
                onClick={toggleSidebar}
                size="small"
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip
            title="Expand"
            placement="right"
          >
            <IconButton
              onClick={toggleSidebar}
              size="small"
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider />

      {/* Nav Items */}
      <Box sx={{ flex: 1, py: 1, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Tooltip
              key={item.href}
              title={expanded ? '' : item.label}
              placement="right"
            >
              <Box
                onClick={() => handleNav(item.href)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: expanded ? 1.5 : 0,
                  justifyContent: expanded ? 'flex-start' : 'center',
                  px: expanded ? 2 : 0,
                  py: 1,
                  mx: expanded ? 1 : 0,
                  borderRadius: expanded ? 1.5 : 0,
                  cursor: 'pointer',
                  bgcolor: active
                    ? 'var(--stroke-dark, #E8E8E8)'
                    : 'transparent',
                  color: active
                    ? 'var(--text-primary, #1A1A1A)'
                    : 'var(--text-secondary, #666)',
                  '&:hover': {
                    bgcolor: 'var(--stroke-dark, #E8E8E8)',
                    color: 'var(--text-primary, #1A1A1A)',
                  },
                  transition: 'background-color 0.15s',
                  minHeight: 40,
                }}
              >
                {item.icon}
                {expanded && (
                  <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}

        {/* Recent Chats */}
        {expanded && recentChats.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Divider sx={{ mx: 2, mb: 1 }} />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary, #888)',
                px: 3,
                py: 0.5,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Recent
            </Typography>
            {recentChats.slice(0, 6).map((chat) => (
              <Box
                key={chat.id}
                onClick={() => handleNav(`/chat/${chat.id}`)}
                sx={{
                  px: 3,
                  py: 0.75,
                  mx: 1,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'var(--stroke-dark, #E8E8E8)' },
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    fontSize: 13,
                    color: 'var(--text-secondary, #555)',
                    maxWidth: 200,
                  }}
                >
                  {chat.title}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* User Card */}
      <Divider />
      <Box
        sx={{
          p: expanded ? 1.5 : 0.5,
          display: 'flex',
          justifyContent: expanded ? 'flex-start' : 'center',
        }}
      >
        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            borderRadius: 1.5,
            px: expanded ? 1 : 0,
            py: 0.5,
            width: expanded ? '100%' : 'auto',
            '&:hover': { bgcolor: 'var(--stroke-dark, #E8E8E8)' },
          }}
        >
          <Avatar
            src={userAvatarUrl}
            sx={{
              width: 32,
              height: 32,
              fontSize: 13,
              fontWeight: 600,
              bgcolor: 'var(--brand-primary, #1565C0)',
              flexShrink: 0,
            }}
          >
            {initials}
          </Avatar>
          {expanded && (
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-primary, #1A1A1A)',
                }}
              >
                {userName}
              </Typography>
              <Typography
                noWrap
                sx={{ fontSize: 11, color: 'var(--text-secondary, #888)' }}
              >
                {userEmail}
              </Typography>
            </Box>
          )}
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          slotProps={{ paper: { sx: { minWidth: 180 } } }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              router.push('/chat/settings');
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">Settings</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              signOut();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">Sign Out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 1100,
          }}
        >
          <IconButton
            onClick={() => setMobileOpen(true)}
            size="small"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100vw',
              maxWidth: 320,
              boxSizing: 'border-box',
            },
          }}
        >
          {sidebarContent(true)}
        </Drawer>
      </>
    );
  }

  return sidebarContent(open);
}
