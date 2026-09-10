'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonPrimary({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="contained"
      size="medium"
      {...props}
      sx={{
        bgcolor: 'var(--accent-primary)',
        color: '#ffffff',
        borderColor: 'var(--accent-primary)',
        borderRadius: '24px',
        ...props.sx,
      }}
    >
      {label}
    </Button>
  );
}
