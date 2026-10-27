'use client';
import Button, { ButtonProps } from '@mui/material/Button';

interface ButtonTertiaryProps extends ButtonProps {
  label: string;
}

export default function ButtonTertiary({
  label,
  ...props
}: ButtonTertiaryProps) {
  return (
    <Button
      variant="outlined"
      size="medium"
      color="secondary"
      {...props}
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
}
