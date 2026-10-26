'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import TitleIcon from '@mui/icons-material/Title';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { searchChats, type ChatSearchResult } from '@/lib/actions';

interface ChatSearchModalProps {
  open: boolean;
  onClose: () => void;
}

function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(diff / 3_600_000);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(diff / 86_400_000);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function ChatSearchModal({
  open,
  onClose,
}: ChatSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChatSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset and focus on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await searchChats(q);
    setResults(res.data ?? []);
    setActiveIdx(0);
    setLoading(false);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => void doSearch(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  const navigate = useCallback(
    (result: ChatSearchResult) => {
      router.push(`/chat/${result.chatId}`);
      onClose();
    },
    [router, onClose],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      navigate(results[activeIdx]);
    }
  };

  const hasQuery = query.trim().length >= 2;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            mt: { xs: '10vh', md: '15vh' },
            verticalAlign: 'top',
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Input row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderBottom:
              results.length > 0 || (loading && hasQuery)
                ? '1px solid var(--stroke-dark, #F0F0F0)'
                : 'none',
          }}
        >
          {loading ? (
            <CircularProgress
              size={18}
              thickness={5}
              sx={{ color: 'var(--text-secondary, #999)', flexShrink: 0 }}
            />
          ) : (
            <SearchIcon
              sx={{
                color: 'var(--text-secondary, #999)',
                fontSize: 20,
                flexShrink: 0,
              }}
            />
          )}
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search chats and messages…"
            fullWidth
            sx={{ fontSize: 15, '& input': { p: 0 } }}
          />
          <Typography
            sx={{
              fontSize: 11,
              color: 'var(--text-secondary, #BDBDBD)',
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            Esc to close
          </Typography>
        </Box>

        {/* Results list */}
        {results.length > 0 && (
          <Box sx={{ maxHeight: 420, overflowY: 'auto', py: 0.5 }}>
            {results.map((r, i) => (
              <Box
                key={r.chatId}
                onClick={() => navigate(r)}
                onMouseEnter={() => setActiveIdx(i)}
                sx={{
                  px: 2,
                  py: 1.25,
                  cursor: 'pointer',
                  bgcolor:
                    i === activeIdx
                      ? 'var(--background-secondary, #F5F5F5)'
                      : 'transparent',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  transition: 'background-color 0.1s',
                }}
              >
                {/* Match type icon */}
                <Box
                  sx={{
                    pt: 0.25,
                    color: 'var(--text-secondary, #BDBDBD)',
                    flexShrink: 0,
                  }}
                >
                  {r.matchType === 'title' ? (
                    <TitleIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <ChatBubbleIcon sx={{ fontSize: 16 }} />
                  )}
                </Box>

                {/* Title + snippet + date */}
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: 1,
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--text-primary, #1A1A1A)',
                      }}
                    >
                      {r.chatTitle}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: 'var(--text-secondary, #BDBDBD)',
                        flexShrink: 0,
                      }}
                    >
                      {getRelativeTime(r.createdAt)}
                    </Typography>
                  </Box>
                  {r.snippet && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: 'var(--text-secondary, #888)',
                        mt: 0.25,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {r.snippet}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Empty state */}
        {!loading && hasQuery && results.length === 0 && (
          <Box sx={{ px: 2, py: 3, textAlign: 'center' }}>
            <Typography
              sx={{ fontSize: 13, color: 'var(--text-secondary, #888)' }}
            >
              No results for &ldquo;{query}&rdquo;
            </Typography>
          </Box>
        )}

        {/* Keyboard hint footer */}
        {results.length > 0 && (
          <Box
            sx={{
              px: 2,
              py: 1,
              borderTop: '1px solid var(--stroke-dark, #F0F0F0)',
              display: 'flex',
              gap: 2,
            }}
          >
            {[
              ['↑↓', 'navigate'],
              ['↵', 'open'],
              ['Esc', 'close'],
            ].map(([key, label]) => (
              <Box
                key={key}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    bgcolor: 'var(--background-secondary, #F5F5F5)',
                    border: '1px solid var(--stroke-dark, #E0E0E0)',
                    borderRadius: 0.5,
                    px: 0.75,
                    py: 0.25,
                    fontFamily: 'monospace',
                    color: 'var(--text-secondary, #888)',
                  }}
                >
                  {key}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, color: 'var(--text-secondary, #BDBDBD)' }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
