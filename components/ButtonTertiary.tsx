'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonTertiary({ label, ...props }: AppButtonProps) {
  return (
    <Button
      color="success"
      variant="outlined"
      size="medium"
      {...props}
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
}
