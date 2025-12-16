import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Lock, LogOut, Settings } from 'lucide-react';

const WbUserAccount = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FaRegCircleUser className="text-chart-1 size-4 hover:text-chart-2 hover:transition hover:duration-200 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-52">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={`https://github.com/shadcn.png`}
                alt={`Souvik Nag`}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{`Souvik Nag`}</span>
              <span className="truncate text-xs">{`souvik.nag@example.com`}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/account/settings`}>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="h-4 w-4 text-muted-foreground/80 mr-1" />
              <span className="text-sm font-normal text-card-foreground/80">
                Account settings
              </span>
            </DropdownMenuItem>
          </Link>
          <Link to={`/account/change-password`}>
            <DropdownMenuItem className="cursor-pointer">
              <Lock className="h-4 w-4 text-muted-foreground/80 mr-1" />
              <span className="text-sm font-normal text-card-foreground/80">
                Change password
              </span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="h-4 w-4 text-muted-foreground/80 mr-1" />
          <span className="text-sm font-normal text-card-foreground/80">
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WbUserAccount;
