import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import PencilIcon from '@mui/icons-material/Edit';
import DocumentsIcon from '@mui/icons-material/Description';
import ImagesIcon from '@mui/icons-material/Image';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TrashIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface ChatSidebarProps {
  sidebarActions?: { title: string; icon: React.ReactNode; link: string }[];
}

const sidebarActions = [
  { title: 'New Chat', icon: PencilIcon, link: '/new-chat' },
  { title: 'Search Chats', icon: SearchIcon, link: '/search-chats' },
  { title: 'Documents', icon: DocumentsIcon, link: '/documents' },
  { title: 'Images', icon: ImagesIcon, link: '/images' },
  { title: 'App Connections', icon: AccountTreeIcon, link: '/integrations' },
  { title: 'Trash', icon: TrashIcon, link: '/trash' },
];

export function SidebarMenu() {
  return <Box></Box>;
}

export default function ChatSidebar({ sidebarActions }: ChatSidebarProps) {
  return (
    <Box>
      <List>
        {sidebarActions?.map((action, index) => (
          <ListItem key={index}>
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText primary={action.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
