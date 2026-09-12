'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CardItem } from '@/lib/data/constants/cardData';

const Card = ({ Icon, title, features }: CardItem) => {
  return (
    <Box
      component="article"
      sx={{
        p: 3,
        bgcolor: 'var(--background-primary)',
        border: '1px solid var(--stroke-dark)',
        borderRadius: 3,
      }}
    >
      <Stack spacing={1.5}>
        <Box
          aria-hidden="true"
          sx={{ color: 'var(--accent-primary)', display: 'flex' }}
        >
          <Icon fontSize="medium" />
        </Box>

        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWidth: '500' }}
        >
          {title}
        </Typography>

        <List
          dense
          disablePadding
          aria-label={`${title} features`}
        >
          {features.map((feature) => (
            <ListItem
              key={feature}
              disableGutters
            >
              <ListItemText
                primary={feature}
                sx={{ color: 'var(--text-secondary)' }}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default Card;
