import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';

export interface PanelProps {
  eyebrow: string;
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt?: string;
}

export default function Panel({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = '',
}: PanelProps) {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 6 }}
        sx={{
          width: '100%',
          p: { xs: 2, md: 3 },
          backgroundColor: 'black',
          border: '1px solid var(--stroke-dark)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: { xs: 240, sm: 320, md: 360 },
            flex: 1,
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'var(--text-light-secondary)',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              color: 'var(--text-light-primary)',
            }}
          >
            {title}
          </Typography>

          <List
            disablePadding
            sx={{
              pl: 2,
              color: 'var(--text-light-secondary)',
            }}
          >
            {description.map((item, index) => (
              <ListItem
                key={`${title}-${index}`}
                disableGutters
                sx={{
                  display: 'list-item',
                  listStyleType: 'disc',
                  py: 0.5,
                  '&::marker': {
                    color: 'var(--text-light-secondary)',
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  sx={{ m: 0 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Box>
  );
}
