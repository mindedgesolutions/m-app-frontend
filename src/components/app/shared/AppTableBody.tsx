import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppSkeletonRows from './AppSkeletonRows';
import AppNoDataFound from './AppNoDataFound';

type TableLoaderProps = {
  loading: boolean;
  revalidating?: boolean;
  colSpan: number;
  skeletonRows?: number;
  children: React.ReactNode;
  data: any[];
};

const AppTableBody = ({
  loading,
  revalidating,
  colSpan,
  skeletonRows = 10,
  children,
  data,
}: TableLoaderProps) => {
  return (
    <TableBody>
      {loading || revalidating ? (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <AppSkeletonRows rows={skeletonRows} />
          </TableCell>
        </TableRow>
      ) : data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <AppNoDataFound />
          </TableCell>
        </TableRow>
      ) : (
        children
      )}
    </TableBody>
  );
};
export default AppTableBody;
