import { titles } from '@/constants';
import { useAppSelector } from '@/utils/hooks';

const AppDashboard = () => {
  const { currentUser } = useAppSelector((store) => store.common);
  document.title = `${currentUser?.name}'s Dashboard | ${titles.siteName}`;

  return <div>{currentUser?.name}'s dashboard</div>;
};
export default AppDashboard;
