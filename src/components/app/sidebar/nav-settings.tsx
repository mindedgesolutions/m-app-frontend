import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { settings } from '@/utils/admin.menu';
import { Link, useLocation } from 'react-router-dom';

export function NavSettings() {
  const { isMobile } = useSidebar();
  const items: AdminMenuProps[] = settings;
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Link to={`${item.url ?? `#`}`}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-muted-foreground cursor-pointer"
                  >
                    <item.icon className="size-5 opacity-70 mr-1" />
                    {item.title}
                    {item.children && <MoreHorizontal className="ml-auto" />}
                  </SidebarMenuButton>
                </Link>
              </DropdownMenuTrigger>
              {item.children?.length ? (
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                  className="min-w-56 rounded-sm"
                >
                  {item.children.map((item) => (
                    <DropdownMenuItem
                      asChild
                      key={item.title}
                      className="cursor-pointer"
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              ) : null}
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
