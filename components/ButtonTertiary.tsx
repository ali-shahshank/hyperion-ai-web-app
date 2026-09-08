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
        fontSize: '16px',
        textTransform: 'uppercase',
        fontWeight: 500,
        borderRadius: '24px',
        px: 3,
        py: 1,
        '&:hover': {
          opacity: 0.9,
        },
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
