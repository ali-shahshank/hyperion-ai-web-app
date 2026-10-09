import Box from '@mui/material/Box';

export interface chatLayoutProps {
  children: React.ReactNode;
}

export default function chatLayout({ children }: chatLayoutProps) {
  return <Box>{children}</Box>;
}
