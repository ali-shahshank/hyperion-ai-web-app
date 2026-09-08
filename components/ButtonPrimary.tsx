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
        textTransform: 'uppercase',
        fontSize: '16px',
        fontWeight: 500,
        borderRadius: '24px',
        px: 3,
        py: 1,
        '&:hover': {
          opacity: 0.9,
        },
        '&:active': {},
        '&.Mui-disabled': {
          borderColor: 'rgba(0, 0, 0, 0.12)',
          color: 'rgba(0, 0, 0, 0.38)',
        },
        ...props.sx,
      }}
    >
      {label}
    </Button>
  );
}
