'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '@/lib/actions';
import ChatSearchModal from '@/components/ChatSearchModal';

const SIDEBAR_KEY = 'hyperion_sidebar_open';
const drawerWidth = 248;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  '& .MuiListSubheader-root': {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    lineHeight: '2rem',
    paddingLeft: 16,
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

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
  { icon: <EditIcon fontSize="medium" />, label: 'New Chat', href: '/chat' },
  { icon: <SearchIcon fontSize="medium" />, label: 'Search', href: '' },
  {
    icon: <DescriptionIcon fontSize="medium" />,
    label: 'Documents',
    href: '/chat/documents',
  },
  {
    icon: <ImageIcon fontSize="medium" />,
    label: 'Images',
    href: '/chat/images',
  },
  {
    icon: <AccountTreeIcon fontSize="medium" />,
    label: 'Connect',
    href: '/chat/connect',
  },
  {
    icon: <DeleteIcon fontSize="medium" />,
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
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Restore sidebar open state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      if (stored !== null) setOpen(stored === 'true');
    } catch {}
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    try {
      localStorage.setItem(SIDEBAR_KEY, 'true');
    } catch {}
  };

  const handleDrawerClose = () => {
    setOpen(false);
    try {
      localStorage.setItem(SIDEBAR_KEY, 'false');
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

  const drawerContent = (expanded = open) => (
    <>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'space-between' : 'center',
          p: 1,
        }}
      >
        {expanded && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 0.5 }}>
            <Image
              src="/logo-mark.png"
              alt="logo-mark"
              height={24}
              width={24}
            />
          </Box>
        )}
        <Tooltip
          title={expanded ? 'Collapse' : 'Expand'}
          placement="right"
        >
          <IconButton
            onClick={expanded ? handleDrawerClose : handleDrawerOpen}
            size="small"
            aria-label={expanded ? 'close drawer' : 'open drawer'}
          >
            {expanded ? (
              theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Nav Items */}
      <List sx={{ py: 1 }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <ListItem
              key={item.label}
              disablePadding
              sx={{ display: 'block' }}
            >
              <Tooltip
                title={expanded ? '' : item.label}
                placement="right"
                arrow
              >
                <ListItemButton
                  selected={active}
                  onClick={() => {
                    if (item.label === 'Search') {
                      setSearchOpen(true);
                      return;
                    }
                    router.push(item.href);
                  }}
                  sx={[
                    { m: 0, py: '4px' },
                    expanded
                      ? { justifyContent: 'initial' }
                      : { justifyContent: 'center' },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: 'center', px: 1 },
                      expanded ? { mr: 1.5 } : { mr: 0 },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={[expanded ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 1, my: 1 }} />

      {/* Recent Chats */}
      <List
        sx={{
          display: expanded ? 'flex' : 'none',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        subheader={expanded && <ListSubheader>Recent Chats</ListSubheader>}
      >
        {recentChats.length > 0 && (
          <>
            {recentChats.slice(0, 6).map((chat) => {
              const chatActive = pathname === `/chat/${chat.id}`;
              return (
                <ListItem
                  key={chat.id}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <Tooltip
                    title={expanded ? '' : chat.title}
                    placement="right"
                    arrow
                  >
                    <ListItemButton
                      selected={chatActive}
                      onClick={() => handleNav(`/chat/${chat.id}`)}
                      sx={[
                        { py: 0 },
                        expanded
                          ? { justifyContent: 'initial' }
                          : { justifyContent: 'center' },
                      ]}
                    >
                      <ListItemText
                        primary={chat.title}
                        slotProps={{
                          primary: {
                            noWrap: true,
                            sx: { fontSize: 14, color: 'text.secondary' },
                          },
                        }}
                        sx={[expanded ? { opacity: 1 } : { opacity: 0 }]}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </>
        )}
      </List>

      {/* User Card */}
      <Box
        sx={{
          mt: 'auto',
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: expanded ? 'flex-start' : 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Tooltip
          title={expanded ? '' : userName}
          placement="right"
          arrow
        >
          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              border: expanded ? '1px solid' : 'none',
              borderColor: expanded ? 'divider' : 'transparent',
              borderRadius: 1.5,
              p: expanded ? 1 : 0,
              width: expanded ? '100%' : 'auto',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Avatar
              src={userAvatarUrl}
              sx={{
                width: 32,
                height: 32,
                fontSize: 13,
                fontWeight: 600,
                bgcolor: 'primary.main',
                flexShrink: 0,
              }}
            >
              {initials}
            </Avatar>
            {expanded && (
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}
                >
                  {userName}
                </Typography>
                <Typography
                  noWrap
                  sx={{ fontSize: 14, color: 'text.secondary' }}
                >
                  {userEmail}
                </Typography>
              </Box>
            )}
          </Box>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={
            expanded
              ? { vertical: 'top', horizontal: 'left' }
              : { vertical: 'top', horizontal: 'right' }
          }
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: {
                bgcolor: 'background.paper',
                minWidth: 160,
                ...(expanded && { width: drawerWidth - 16 }),
              },
            },
          }}
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
    </>
  );

  // Mobile: temporary overlay drawer
  if (isMobile) {
    return (
      <>
        <Box sx={{ position: 'fixed', top: 12, left: 12, zIndex: 1200 }}>
          <IconButton
            onClick={() => setMobileOpen(true)}
            size="small"
            aria-label="open sidebar"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {drawerContent(true)}
        </MuiDrawer>
        <ChatSearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </>
    );
  }

  // Desktop: permanent mini drawer
  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
      >
        {drawerContent()}
      </Drawer>
      <ChatSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
