'use client';

import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import MessageBubble from '@/components/MessageBubble';
import PromptInput from '@/components/PromptInput';
import { createMessage, getChat, getMessages } from '@/lib/actions';
import { DEFAULT_CHAT_MODEL } from '@/lib/models';

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

function getTextContent(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

export default function ChatConversationPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  // const [mounted, setMounted] = useState(false);

  const {
    messages,
    sendMessage,
    stop,
    setMessages,
    status: chatStatus,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { model: DEFAULT_CHAT_MODEL },
    }),
    id,
    onFinish: async ({ message }: { message: UIMessage }) => {
      const text = getTextContent(
        message.parts as { type: string; text?: string }[],
      );
      if (text) {
        await createMessage({ chatId: id, role: 'assistant', content: text });
      }
    },
    onError: () => setError('Something went wrong. Please try again.'),
  });

  // loading state
  const isLoading = chatStatus === 'submitted' || chatStatus === 'streaming';
  console.log('chatStatus:', chatStatus);

  const handleSubmit = useCallback(
    async (text: string) => {
      setError(null);
      await createMessage({ chatId: id, role: 'user', content: text });
      sendMessage({ parts: [{ type: 'text', text }] });
    },
    [id, sendMessage],
  );

  // Component mount
  // useEffect(() => setMounted(true), []);

  // Auth + load existing messages + sessionStorage init
  useEffect(() => {
    let cancelled = false;
    getChat(id).then((chatResult) => {
      if (cancelled) return;
      if (chatResult?.error || !chatResult?.data) {
        router.replace('/chat');
        return;
      }
      getMessages(id).then((msgResult) => {
        if (cancelled) return;
        const existing = msgResult?.data ?? [];
        if (existing.length > 0) {
          setMessages(
            existing.map((msg: any) => ({
              id: msg.id,
              role: msg.role as 'user' | 'assistant',
              parts: [{ type: 'text' as const, text: msg.content }],
            })),
          );
        } else if (!sentInitial.current) {
          try {
            const stored = sessionStorage.getItem(`chat_init_${id}`);
            if (stored) {
              sentInitial.current = true;
              sessionStorage.removeItem(`chat_init_${id}`);
              handleSubmit(stored);
            }
          } catch {}
        }
        setAuthChecked(true);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [id, router, handleSubmit, setMessages]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!authChecked) {
    return (
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
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              sx={{ color: 'var(--text-secondary, #888)', fontSize: 14 }}
            >
              Start the conversation...
            </Typography>
          </Box>
        )}

        {messages.map((msg, i) => {
          const textContent = getTextContent(
            msg.parts as { type: string; text?: string }[],
          );
          const nextRole = messages[i + 1]?.role;
          const showDivider = nextRole === 'user' && msg.role === 'assistant';
          return (
            <MessageBubble
              key={msg.id}
              message={{
                id: msg.id,
                role: msg.role as 'user' | 'assistant',
                content: textContent,
              }}
              showDivider={showDivider}
            />
          );
        })}

        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: { xs: 2, md: 4 },
              py: 1,
            }}
          >
            <CircularProgress
              size={14}
              thickness={5}
              sx={{ color: 'var(--text-secondary, #999)' }}
            />
            <Typography
              sx={{ fontSize: 13, color: 'var(--text-secondary, #999)' }}
            >
              Thinking...
            </Typography>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      {error && (
        <Box sx={{ px: { xs: 2, md: 4 }, pb: 1 }}>
          <Alert
            severity="error"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        </Box>
      )}

      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          borderTop: '1px solid var(--stroke-dark, #F0F0F0)',
          bgcolor: 'var(--background-primary, #FFFFFF)',
        }}
      >
        <PromptInput
          onSubmit={handleSubmit}
          onStop={stop}
          isLoading={isLoading}
          placeholder="Message Hyperion..."
        />
      </Box>
    </Box>
  );
}
