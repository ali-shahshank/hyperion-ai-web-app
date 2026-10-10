'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PromptInput from '@/components/PromptInput';
import { createChat } from '@/lib/actions';

const capabilities = [
  { label: 'Summarize meeting', icon: <SummarizeIcon sx={{ fontSize: 14 }} /> },
  { label: 'Process email', icon: <EmailIcon sx={{ fontSize: 14 }} /> },
  {
    label: 'Analyze document',
    icon: <DescriptionIcon sx={{ fontSize: 14 }} />,
  },
  { label: 'Create action plan', icon: <ListAltIcon sx={{ fontSize: 14 }} /> },
];

export default function ChatPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (message: string) => {
    setError(null);
    startTransition(async () => {
      const result = await createChat(message.slice(0, 60) || 'New Chat');
      if (result?.error) {
        setError('Failed to start chat. Please try again.');
        return;
      }
      if (result?.data?.id) {
        try {
          sessionStorage.setItem(`chat_init_${result.data.id}`, message);
        } catch {}
        router.push(`/chat/${result.data.id}`);
      }
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        pb: 4,
        gap: 3,
      }}
    >
      {/* Greeting */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: 'var(--text-primary, #1A1A1A)',
            mb: 1,
          }}
        >
          Good day.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            color: 'var(--text-secondary, #666)',
            maxWidth: 480,
          }}
        >
          I&apos;m Hyperion. Turn your meetings, emails, and documents into
          structured action plans.
        </Typography>
      </Box>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ width: '100%', maxWidth: 768 }}
        >
          {error}
        </Alert>
      )}

      {/* Prompt Input */}
      <Box sx={{ width: '100%', maxWidth: 768, position: 'relative' }}>
        <PromptInput
          onSubmit={handleSubmit}
          isLoading={isPending}
          placeholder="Message Hyperion..."
        />
        {isPending && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: 48,
              transform: 'translateY(-50%)',
            }}
          >
            <CircularProgress
              size={16}
              thickness={5}
            />
          </Box>
        )}
      </Box>

      {/* Capability chips — desktop only */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {capabilities.map((cap) => (
          <Chip
            key={cap.label}
            label={cap.label}
            icon={cap.icon}
            size="small"
            onClick={() => !isPending && handleSubmit(cap.label)}
            disabled={isPending}
            sx={{
              fontSize: 12,
              bgcolor: 'var(--background-secondary, #F5F5F5)',
              color: 'var(--text-secondary, #555)',
              border: '1px solid var(--stroke-dark, #E0E0E0)',
              cursor: isPending ? 'default' : 'pointer',
              '&:hover': {
                bgcolor: 'var(--stroke-dark, #E0E0E0)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
