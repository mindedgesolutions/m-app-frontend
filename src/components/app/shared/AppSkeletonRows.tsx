import { Skeleton } from '@/components/ui/skeleton';

const AppSkeletonRows = ({ rows = 10 }) => {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="h-5 w-full" />
        </div>
      ))}
    </div>
  );
};
export default AppSkeletonRows;
