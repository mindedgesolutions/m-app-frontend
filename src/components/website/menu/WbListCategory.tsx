import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories } from '@/utils/website.menu';
import { Menu } from 'lucide-react';
import { FaCameraRetro } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { WbUserCart, WbUserAccount } from '@/components';

const WbListCategory = () => {
  return (
    <div className="px-2 grid grid-cols-2 md:grid-cols-1 gap-4">
      <div className="col-span-1">
        <div className="flex items-center gap-6">
          <FaCameraRetro className="text-chart-1 size-6 md:size-10 hover:text-chart-2 hover:transition hover:duration-200 cursor-pointer" />
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="text-chart-1 cursor-pointer size-5 hover:text-chart-2 hover:transition hover:duration-200" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-inter text-sm uppercase tracking-widest mb-2">
                  Categories
                </SheetTitle>
                <SheetDescription className="font-inter text-xs tracking-wider">
                  We are continuously adding more and more categories every day.
                  Stay tuned!
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-auto">
                <ul className="my-2 ml-2 list-none [&>li]:mt-0 [&>li]:my-6 [&>li]:font-inter [&>li]:text-xs [&>li]:text-muted-foreground [&>li]:hover:text-card-foreground [&>li]:cursor-pointer [&>li]:hover:transition-all [&>li]:hover:duration-300">
                  {categories.map((category) => (
                    <>
                      <li
                        key={category.name}
                        className="flex items-center gap-2"
                      >
                        <category.icon className="size-4" />
                        <Link to={category.link}>{category.name}</Link>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button tabIndex={-1} variant="outline">
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex md:hidden justify-end items-center gap-10">
        <WbUserCart />
        <WbUserAccount />
      </div>
    </div>
  );
};
export default WbListCategory;
