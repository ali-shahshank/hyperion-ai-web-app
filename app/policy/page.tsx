import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
export default function Policy() {
  return (
    <Box
      sx={{
        margin: '0px',
        px: { xs: '16px', sm: '16px', md: '24px' },
        py: { xs: '40px', sm: '48px', md: '64px' },
      }}
    >
      <Typography
        variant="h5"
        component="h3"
      >
        Privacy Policy
      </Typography>
      <Stack
        sx={{
          py: { xs: '24px', sm: '24px', md: '32px' },
        }}
      >
        <Typography
          variant="h6"
          component="ol"
        >
          Introduction
        </Typography>
        <Typography
          variant="body1"
          component="p"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt et,
          pariatur consectetur ea necessitatibus fugiat voluptate deleniti!
          Nostrum blanditiis est repellat, odit eveniet odio commodi reiciendis,
          quasi deserunt fuga, atque itaque voluptate eaque. Consectetur, quia
          modi atque minima aliquid rerum reprehenderit veritatis magni dolorem
          commodi, adipisci vel quasi, quo aspernatur delectus facere quam
          possimus. In eos quo doloribus explicabo ipsa quibusdam accusantium
          sed velit laboriosam quod commodi impedit nisi incidunt earum
          dignissimos delectus perspiciatis cum unde perferendis quas, aut vero
          sapiente. Officiis ad placeat libero, esse odit nulla iusto rerum qui?
          Dicta maiores, odio dolorem voluptas deserunt perferendis.
          Accusantium, pariatur.
        </Typography>
      </Stack>
    </Box>
  );
}
