'use client';

import { useRef, useState, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StopIcon from '@mui/icons-material/Stop';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CHAT_MODELS, DEFAULT_CHAT_MODEL } from '@/lib/models';

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'application/pdf',
  'text/plain',
  'text/csv',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function FileChipIcon({ type }: { type: string }) {
  if (type.startsWith('image/'))
    return <ImageOutlinedIcon sx={{ fontSize: 14 }} />;
  if (type === 'application/pdf')
    return <PictureAsPdfIcon sx={{ fontSize: 14 }} />;
  return <InsertDriveFileIcon sx={{ fontSize: 14 }} />;
}

export interface PromptInputProps {
  onSubmit: (value: string, attachments: File[]) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onStop?: () => void;
}

export default function PromptInput({
  onSubmit,
  isLoading = false,
  disabled = false,
  placeholder = 'Message Hyperion...',
  onStop,
}: PromptInputProps) {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if ((!trimmed && attachments.length === 0) || isLoading || disabled) return;
    onSubmit(trimmed, attachments);
    setValue('');
    setAttachments([]);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    e.target.value = ''; // reset so same file can be re-added

    const valid = incoming.filter(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_BYTES,
    );

    setAttachments((prev) => [...prev, ...valid].slice(0, MAX_FILES));
  };

  const removeAttachment = (index: number) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));

  const atFileLimit = attachments.length >= MAX_FILES;
  const canSend =
    (value.trim().length > 0 || attachments.length > 0) && !disabled;

  return (
    <Box sx={{ width: '100%', maxWidth: 768, mx: 'auto' }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          px: 1.5,
          py: 1,
        }}
      >
        {/* Attachment chips */}
        {attachments.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1 }}>
            {attachments.map((file, i) => (
              <Chip
                key={i}
                label={file.name}
                size="small"
                icon={<FileChipIcon type={file.type} />}
                onDelete={() => removeAttachment(i)}
                sx={{ fontSize: 12, maxWidth: 200 }}
              />
            ))}
          </Box>
        )}

        {/* Top row: paperclip + textarea */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
          <Tooltip
            title={atFileLimit ? `Max ${MAX_FILES} files` : 'Attach file'}
          >
            <span>
              <IconButton
                size="small"
                disabled={disabled || atFileLimit}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach file"
                sx={{
                  color:
                    attachments.length > 0 ? 'primary.main' : 'text.secondary',
                  mb: 0.25,
                  flexShrink: 0,
                }}
              >
                <AttachFileIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFileChange}
            aria-label="File input"
            style={{ display: 'none' }}
          />

          <Box sx={{ flex: 1 }}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleInput();
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || isLoading}
              rows={1}
              style={{
                width: '100%',
                resize: 'none',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 14,
                lineHeight: '1.6',
                color: 'inherit',
                fontFamily: 'inherit',
                padding: '4px 0',
                minHeight: 32,
                maxHeight: 200,
                overflowY: 'auto',
              }}
            />
          </Box>
        </Box>

        {/* Bottom row: mic + waveform | model label | send/stop */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="Voice input (coming soon)">
              <span>
                <IconButton
                  size="small"
                  disabled
                  sx={{ color: 'text.secondary' }}
                >
                  <MicIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Voice input (coming soon)">
              <span>
                <IconButton
                  size="small"
                  disabled
                  sx={{ color: 'text.secondary' }}
                >
                  <GraphicEqIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{ fontSize: 12, color: 'text.secondary', userSelect: 'none' }}
            >
              {CHAT_MODELS.find((m) => m.id === DEFAULT_CHAT_MODEL)?.label ??
                'GPT OSS 120B'}
            </Typography>

            {isLoading ? (
              <Tooltip title="Stop generating">
                <IconButton
                  size="small"
                  onClick={onStop}
                  aria-label="Stop generating"
                  sx={{
                    bgcolor: 'text.primary',
                    color: 'background.paper',
                    '&:hover': { opacity: 0.85 },
                    width: 28,
                    height: 28,
                  }}
                >
                  <StopIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  canSend ? 'Send message' : 'Type a message or attach a file'
                }
              >
                <span>
                  <IconButton
                    size="small"
                    onClick={handleSubmit}
                    disabled={!canSend}
                    aria-label="Send message"
                    sx={{
                      bgcolor: canSend
                        ? 'text.primary'
                        : 'action.disabledBackground',
                      color: canSend ? 'background.paper' : 'action.disabled',
                      '&:hover': { opacity: 0.85 },
                      width: 28,
                      height: 28,
                      transition: 'background-color 0.15s',
                    }}
                  >
                    <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          color: 'text.secondary',
          textAlign: 'center',
          mt: 0.75,
        }}
      >
        Hyperion is AI and can make mistakes.
      </Typography>
    </Box>
  );
}
