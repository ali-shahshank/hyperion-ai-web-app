import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export default function ButtonPrimaryOutline({
  label,
  ...props
}: AppButtonProps) {
  return (
    <Button
      variant="outlined"
      color="primary"
      {...props}
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
}
