'use client';

import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonError({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="contained"
      size="medium"
      color="error"
      sx={{ borderRadius: 8 }}
      {...props}
    >
      {label}
    </Button>
  );
}
