import Box from '@mui/material/Box';
import ButtonLoading from '@/components/ButtonLoading';

export default function Loading() {
  return (
    <main>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'var(--background-primary)',
        }}
      >
        <ButtonLoading />
      </Box>
    </main>
  );
}
