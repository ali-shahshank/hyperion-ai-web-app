import Chip from '@mui/material/Chip';
import { ChipProps } from '@mui/material/Chip';

interface BasicChipProps extends ChipProps {
  label: string;
}

export default function BasicChip({ label, ...props }: BasicChipProps) {
  return (
    <Chip
      {...props}
      label={label}
      sx={{
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}
    />
  );
}
