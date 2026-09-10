import Button from '@mui/material/Button';

export default function ButtonLoading() {
  return (
    <Button
      loading
      variant="outlined"
      size="large"
      sx={{
        borderRadius: '24px',
        borderColor: 'var(--accent-primary)',
        minWidth: '120px',
      }}
    >
      Loading
    </Button>
  );
}
