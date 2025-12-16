import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import WbListCategory from './menu/WbListCategory';
import WbTopSearch from './menu/WbTopSearch';
import WbUserCart from './menu/WbUserCart';
import WbUserAccount from './menu/WbUserAccount';

const WbMenu = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="p-2.5 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center md:max-w-7xl mx-auto">
        <div className="col-span-1 flex flex-col md:flex-row gap-4">
          <WbListCategory />
          <WbTopSearch />
        </div>
        <div className="col-span-1 flex justify-center md:justify-end">
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    to="/"
                    className="text-chart-1 size-4 hover:text-chart-2 hover:transition hover:duration-200 cursor-pointer"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    to="/docs"
                    className="text-chart-1 size-4 hover:text-chart-2 hover:transition hover:duration-200 cursor-pointer"
                  >
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className="ml-4 hidden md:flex justify-center items-center gap-8">
                <NavigationMenuItem>
                  <WbUserCart />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <WbUserAccount />
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};
export default WbMenu;
