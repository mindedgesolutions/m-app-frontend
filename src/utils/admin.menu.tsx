import { Users } from 'lucide-react';
import { BiCategory, BiCog } from 'react-icons/bi';
import { MdOutlineShoppingCart } from 'react-icons/md';

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
    title: 'Products',
    icon: MdOutlineShoppingCart,
    url: '/admin/settings/products',
  },
];
