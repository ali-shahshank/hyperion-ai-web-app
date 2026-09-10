import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Loading() {
  return (
    <main>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'var(--background-primary)',
        }}
      >
        <Button
          loading
          loadingIndicator="Loading..."
          size="medium"
        >
          Loading...
        </Button>
      </Box>
    </main>
  );
}
