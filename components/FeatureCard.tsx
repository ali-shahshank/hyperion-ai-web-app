import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';

// Card item interface
interface FeatureCardItem {
  image: string;
  href: string;
  title: string;
  description: string;
}

// Card data
const cardData: FeatureCardItem[] = [
  {
    image: '/simple.png',
    href: '/',
    title: 'Card One',
    description:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    image: '/simple.png',
    href: '/',
    title: 'Card Two',
    description:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    image: '/simple.png',
    href: '/',
    title: 'Card Three',
    description:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
];

// Single card component
function FeatureCard({ image, href, title, description }: FeatureCardItem) {
  return (
    <Card
      sx={{
        width: '100%',
        backgroundColor: 'var(--background-primary)',
        borderRadius: '16px',
      }}
    >
      <CardActionArea href={href}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// Grid wrapper
export default function FeatureCardGrid() {
  return (
    <Grid
      container
      spacing="16px"
      sx={{
        px: { xs: '0px', sm: '0px', md: '64px' },
        py: { xs: '0px', sm: '0px', md: '0px' },
      }}
    >
      {cardData.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <FeatureCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
