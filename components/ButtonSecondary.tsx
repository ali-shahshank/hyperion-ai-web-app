'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonSecondary({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="contained"
      size="medium"
      {...props}
      sx={{
        color: '#ffffff',
        bgcolor: 'var(--background-secondary)',
        borderColor: 'var(--background-secondary)',
        borderRadius: '24px',
      }}
    >
      {label}
    </Button>
  );
}
