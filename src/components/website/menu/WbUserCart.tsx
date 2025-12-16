import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FaShoppingCart } from 'react-icons/fa';

const WbUserCart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <FaShoppingCart className="text-chart-1 size-4 hover:text-chart-2 hover:transition hover:duration-200 cursor-pointer" />
          <span className="absolute -top-3 -right-3  flex items-center justify-center rounded-full p-1 bg-chart-3 text-card text-[10px] font-medium leading-none">
            10
          </span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-inter text-sm uppercase tracking-widest mb-2">
            Your shopping bag
          </SheetTitle>
          <SheetDescription className="font-inter text-xs tracking-wider">
            2 items are waiting
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4"></div>
        <SheetFooter>
          <Button type="submit" tabIndex={-1}>
            Proceed to checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default WbUserCart;
