import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonStandard({ label, ...props }: AppButtonProps) {
  return (
    <Button
      {...props}
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
}
