import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppSelector } from '@/utils/hooks';
import AppIcon from './AppIcon';
import { CircleQuestionMark, Settings } from 'lucide-react';

const AppCategoryCard = ({
  id,
  type = 'category',
}: {
  id: number;
  type?: string;
}) => {
  const { categories, subCategories } = useAppSelector(
    (store) => store.categories
  );
  const category =
    type === 'category'
      ? categories.find((cat) => cat.id === id)
      : subCategories.find((cat) => cat.id === id);

  return (
    <Popover>
      <PopoverTrigger>
        <CircleQuestionMark className="cursor-pointer w-3.5 h-3.5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72">
        <div className="grid gap-4">
          <div className="flex gap-2">
            {category?.icon ? (
              <AppIcon
                name={category?.icon}
                className="text-muted-foreground"
              />
            ) : (
              <Settings className="w-4 h-4 text-muted-foreground" />
            )}
            <section className="font-inter font-medium text-xs">
              {category?.name}
            </section>
          </div>
          {category?.description && (
            <div className="font-inter font-medium text-xs text-muted-foreground">
              {category?.description}
            </div>
          )}
          {type === 'category' && (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                <div className="col-span-1">{num}</div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AppCategoryCard;
