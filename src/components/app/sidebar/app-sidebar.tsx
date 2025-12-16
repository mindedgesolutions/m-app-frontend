import { NavMain } from '@/components/app/sidebar/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import NavUser from './nav-user';
import { titles } from '@/constants';
import { Link } from 'react-router-dom';
import { NavSettings } from './nav-settings';
import { FaCameraRetro } from 'react-icons/fa';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="mb-2">
              <Link to="/admin/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <FaCameraRetro className="size-4" />
                </div>
                <div className="flex flex-col gap-1.5 leading-none ml-1">
                  <span className="font-medium font-inter uppercase">
                    {titles.siteName}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSettings />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <NavUser />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
