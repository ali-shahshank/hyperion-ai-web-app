'use client';

import { useState, useEffect, useRef } from 'react';
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
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { signOut, updateChatTitle, deleteChat } from '@/lib/actions';
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

  // Per-chat row state
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [chatMenuAnchor, setChatMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [chatMenuId, setChatMenuId] = useState<string | null>(null);
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const renameInputRef = useRef<HTMLInputElement>(null);

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

  // Restore sidebar open state
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      if (stored !== null) setOpen(stored === 'true');
    } catch {}
  }, []);

  // Focus rename input when rename mode starts
  useEffect(() => {
    if (renamingChatId) {
      setTimeout(() => renameInputRef.current?.focus(), 30);
    }
  }, [renamingChatId]);

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

  // Chat row menu
  const handleChatMenuOpen = (
    e: React.MouseEvent<HTMLElement>,
    chatId: string,
  ) => {
    e.stopPropagation();
    setChatMenuAnchor(e.currentTarget);
    setChatMenuId(chatId);
  };

  const handleChatMenuClose = () => {
    setChatMenuAnchor(null);
    setChatMenuId(null);
  };

  // Rename
  const handleRenameStart = (chat: Chat) => {
    handleChatMenuClose();
    setRenamingChatId(chat.id);
    setRenameValue(chat.title);
  };

  const handleRenameSubmit = async () => {
    const trimmed = renameValue.trim();
    if (!trimmed || !renamingChatId) {
      setRenamingChatId(null);
      return;
    }
    await updateChatTitle(renamingChatId, trimmed);
    setRenamingChatId(null);
  };

  const handleRenameCancel = () => {
    setRenamingChatId(null);
    setRenameValue('');
  };

  // Delete
  const handleDeleteStart = (chatId: string) => {
    handleChatMenuClose();
    setDeletingChatId(chatId);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingChatId) return;
    setDeleteLoading(true);
    await deleteChat(deletingChatId);
    // If currently viewing the deleted chat, redirect to /chat
    if (pathname === `/chat/${deletingChatId}`) router.push('/chat');
    setDeleteLoading(false);
    setDeletingChatId(null);
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
        {recentChats.slice(0, 6).map((chat) => {
          const chatActive = pathname === `/chat/${chat.id}`;
          const isRenaming = renamingChatId === chat.id;
          const isHovered = hoveredChatId === chat.id;

          return (
            <ListItem
              key={chat.id}
              disablePadding
              sx={{ display: 'block' }}
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
            >
              <ListItemButton
                selected={chatActive && !isRenaming}
                onClick={() => {
                  if (!isRenaming) handleNav(`/chat/${chat.id}`);
                }}
                sx={{
                  py: 0,
                  pr: 0.5,
                  justifyContent: 'initial',
                  // prevent blue selected highlight while renaming
                  ...(isRenaming && { bgcolor: 'transparent !important' }),
                }}
              >
                {isRenaming ? (
                  <InputBase
                    inputRef={renameInputRef}
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        void handleRenameSubmit();
                      }
                      if (e.key === 'Escape') handleRenameCancel();
                    }}
                    onBlur={() => void handleRenameSubmit()}
                    onClick={(e) => e.stopPropagation()}
                    fullWidth
                    sx={{
                      fontSize: 14,
                      px: 1,
                      py: 0.25,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: 1,
                      '& input': { p: 0 },
                    }}
                  />
                ) : (
                  <>
                    <ListItemText
                      primary={chat.title}
                      slotProps={{
                        primary: {
                          noWrap: true,
                          sx: { fontSize: 14, color: 'text.secondary' },
                        },
                      }}
                    />
                    {isHovered && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleChatMenuOpen(e, chat.id)}
                        aria-label="Chat options"
                        sx={{
                          flexShrink: 0,
                          width: 24,
                          height: 24,
                          color: 'text.secondary',
                        }}
                      >
                        <MoreVertIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
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

        {/* User menu */}
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

  return (
    <>
      {/* Mobile FAB */}
      {isMobile && (
        <Box sx={{ position: 'fixed', top: 12, left: 12, zIndex: 1200 }}>
          <IconButton
            onClick={() => setMobileOpen(true)}
            size="small"
            aria-label="open sidebar"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Drawer */}
      {isMobile ? (
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
      ) : (
        <Drawer
          variant="permanent"
          open={open}
        >
          {drawerContent()}
        </Drawer>
      )}

      {/* Per-chat context menu */}
      <Menu
        anchorEl={chatMenuAnchor}
        open={Boolean(chatMenuAnchor)}
        onClose={handleChatMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 140 } } }}
      >
        <MenuItem
          onClick={() => {
            const chat = recentChats.find((c) => c.id === chatMenuId);
            if (chat) handleRenameStart(chat);
          }}
        >
          <ListItemIcon>
            <DriveFileRenameOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Rename</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (chatMenuId) handleDeleteStart(chatMenuId);
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon
              fontSize="small"
              sx={{ color: 'error.main' }}
            />
          </ListItemIcon>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Delete confirm dialog */}
      <Dialog
        open={Boolean(deletingChatId)}
        onClose={() => !deleteLoading && setDeletingChatId(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: 16, fontWeight: 600 }}>
          Delete chat?
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            This will permanently delete the chat and all its messages. This
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeletingChatId(null)}
            disabled={deleteLoading}
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={() => void handleDeleteConfirm()}
            disabled={deleteLoading}
            color="error"
            variant="contained"
            size="small"
          >
            {deleteLoading ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search modal */}
      <ChatSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
