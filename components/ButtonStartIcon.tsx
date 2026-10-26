import Button, { ButtonProps } from '@mui/material/Button';

interface ButtonStartIconProps extends Omit<ButtonProps, 'startIcon'> {
  icon: React.ReactNode;
  label: string;
}

const ButtonStartIcon = ({
  icon,
  label,
  variant = 'outlined',
  ...rest
}: ButtonStartIconProps) => {
  return (
    <Button
      size="medium"
      variant={variant}
      startIcon={icon}
      {...rest}
      sx={{ borderRadius: 8 }}
    >
      {label}
    </Button>
  );
};

export default ButtonStartIcon;
