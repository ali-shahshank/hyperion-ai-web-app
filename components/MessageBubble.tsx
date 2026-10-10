'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Date;
}

interface MessageBubbleProps {
  message: Message;
  userName?: string;
  userAvatarUrl?: string;
  showDivider?: boolean;
}

function formatTime(date?: Date): string {
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({
  message,
  userName = 'You',
  userAvatarUrl,
  showDivider = false,
}: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const time = formatTime(message.createdAt);

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
          px: { xs: 2, md: 4 },
          py: 1,
          maxWidth: '100%',
        }}
      >
        {/* Role label + timestamp */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 0.5,
            flexDirection: isUser ? 'row-reverse' : 'row',
          }}
        >
          {isUser ? (
            <Avatar
              src={userAvatarUrl}
              sx={{
                width: 22,
                height: 22,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: 'var(--brand-primary, #1565C0)',
              }}
            >
              {initials}
            </Avatar>
          ) : null}
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary, #888)',
            }}
          >
            {isUser ? userName : 'Assistant'}
          </Typography>
          {time && (
            <Typography
              sx={{ fontSize: 11, color: 'var(--text-secondary, #BDBDBD)' }}
            >
              {time}
            </Typography>
          )}
        </Box>

        {/* Bubble / content */}
        {isUser ? (
          <Box
            sx={{
              bgcolor: 'var(--background-secondary, #F0F0F0)',
              borderRadius: '16px 16px 4px 16px',
              px: 2,
              py: 1.25,
              maxWidth: { xs: '90%', md: 560 },
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--text-primary, #1A1A1A)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {message.content}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              maxWidth: { xs: '95%', md: 680 },
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--text-primary, #1A1A1A)',
              '& p': { mt: 0, mb: 1 },
              '& ul, & ol': { pl: 3, mb: 1 },
              '& li': { mb: 0.25 },
              '& h1, & h2, & h3': { fontWeight: 600, mt: 2, mb: 0.5 },
              '& code': {
                bgcolor: 'var(--background-secondary, #F5F5F5)',
                borderRadius: 0.5,
                px: 0.5,
                fontSize: 13,
                fontFamily: 'monospace',
              },
              '& pre': { m: 0 },
              '& blockquote': {
                borderLeft: '3px solid var(--stroke-dark, #E0E0E0)',
                pl: 2,
                ml: 0,
                color: 'var(--text-secondary, #666)',
              },
              '& table': {
                borderCollapse: 'collapse',
                width: '100%',
                mb: 1,
              },
              '& th, & td': {
                border: '1px solid var(--stroke-dark, #E0E0E0)',
                px: 1.5,
                py: 0.5,
                fontSize: 13,
              },
              '& th': {
                fontWeight: 600,
                bgcolor: 'var(--background-secondary, #F5F5F5)',
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: 8,
                        fontSize: 13,
                        margin: '8px 0',
                        border: '1px solid var(--stroke-dark, #E0E0E0)',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={className}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </Box>
        )}
      </Box>

      {showDivider && (
        <Divider sx={{ mx: { xs: 2, md: 4 }, my: 0.5, opacity: 0.4 }} />
      )}
    </>
  );
}
