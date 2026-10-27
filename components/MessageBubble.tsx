'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface FilePart extends Record<string, unknown> {
  type: 'file';
  mediaType: string;
  filename?: string;
  url: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  /** Pass message.createdAt from the UIMessage / DB row so timestamps render */
  createdAt?: Date;
  parts?: Array<Record<string, unknown> & { type: string }>;
}

interface MessageBubbleProps {
  message: Message;
  userName?: string;
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
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            '&:hover': { bgcolor: 'background.paper', opacity: 0.85 },
          }}
        >
          {copied ? (
            <CheckIcon sx={{ fontSize: 12, color: 'success.main' }} />
          ) : (
            <ContentCopyIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
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
          border: '1px solid rgba(0,0,0,0.12)',
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

  const fileParts = (message.parts ?? []).filter(
    (p): p is FilePart => p.type === 'file',
  );

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
          py: 4,
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
            sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}
          >
            {isUser ? userName : 'Assistant'}
          </Typography>
          {time ? (
            <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
              {time}
            </Typography>
          ) : null}
        </Box>

        {/* Bubble / content */}
        {isUser ? (
          editing ? (
            /* ── Edit mode ── */
            <Box sx={{ maxWidth: { xs: '90%', md: 560 }, width: '100%' }}>
              {/* Themed border wrapper — raw textarea can't consume sx tokens */}
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: '12px',
                  '&:focus-within': { borderColor: 'primary.main' },
                }}
              >
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
                    border: 'none',
                    borderRadius: 12,
                    outline: 'none',
                    padding: '10px 14px',
                    fontSize: 14,
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                    background: 'transparent',
                    color: 'inherit',
                    minHeight: 60,
                    boxSizing: 'border-box',
                  }}
                />
              </Box>
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
                    sx={{ color: 'text.secondary' }}
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
                        bgcolor: 'text.primary',
                        color: 'background.paper',
                        width: 28,
                        height: 28,
                        '&:hover': { opacity: 0.85 },
                      }}
                    >
                      <CheckIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            /* ── User bubble ── */
            <Box
              sx={{
                maxWidth: { xs: '90%', md: 560 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 1,
              }}
            >
              {/* File attachments */}
              {fileParts.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.75,
                    justifyContent: 'flex-end',
                  }}
                >
                  {fileParts.map((part, i) =>
                    part.mediaType.startsWith('image/') ? (
                      <Box
                        key={i}
                        component="img"
                        src={part.url}
                        alt={part.filename ?? 'attachment'}
                        sx={{
                          maxWidth: 260,
                          maxHeight: 200,
                          borderRadius: 2,
                          objectFit: 'contain',
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      />
                    ) : (
                      <Chip
                        key={i}
                        size="small"
                        icon={
                          part.mediaType === 'application/pdf' ? (
                            <PictureAsPdfIcon sx={{ fontSize: 14 }} />
                          ) : (
                            <InsertDriveFileIcon sx={{ fontSize: 14 }} />
                          )
                        }
                        label={part.filename ?? part.mediaType}
                        sx={{ fontSize: 12, maxWidth: 200 }}
                      />
                    ),
                  )}
                </Box>
              )}

              {/* Text bubble */}
              {message.content && (
                <Box
                  sx={{
                    bgcolor: 'grey.200',
                    borderRadius: '16px 16px 4px 16px',
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'text.primary',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {message.content}
                  </Typography>
                </Box>
              )}
            </Box>
          )
        ) : (
          /* ── Assistant bubble ── */
          <Box
            sx={{
              maxWidth: { xs: '95%', md: 680 },
              fontSize: 14,
              lineHeight: 1.7,
              color: 'text.primary',
              '& p': { mt: 0, mb: 1 },
              '& ul, & ol': { pl: 3, mb: 1 },
              '& li': { mb: 0.25 },
              '& h1, & h2, & h3': { fontWeight: 600, mt: 2, mb: 0.5 },
              '& code': {
                bgcolor: 'action.hover',
                borderRadius: 0.5,
                px: 0.5,
                fontSize: 13,
                fontFamily: 'monospace',
              },
              '& pre': { m: 0 },
              '& blockquote': {
                borderLeft: '3px solid',
                borderColor: 'divider',
                pl: 2,
                ml: 0,
                color: 'text.secondary',
              },
              '& table': { borderCollapse: 'collapse', width: '100%', mb: 1 },
              '& th, & td': {
                border: '1px solid',
                borderColor: 'divider',
                px: 1.5,
                py: 0.5,
                fontSize: 13,
              },
              '& th': {
                fontWeight: 600,
                bgcolor: 'action.hover',
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
          <Box
            sx={{
              display: 'flex',
              gap: 0.25,
              mt: 0.5,
            }}
          >
            <Tooltip title={copied ? 'Copied!' : 'Copy'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                aria-label="Copy message"
                sx={{ color: 'text.secondary', width: 28, height: 28 }}
              >
                {copied ? (
                  <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />
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
                  sx={{ color: 'text.secondary', width: 28, height: 28 }}
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
                  sx={{ color: 'text.secondary', width: 28, height: 28 }}
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
