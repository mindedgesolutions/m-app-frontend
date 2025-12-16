import { titles } from '@/constants';
import { customFetch } from '@/utils/auth/custom.fetch';
import { useEffect, useState } from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AppPaginationContainer,
  AppTableBody,
  AppTitleWrapper,
} from '@/components';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { setSubcategories } from '@/features/category.slice';
import { AppProductSearch } from '@/pages';
import { serialNo } from '@/utils/functions';
import { unsetSearchText } from '@/features/common.slice';
import { Button } from '@/components/ui/button';

const description =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam aliquid, est tempora necessitatibus aspernatur quam reiciendis numquam consequatur aut tempore, repellat, perspiciatis explicabo laborum qui?';

const AppListProducts = () => {
  document.title = `Product List | ${titles.siteName}`;
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { counter } = useAppSelector((store) => store.common);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await customFetch.get('/products', {
          params: { page, search: searchTerm },
        });
        if (response.status === 200) {
          const { ...data } = response.data.data;
          setData(data.data);
          setMeta({
            currentPage: data.current_page ?? 1,
            lastPage: data.last_page,
            total: data.total,
          });
          dispatch(setSubcategories(data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      dispatch(unsetSearchText());
    };
  }, [page, searchTerm, counter]);

  return (
    <div>
      <AppTitleWrapper title="product list" description={description} />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="col-span-1 order-2 md:order-1 md:col-span-1">
          <AppProductSearch
            setSearchTerm={setSearchTerm}
            count={meta.total ?? 0}
          />
          <div className="my-4 mb-2">
            <Link to={`/admin/settings/product`}>
              <Button>Add new</Button>
            </Link>
          </div>
          <Table className="text-xs font-inter">
            <TableHeader>
              <TableRow>
                <TableHead>Sl. No.</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sub-Category</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Refurbished</TableHead>
                <TableHead>Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <AppTableBody loading={loading} colSpan={9} data={data}>
              {data.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {serialNo(Number(meta.currentPage), 10) + index}.
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </AppTableBody>
          </Table>
          {meta?.total && meta?.total > 10 ? (
            <AppPaginationContainer
              currentPage={meta.currentPage ?? 1}
              totalPages={meta.lastPage ?? 1}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default AppListProducts;
