import { ChevronsUpDown, Lock, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { images } from '@/constants';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/utils/functions';
import { useAppSelector } from '@/utils/hooks';

const NavUser = () => {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((store) => store.common);

  // ---------------------------------------

  const signout = async () => {
    const response = await logout();
    if (response) navigate('/admin/sign-in');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={images.defaultProfileImage}
                  alt={`Souvik Nag`}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`Souvik Nag`}</span>
                <span className="truncate text-xs">{`souvik@test.com`}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={images.defaultProfileImage}
                    alt={currentUser?.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {currentUser?.name}
                  </span>
                  <span className="truncate text-xs">{currentUser?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={`/account/settings`}>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 text-muted-foreground/80" />
                  <span className="text-sm font-normal">Account settings</span>
                </DropdownMenuItem>
              </Link>
              <Link to={`/account/change-password`}>
                <DropdownMenuItem>
                  <Lock className="h-4 w-4 text-muted-foreground/80" />
                  <span className="text-sm font-normal">Change password</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signout}>
              <LogOut className="h-4 w-4 text-muted-foreground/80" />
              <span className="text-sm font-normal">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
