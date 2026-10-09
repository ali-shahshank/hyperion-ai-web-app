import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChatSidebar from '../../components/ChatSidebar';

export interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <Box component="main">
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: '100vh', overflow: 'hidden' }}
      >
        <Box>
          <ChatSidebar />
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
}
