'use client';

import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonWarning({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="contained"
      color="warning"
      size="medium"
      sx={{ borderRadius: 8 }}
      {...props}
    >
      {label}
    </Button>
  );
}
