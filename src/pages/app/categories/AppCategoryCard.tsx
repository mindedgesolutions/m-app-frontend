import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppSelector } from '@/utils/hooks';
import AppIcon from '../../../components/app/shared/AppIcon';
import { CircleQuestionMark, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AppCategoryCard = ({ id }: { id: number }) => {
  const { categories } = useAppSelector((store) => store.categories);
  const category = categories.find((cat) => cat.id === id);
  const subcatcount = category?.sub_categories
    ? category.sub_categories.length
    : 0;
  const remainingSubcats = subcatcount - 4;

  return (
    <Popover>
      <PopoverTrigger>
        <CircleQuestionMark className="cursor-pointer w-3.5 h-3.5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96">
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
          {subcatcount > 0 ? (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-2 gap-y-3.5">
                {category?.sub_categories.slice(0, 4).map((sub) => (
                  <div className="flex gap-2" key={sub.id}>
                    {sub?.icon ? (
                      <AppIcon
                        name={sub?.icon}
                        className="text-muted-foreground w-3 h-3"
                      />
                    ) : (
                      <Settings className="w-3 h-3 text-muted-foreground" />
                    )}
                    <div className="font-inter font-medium text-xs text-muted-foreground">
                      {sub.name.length > 15
                        ? `${sub.name.slice(0, 15)}...`
                        : sub.name}
                    </div>
                  </div>
                ))}
                {subcatcount > 4 ? (
                  <div className="font-inter font-medium text-xs text-muted-foreground">
                    +{remainingSubcats} more
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AppCategoryCard;
