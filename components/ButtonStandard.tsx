'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonStandard({ label, ...props }: AppButtonProps) {
  return (
    <Button
      size="medium"
      {...props}
      sx={{
        borderRadius: '24px',
        color: 'var(--background-secondary)',
        ...props.sx,
        '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
      }}
    >
      {label}
    </Button>
  );
}
