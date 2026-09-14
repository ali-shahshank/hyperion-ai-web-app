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
      size="large"
      variant={variant}
      startIcon={icon}
      {...rest}
      sx={{
        bgcolor: 'white',
        color: 'var(--background-secondary)',
        border: ' 1px solid var(--background-secondary)',
        textTransform: 'none',
        borderRadius: '24px',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonStartIcon;
