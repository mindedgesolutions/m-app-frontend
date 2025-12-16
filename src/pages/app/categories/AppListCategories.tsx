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
  AppDelete,
  AppIcon,
  AppPaginationContainer,
  AppTableBody,
  AppToggleStatus,
  AppTitleWrapper,
} from '@/components';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { Pencil, Settings } from 'lucide-react';
import { setCategories } from '@/features/category.slice';
import {
  AppAddEditCategory,
  AppCategoryCard,
  AppCategorySearch,
} from '@/pages';
import { serialNo } from '@/utils/functions';
import AppTooltip from '@/components/app/shared/AppTooltip';

const description =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam aliquid, est tempora necessitatibus aspernatur quam reiciendis numquam consequatur aut tempore, repellat, perspiciatis explicabo laborum qui?';

const AppListCategories = () => {
  document.title = `Category List | ${titles.siteName}`;
  const [data, setData] = useState<CategoryProps[]>([]);
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
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await customFetch.get('/admin/categories', {
          params: { page, search: searchTerm },
        });
        console.log(response);
        if (response.status === 200) {
          const { ...data } = response.data.data;
          setData(data.data);
          setMeta({
            currentPage: data.current_page ?? 1,
            lastPage: data.last_page,
            total: data.total,
          });
          dispatch(setCategories(data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, searchTerm, counter]);

  return (
    <div>
      <AppTitleWrapper title="category list" description={description} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="order-2 md:order-1 col-span-1 md:col-span-2">
          <AppCategorySearch
            setSearchTerm={setSearchTerm}
            count={meta.total ?? 0}
          />
          <Table className="text-xs font-inter">
            <TableHeader>
              <TableRow>
                <TableHead>Sl. No.</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <AppTableBody loading={loading} colSpan={4} data={data}>
              {data.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {serialNo(Number(meta.currentPage), 10) + index}.
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <div className="w-[150px] md:w-[200px] flex justify-start items-center gap-2.5">
                        {category.icon ? (
                          <AppIcon
                            name={category.icon}
                            className="w-4 h-4 text-muted-foreground"
                          />
                        ) : (
                          <Settings className="w-4 h-4 text-muted-foreground" />
                        )}
                        <AppTooltip
                          text={category.name}
                          description={category.description}
                        />
                      </div>
                      <AppCategoryCard id={category.id} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <AppToggleStatus
                      setLoading={setLoading}
                      status={category.is_active}
                      api={`/admin/categories/toggle-status/${category.id}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end items-center gap-4">
                      <button
                        type="button"
                        className="cursor-pointer p-1"
                        onClick={() => setEditId(category.id)}
                      >
                        <Pencil className="text-chart-4 w-3.5 h-3.5" />
                      </button>
                      <AppDelete
                        api={`/admin/categories/${category.id}`}
                        confirmationHeader="Sure delete this category?"
                        confirmationText="Note: Category cannot be deleted if there is any order of this category. All related sub-categories will also be deleted"
                        setLoading={setLoading}
                        successText="Category deleted successfully"
                      />
                    </div>
                  </TableCell>
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
        <div className="order-1 md:order-2">
          <AppAddEditCategory editId={editId} setEditId={setEditId} />
        </div>
      </div>
    </div>
  );
};
export default AppListCategories;
