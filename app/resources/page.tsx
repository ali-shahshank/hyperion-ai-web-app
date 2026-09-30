import Nav from '@/components/Nav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const items = [
  { title: '', icon: '', link: '' },
  { title: '', icon: '', link: '' },
  { title: '', icon: '', link: '' },
  { title: '', icon: '', link: '' },
  { title: '', icon: '', link: '' },
  { title: '', icon: '', link: '' },
];

// update resouces Items with the above format and content
const resourceItems = ['Docs', 'Stack', 'System Architecture', 'API'];

export default function Resources() {
  return (
    <>
      <Nav />
      <Box>
        <Typography
          variant="h4"
          component="h1"
        >
          Resources Page.
        </Typography>

        {resourceItems.map((resourceItem, i) => (
          <List key={i}>
            <ListItem>
              <ListItemText>{resourceItem}</ListItemText>
            </ListItem>
          </List>
        ))}
      </Box>
    </>
  );
}
