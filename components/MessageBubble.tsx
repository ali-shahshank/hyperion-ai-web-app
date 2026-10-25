'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';

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
  isLast?: boolean;
  isLoading?: boolean;
  onEdit?: (messageId: string, newContent: string) => Promise<void>;
  onRegenerate?: () => void;
}

function formatTime(date?: Date): string {
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Per-code-block copy button with its own copied state
function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Box sx={{ position: 'relative', my: 1 }}>
      <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
        <IconButton
          size="small"
          onClick={handleCopy}
          aria-label="Copy code"
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            zIndex: 1,
            width: 24,
            height: 24,
            bgcolor: 'rgba(255,255,255,0.9)',
            border: '1px solid #E0E0E0',
            borderRadius: 1,
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          {copied ? (
            <CheckIcon sx={{ fontSize: 12, color: '#4CAF50' }} />
          ) : (
            <ContentCopyIcon sx={{ fontSize: 12, color: '#888888' }} />
          )}
        </IconButton>
      </Tooltip>
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        customStyle={{
          borderRadius: 8,
          fontSize: 13,
          margin: 0,
          border: '1px solid #E0E0E0',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  );
}

export default function MessageBubble({
  message,
  userName = 'You',
  showDivider = false,
  isLast = false,
  isLoading = false,
  onEdit,
  onRegenerate,
}: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const time = formatTime(message.createdAt);

  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(message.content);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleEditStart = () => {
    setEditValue(message.content);
    setEditing(true);
  };

  const handleEditSubmit = async () => {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === message.content) {
      setEditing(false);
      return;
    }
    await onEdit?.(message.id, trimmed);
    setEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(message.content);
    setEditing(false);
  };

  const showActions = hovered && !editing && !isLoading;

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#888888',
            }}
          >
            {isUser ? userName : 'Assistant'}
          </Typography>
          {time && (
            <Typography sx={{ fontSize: 11, color: '#BDBDBD' }}>
              {time}
            </Typography>
          )}
        </Box>

        {/* Bubble / content */}
        {isUser ? (
          editing ? (
            <Box sx={{ maxWidth: { xs: '90%', md: 560 }, width: '100%' }}>
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void handleEditSubmit();
                  }
                  if (e.key === 'Escape') handleEditCancel();
                }}
                autoFocus
                aria-label="Edit message"
                style={{
                  width: '100%',
                  resize: 'none',
                  border: '1px solid #1565C0',
                  borderRadius: 12,
                  outline: 'none',
                  padding: '10px 14px',
                  fontSize: 14,
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                  background: '#ffffff',
                  color: '#1A1A1A',
                  minHeight: 60,
                  boxSizing: 'border-box',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  mt: 0.75,
                  justifyContent: 'flex-end',
                }}
              >
                <Tooltip title="Cancel (Esc)">
                  <IconButton
                    size="small"
                    onClick={handleEditCancel}
                    aria-label="Cancel edit"
                    sx={{ color: '#888' }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Save and resubmit (Enter)">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => void handleEditSubmit()}
                      disabled={
                        !editValue.trim() ||
                        editValue.trim() === message.content
                      }
                      aria-label="Save and resubmit"
                      sx={{
                        bgcolor: '#1A1A1A',
                        color: '#fff',
                        width: 28,
                        height: 28,
                        '&:hover': { bgcolor: '#333' },
                        '&.Mui-disabled': { bgcolor: '#E0E0E0', color: '#999' },
                      }}
                    >
                      <CheckIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                bgcolor: 'gray',
                borderRadius: '16px 16px 4px 16px',
                px: 2,
                py: 2,
                maxWidth: { xs: '90%', md: 560 },
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: ' #1A1A1A',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {message.content}
              </Typography>
            </Box>
          )
        ) : (
          <Box
            sx={{
              maxWidth: { xs: '95%', md: 680 },
              fontSize: 14,
              lineHeight: 1.7,
              color: '#1A1A1A',
              '& p': { mt: 0, mb: 1 },
              '& ul, & ol': { pl: 3, mb: 1 },
              '& li': { mb: 0.25 },
              '& h1, & h2, & h3': { fontWeight: 600, mt: 2, mb: 0.5 },
              '& code': {
                bgcolor: ' #F5F5F5',
                borderRadius: 0.5,
                px: 0.5,
                fontSize: 13,
                fontFamily: 'monospace',
              },
              '& pre': { m: 0 },
              '& blockquote': {
                borderLeft: '3px #E0E0E0',
                pl: 2,
                ml: 0,
                color: '#666666',
              },
              '& table': { borderCollapse: 'collapse', width: '100%', mb: 1 },
              '& th, & td': {
                border: '1px #E0E0E0',
                px: 1.5,
                py: 0.5,
                fontSize: 13,
              },
              '& th': {
                fontWeight: 600,
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre({ children }) {
                  return <>{children}</>;
                },
                code({ className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <CodeBlock language={match[1]}>
                      {String(children).replace(/\n$/, '')}
                    </CodeBlock>
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

        {/* Action bar — hover-revealed */}
        {showActions && (
          <Box sx={{ display: 'flex', gap: 0.25, mt: 0.5 }}>
            <Tooltip title={copied ? 'Copied!' : 'Copy'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                aria-label="Copy message"
                sx={{
                  color: '#888888',
                  width: 28,
                  height: 28,
                }}
              >
                {copied ? (
                  <CheckIcon sx={{ fontSize: 14, color: '#4CAF50' }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: 14 }} />
                )}
              </IconButton>
            </Tooltip>

            {isUser && onEdit && (
              <Tooltip title="Edit message">
                <IconButton
                  size="small"
                  onClick={handleEditStart}
                  aria-label="Edit message"
                  sx={{
                    color: '#888',
                    width: 28,
                    height: 28,
                  }}
                >
                  <EditIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            )}

            {!isUser && isLast && onRegenerate && (
              <Tooltip title="Regenerate response">
                <IconButton
                  size="small"
                  onClick={onRegenerate}
                  aria-label="Regenerate response"
                  sx={{
                    color: '#888',
                    width: 28,
                    height: 28,
                  }}
                >
                  <ReplayIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>

      {showDivider && (
        <Divider sx={{ mx: { xs: 2, md: 4 }, my: 0.5, opacity: 0.4 }} />
      )}
    </>
  );
}
