import { cn } from '@/lib/utils';

const AppBodyWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('min-h-auto md:min-h-[500px] p-2', className)}>
      {children}
    </div>
  );
};
export default AppBodyWrapper;
