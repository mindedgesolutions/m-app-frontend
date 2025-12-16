import { WbMenu, WbTopnav } from '@/components';
import { Outlet } from 'react-router-dom';

const WbLayout = () => {
  return (
    <div>
      <WbTopnav />
      <WbMenu />
      <Outlet />
    </div>
  );
};
export default WbLayout;
