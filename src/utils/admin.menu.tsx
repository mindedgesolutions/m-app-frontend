import { Users } from 'lucide-react';
import { BiCategory, BiWrench, BiCog } from 'react-icons/bi';

export const data: AdminMenuProps[] = [
  {
    title: 'Service Providers',
    icon: BiCog,
    children: [
      {
        title: 'Components',
        url: '#',
      },
      {
        title: 'File Conventions',
        url: '#',
      },
      {
        title: 'Functions',
        url: '#',
      },
      {
        title: 'next.config.js Options',
        url: '#',
      },
      {
        title: 'CLI',
        url: '#',
      },
      {
        title: 'Edge Runtime',
        url: '#',
      },
    ],
  },
  {
    title: 'Customers',
    icon: Users,
    children: [
      {
        title: 'Accessibility',
        url: '#',
      },
      {
        title: 'Fast Refresh',
        url: '#',
      },
      {
        title: 'Next.js Compiler',
        url: '#',
      },
      {
        title: 'Supported Browsers',
        url: '#',
      },
      {
        title: 'Turbopack',
        url: '#',
      },
    ],
  },
];

export const settings: AdminMenuProps[] = [
  {
    title: 'Categories',
    icon: BiCategory,
    children: [
      {
        title: 'Categories',
        url: '/admin/settings/categories',
      },
      {
        title: 'Sub-categories',
        url: '/admin/settings/sub-categories',
      },
    ],
  },
  {
    title: 'Service Details',
    icon: BiWrench,
    url: '/admin/settings/service-details',
  },
];
