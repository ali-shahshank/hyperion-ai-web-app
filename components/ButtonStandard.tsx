'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonStandard({ label, ...props }: AppButtonProps) {
  return (
    <Button
      size="medium"
      sx={{ borderRadius: 8 }}
      {...props}
    >
      {label}
    </Button>
  );
}
