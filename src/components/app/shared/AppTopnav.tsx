import { ModeToggle } from '@/components/mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import AppProfileContainer from './AppProfileContainer';
import { useAppSelector } from '@/utils/hooks';

const AppTopnav = () => {
  const { currentUser } = useAppSelector((store) => store.common);

  return (
    <div className="bg-sidebar flex flex-row justify-between items-center relative">
      <SidebarTrigger />
      <section className="p-2 flex flex-row justify-end items-center gap-0 md:gap-2 pr-4 md:pr-8">
        <ModeToggle />
        <span className="hidden md:block text-sm text-muted-foreground font-medium">
          Welcome{' '}
          <span className="font-inter text-xs uppercase tracking-wider ml-1">
            {currentUser?.name}
          </span>
        </span>
        <AppProfileContainer />
      </section>
    </div>
  );
};
export default AppTopnav;
