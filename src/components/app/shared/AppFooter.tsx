import { titles } from '@/constants';

const AppFooter = () => {
  return (
    <div className="bg-muted p-4 font-inter text-xs text-muted-foreground tracking-wider mt-8">
      All rights reserved. &copy; {titles.siteName}, {new Date().getFullYear()}
    </div>
  );
};
export default AppFooter;
