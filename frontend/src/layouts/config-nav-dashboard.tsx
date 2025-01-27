import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Users',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Products',
    path: '/products',
    icon: icon('ic-cart'),
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: icon('ic-blog'),
  },
];
