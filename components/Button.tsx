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
        color: 'var(--background-secondary)',
        textTransform: 'uppercase',
        fontSize: '16px',
        fontWeight: 500,
        borderRadius: '24px',
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
