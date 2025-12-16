import { cn } from '@/lib/utils';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';

const AppIcon = ({ name, className }: { name: string; className?: string }) => {
  let IconComponent;
  IconComponent =
    FaIcons[name as keyof typeof FaIcons] ||
    GiIcons[name as keyof typeof GiIcons];
  if (!IconComponent) return <span>Icon not found</span>;

  return <IconComponent className={cn('w-4 h-4', className)} />;
};
export default AppIcon;
