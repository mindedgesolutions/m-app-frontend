import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CircleQuestionMark } from 'lucide-react';

const AppTitlePopover = ({ description }: { description: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CircleQuestionMark className="cursor-pointer w-3.5 h-3.5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2 text-xs font-inter leading-normal tracking-tighter text-justify text-muted-foreground">
            {description}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AppTitlePopover;
