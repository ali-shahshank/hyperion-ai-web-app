import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonSuccess({ label, ...props }: AppButtonProps) {
  return (
    <Button
      variant="contained"
      size="medium"
      color="success"
      {...props}
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
}
