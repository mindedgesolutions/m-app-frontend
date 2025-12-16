import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { data } from '@/utils/admin.menu';
import { Link } from 'react-router-dom';

export function NavMain() {
  const { isMobile } = useSidebar();
  const items: AdminMenuProps[] = data;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <Link to={`${item.url ?? `#`}`}>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-muted-foreground cursor-pointer">
                    <item.icon className="size-5 mr-1" />
                    {item.title} <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                </Link>
              </DropdownMenuTrigger>
              {item.children?.length ? (
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                  className="min-w-56 rounded-lg"
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
