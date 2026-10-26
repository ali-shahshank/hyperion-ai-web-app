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
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
}
