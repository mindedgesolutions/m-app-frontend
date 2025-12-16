import { cn } from '@/lib/utils';
import AppTitlePopover from '../shared/AppTitlePopover';

type AppTitleWrapperProps = {
  title: string;
  description?: string;
  className?: string;
};

const AppTitleWrapper = ({
  title,
  description,
  className,
}: AppTitleWrapperProps) => {
  return (
    <div
      className={cn(
        'p-2 py-2.5 bg-muted flex justify-start items-center gap-2 mb-4',
        className
      )}
    >
      <h1 className="text-xs capitalize tracking-wider font-inter font-semibold text-card-foreground">
        {title}
      </h1>
      {description && <AppTitlePopover description={description} />}
    </div>
  );
};
export default AppTitleWrapper;
