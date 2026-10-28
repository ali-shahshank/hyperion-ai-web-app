import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  label: string;
}

const ButtonSecondaryOutline = ({ label, ...props }: AppButtonProps) => {
  return (
    <Button
      {...props}
      color="secondary"
      variant="outlined"
    >
      {label}
    </Button>
  );
};

export default ButtonSecondaryOutline;
