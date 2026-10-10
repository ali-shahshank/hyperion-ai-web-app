'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import MessageBubble from '@/components/MessageBubble';
import PromptInput from '@/components/PromptInput';
import { createMessage, getChat } from '@/lib/actions';

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

// Extract plain text from UIMessage parts
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

  // Verify chat exists and belongs to current user
  useEffect(() => {
    getChat(id).then((result) => {
      if (result?.error || !result?.data) {
        router.replace('/chat');
      } else {
        setAuthChecked(true);
      }
    });
  }, [id, router]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    id,
    onFinish: async ({ message }) => {
      const text = getTextContent(
        message.parts as { type: string; text?: string }[],
      );
      if (text) {
        await createMessage({ chatId: id, role: 'assistant', content: text });
      }
    },
    onError: () => {
      setError('Something went wrong. Please try again.');
    },
  });

  const isStreaming = status === 'submitted' || status === 'streaming';

  // Send initial message from sessionStorage
  useEffect(() => {
    if (!authChecked || sentInitial.current || messages.length > 0) return;
    try {
      const key = `chat_init_${id}`;
      const stored = sessionStorage.getItem(key);
      if (stored) {
        sentInitial.current = true;
        sessionStorage.removeItem(key);
        handleSubmit(stored);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authChecked, id]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (text: string) => {
    setError(null);
    await createMessage({ chatId: id, role: 'user', content: text });
    sendMessage({ parts: [{ type: 'text', text }] });
  };

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
      {/* Message thread */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 && !isStreaming && (
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

        {isStreaming && (
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

      {/* Error */}
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

      {/* Sticky prompt input */}
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
          isLoading={isStreaming}
          placeholder="Message Hyperion..."
        />
      </Box>
    </Box>
  );
}
