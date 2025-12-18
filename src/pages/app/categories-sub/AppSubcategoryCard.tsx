import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppSelector } from '@/utils/hooks';
import AppIcon from '../../../components/app/shared/AppIcon';
import { CircleQuestionMark, Settings } from 'lucide-react';

const AppSubcategoryCard = ({ id }: { id: number }) => {
  const { subCategories } = useAppSelector((store) => store.categories);
  const subCategory = subCategories.find((sub) => sub.id === id);

  return (
    <Popover>
      <PopoverTrigger>
        <CircleQuestionMark className="cursor-pointer w-3.5 h-3.5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72">
        <div className="grid gap-4">
          <div className="flex gap-2">
            {subCategory?.icon ? (
              <AppIcon
                name={subCategory?.icon}
                className="text-muted-foreground"
              />
            ) : (
              <Settings className="w-4 h-4 text-muted-foreground" />
            )}
            <section className="font-inter font-medium text-xs">
              {subCategory?.name}
            </section>
          </div>
          {subCategory?.description ? (
            <div className="font-inter font-medium text-xs text-muted-foreground">
              {subCategory?.description}
            </div>
          ) : (
            <div className="font-inter italic font-medium text-xs text-muted-foreground">
              No description available
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AppSubcategoryCard;
