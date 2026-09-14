'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonTertiary({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="outlined"
      size="medium"
      {...props}
      sx={{
        color: 'var(--background-secondary)',
        borderColor: 'var(--background-secondary)',
        borderRadius: '24px',
        ...props.sx,
        '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
      }}
    >
      {label}
    </Button>
  );
}
