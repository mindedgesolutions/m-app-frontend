import { Lock, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '@/constants';
import { Button } from '@/components/ui/button';
import { customFetch } from '@/utils/api/custom.fetch';
import { userManager } from '@/utils/api/user.manager';
import { showSuccess } from '@/utils/show.success';

const AppProfileContainer = () => {
  const navigate = useNavigate();

  const signout = async () => {
    try {
      const response = await customFetch.post(`/auth/logout`);
      if (response.status === 200) {
        userManager.clear();
        showSuccess('Logout successful');
        navigate('/admin/sign-in');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-0 -mt-3 hidden md:block">
        <Button type="button" variant="ghost" className="focus:outline-none">
          <img
            src={images.defaultProfileImage}
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/admin/profile`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link to={`/admin/change-password`}>
            <DropdownMenuItem className="cursor-pointer">
              <Lock className="mr-2 h-4 w-4" />
              <span>Change password</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={signout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AppProfileContainer;
