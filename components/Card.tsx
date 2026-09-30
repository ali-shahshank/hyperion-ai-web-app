'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Image from 'next/image';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

// export interface CardContent {
//   Icon: React.ElementType;
//   title: string;
//   text: string;
//   link: string;
// }

// const CardContent = [
//   {
//     icon: HomeIcon,
//     title: 'Card one title',
//     text: 'Card one feature',
//     link: '/product',
//   },
//   {
//     icon: HomeIcon,
//     title: 'Card one title',
//     text: 'Card one feature',
//     link: '/product',
//   },
//   {
//     icon: HomeIcon,
//     title: 'Card one title',
//     text: 'Card one feature',
//     link: '/product',
//   },
// ];

const items = ['item one', 'item two', 'item three', 'item four'];

export default function () {
  return (
    <>
      <Card></Card>
    </>
  );
}
