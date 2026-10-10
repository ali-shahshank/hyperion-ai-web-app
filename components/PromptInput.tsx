'use client';

import { useRef, useState, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface PromptInputProps {
  onSubmit: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function PromptInput({
  onSubmit,
  isLoading = false,
  disabled = false,
  placeholder = 'Message Hyperion...',
}: PromptInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSubmit(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
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

  return (
    <Box sx={{ width: '100%', maxWidth: 768, mx: 'auto' }}>
      <Box
        sx={{
          border: '1px solid var(--stroke-dark, #E0E0E0)',
          borderRadius: 3,
          bgcolor: 'var(--background-primary, #FFFFFF)',
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          px: 1.5,
          py: 1,
        }}
      >
        {/* Top row: attachment + textarea */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
          <Tooltip title="Attach file">
            <IconButton
              size="small"
              disabled={disabled}
              sx={{
                color: 'var(--text-secondary, #888)',
                mb: 0.25,
                flexShrink: 0,
              }}
            >
              <AttachFileIcon fontSize="small" />
            </IconButton>
          </Tooltip>

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
                color: 'var(--text-primary, #1A1A1A)',
                fontFamily: 'inherit',
                padding: '4px 0',
                minHeight: 32,
                maxHeight: 200,
                overflowY: 'auto',
              }}
            />
          </Box>
        </Box>

        {/* Bottom row: mic + waveform | model label | send */}
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
                  sx={{ color: 'var(--text-secondary, #BDBDBD)' }}
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
                  sx={{ color: 'var(--text-secondary, #BDBDBD)' }}
                >
                  <GraphicEqIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontSize: 11,
                color: 'var(--text-secondary, #BDBDBD)',
                userSelect: 'none',
              }}
            >
              Llama 3.3 · 70B
            </Typography>
            <Tooltip
              title={value.trim() ? 'Send message' : 'Type a message first'}
            >
              <span>
                <IconButton
                  size="small"
                  onClick={handleSubmit}
                  disabled={!value.trim() || isLoading || disabled}
                  sx={{
                    bgcolor:
                      value.trim() && !isLoading
                        ? 'var(--text-primary, #1A1A1A)'
                        : 'var(--stroke-dark, #E0E0E0)',
                    color:
                      value.trim() && !isLoading
                        ? '#fff'
                        : 'var(--text-secondary, #999)',
                    '&:hover': {
                      bgcolor:
                        value.trim() && !isLoading
                          ? '#333'
                          : 'var(--stroke-dark, #E0E0E0)',
                    },
                    width: 28,
                    height: 28,
                    transition: 'background-color 0.15s',
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Model label below */}
      <Typography
        sx={{
          fontSize: 11,
          color: 'var(--text-secondary, #BDBDBD)',
          textAlign: 'center',
          mt: 0.75,
        }}
      >
        Hyperion can make mistakes. Check important info.
      </Typography>
    </Box>
  );
}
