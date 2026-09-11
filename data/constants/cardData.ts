import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import TableRowsIcon from '@mui/icons-material/TableRows';
import RepeatIcon from '@mui/icons-material/Repeat';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { ElementType } from 'react';

export interface CardItem {
  Icon: ElementType;
  title: string;
  features: string[];
}

export const cardData: CardItem[] = [
  {
    Icon: TextSnippetIcon,
    title: 'Manage Documents',
    features: [
      'Compose accurate, on-brand documents',
      'Store and manage documents',
      'Summarize, edit and refine content',
    ],
  },
  {
    Icon: EmailIcon,
    title: 'Streamline your Inbox',
    features: [
      'Summarize emails in seconds',
      'Gain valuable insight at a glance',
      'Edit, delete and draft new responses',
    ],
  },
  {
    Icon: GroupsIcon,
    title: 'Manage Meetings',
    features: [
      'Auto-summarize calls and live sessions',
      'Document key insights and decisions',
      'Generate clear, shareable action items',
    ],
  },
  {
    Icon: TableRowsIcon,
    title: 'Gain Valuable Insight',
    features: [
      'Extract data from docs and images',
      'Restructure and organize data',
      'Seamlessly analyze and export data',
    ],
  },
  {
    Icon: RepeatIcon,
    title: 'Automate Repetitive Tasks',
    features: [
      'Convert emails into action items',
      'Turn meeting notes into task workflows',
      'Eliminate time-consuming routines',
    ],
  },
  {
    Icon: DeviceHubIcon,
    title: 'Connect Apps',
    features: [
      'Recap meetings from Zoom',
      'Document key insights and decisions',
      'Export and store data in Google Suite',
    ],
  },
];
