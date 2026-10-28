'use client';

import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import MessageBubble from '@/components/MessageBubble';
import PromptInput from '@/components/PromptInput';
import {
  createMessage,
  deleteMessage,
  getChat,
  getMessages,
} from '@/lib/actions';
import { DEFAULT_CHAT_MODEL } from '@/lib/models';

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

interface MessageMetadata {
  createdAt?: string; // ISO string — Date isn't serialisable across SDK state
}

interface DbMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string | null;
}

async function filesToParts(files: File[]) {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<{
          type: 'file';
          filename: string;
          mediaType: string;
          url: string;
        }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              type: 'file',
              filename: file.name,
              mediaType: file.type,
              url: reader.result as string,
            });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
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
  const [mounted, setMounted] = useState(false);

  const {
    messages,
    sendMessage,
    stop,
    setMessages,
    status: chatStatus,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { model: DEFAULT_CHAT_MODEL, chatId: id },
    }),
    id,
    onError: () => setError('Something went wrong. Please try again.'),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = chatStatus === 'submitted' || chatStatus === 'streaming';

  const handleSubmit = useCallback(
    async (content: string, files: File[] = []) => {
      setError(null);
      try {
        const fileParts = files.length > 0 ? await filesToParts(files) : [];
        await createMessage({ chatId: id, role: 'user', content });
        sendMessage({
          role: 'user',
          parts: [...fileParts, { type: 'text', text: content }],
          metadata: { createdAt: new Date().toISOString() },
        });
      } catch {
        setError('Failed to send message. Please try again.');
      }
    },
    [id, sendMessage],
  );

  const handleEdit = useCallback(
    async (messageId: string, newContent: string) => {
      const idx = messages.findIndex((m) => m.id === messageId);
      if (idx === -1) return;
      await Promise.all(messages.slice(idx).map((m) => deleteMessage(m.id)));
      setMessages(messages.slice(0, idx));
      await handleSubmit(newContent);
    },
    [messages, setMessages, handleSubmit],
  );

  const handleRegenerate = useCallback(async () => {
    const lastUserIdx = messages.reduceRight(
      (found, msg, i) => (found !== -1 ? found : msg.role === 'user' ? i : -1),
      -1,
    );
    if (lastUserIdx === -1) return;
    const lastUserContent = getTextContent(
      messages[lastUserIdx].parts as Array<{ type: string; text?: string }>,
    );
    await Promise.all(
      messages.slice(lastUserIdx).map((m) => deleteMessage(m.id)),
    );
    setMessages(messages.slice(0, lastUserIdx));
    await handleSubmit(lastUserContent);
  }, [messages, setMessages, handleSubmit]);

  // Auth + load existing messages
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const chatResult = await getChat(id);
        if (cancelled) return;
        if (chatResult?.error || !chatResult?.data) {
          router.replace('/chat');
          return;
        }
        const msgResult = await getMessages(id);
        if (cancelled) return;
        const existing = (msgResult?.data ?? []) as DbMessage[];
        if (existing.length > 0) {
          setMessages(
            existing.map((msg) => ({
              id: msg.id,
              role: msg.role,
              parts: [{ type: 'text' as const, text: msg.content }],
              metadata: { createdAt: msg.created_at ?? undefined },
            })),
          );
        }
        setAuthChecked(true);
      } catch {
        if (!cancelled) router.replace('/chat');
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [id, router, setMessages]);

  // Send initial message from sessionStorage — runs once after auth resolves
  useEffect(() => {
    if (!authChecked || sentInitial.current) return;
    try {
      const stored = sessionStorage.getItem(`chat_init_${id}`);
      if (stored) {
        sentInitial.current = true;
        sessionStorage.removeItem(`chat_init_${id}`);
        void handleSubmit(stored);
      }
    } catch {}
  }, [authChecked, id, handleSubmit]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mounted || !authChecked) {
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
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
              Start the conversation...
            </Typography>
          </Box>
        )}

        {(() => {
          const lastAssistantIdx = messages.reduceRight(
            (found, msg, i) =>
              found !== -1 ? found : msg.role === 'assistant' ? i : -1,
            -1,
          );
          return messages.map((msg, i) => {
            const textContent = getTextContent(
              msg.parts as Array<{ type: string; text?: string }>,
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
                  parts: msg.parts as Array<
                    Record<string, unknown> & { type: string }
                  >,
                  createdAt: (msg.metadata as MessageMetadata | undefined)
                    ?.createdAt
                    ? new Date((msg.metadata as MessageMetadata).createdAt!)
                    : undefined,
                }}
                showDivider={showDivider}
                isLast={i === lastAssistantIdx}
                isLoading={isLoading}
                onEdit={handleEdit}
                onRegenerate={handleRegenerate}
              />
            );
          });
        })()}

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
              sx={{ color: 'text.secondary' }}
            />
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
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
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
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
