import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { createClient } from '@/lib/supabase/server';
import { getChats } from '@/lib/actions';
import ChatSidebar from '@/components/ChatSidebar';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single();

  const { data: chats } = await getChats();

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <ChatSidebar
        userName={displayName}
        userEmail={user.email ?? ''}
        userAvatarUrl={profile?.avatar_url ?? undefined}
        recentChats={chats ?? []}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'var(--background-primary, #FFFFFF)',
        }}
      >
        <Suspense
          fallback={
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={24} />
            </Box>
          }
        >
          {children}
        </Suspense>
      </Box>
    </Box>
  );
}
