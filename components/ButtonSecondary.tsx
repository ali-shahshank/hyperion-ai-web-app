'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonSecondary({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      sx={{ borderRadius: 8 }}
      {...props}
    >
      {label}
    </Button>
  );
}
