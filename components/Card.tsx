import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Card = ({
  icon,
  title,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  features: string[];
}) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'var(--background-primary)',
        border: '1px solid var(--stroke-light)',
      }}
    >
      <Stack spacing={1}>
        <Box aria-hidden>{icon}</Box>
        <Typography variant="h5">{title}</Typography>
        <List
          dense
          disablePadding
        >
          {features.map((feature) => (
            <ListItem
              key={feature}
              disableGutters
            >
              {feature}
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default Card;
