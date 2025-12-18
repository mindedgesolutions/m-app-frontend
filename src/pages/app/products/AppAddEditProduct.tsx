import { AppFormSelect, AppTitleWrapper } from '@/components';
import AppContentWrapper from '@/components/app/wrappers/AppContentWrapper';
import { Label } from '@/components/ui/label';
import { queryClient } from '@/utils/api/query.client';
import {
  getCategoriesAll,
  getSubcategoriesAll,
} from '@/utils/queries/master.queries';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const AppAddEditProduct = () => {
  const { slug } = useParams();
  const title = slug ? 'edit product' : 'add new product';
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAll,
  });

  const { data: subCategories } = useQuery({
    queryKey: ['subCategories'],
    queryFn: getSubcategoriesAll,
  });

  return (
    <div>
      <AppTitleWrapper title={title} />
      <AppContentWrapper className="-mt-2">
        <div>
          <section className="p-2 py-2.5 bg-muted flex justify-start items-center">
            <h1 className="text-xs capitalize tracking-wider font-inter font-semibold text-card-foreground">
              basic details
            </h1>
          </section>
          <form className="mt-2 p-1">
            <fieldset>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <AppFormSelect />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Sub-category</Label>
                    <AppFormSelect />
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </AppContentWrapper>
    </div>
  );
};
export default AppAddEditProduct;

// ----------------------

export const loader = async () => {
  await Promise.all([
    queryClient.ensureQueryData({
      queryKey: ['categories'],
      queryFn: getCategoriesAll,
    }),
    queryClient.ensureQueryData({
      queryKey: ['subCategories'],
      queryFn: getSubcategoriesAll,
    }),
  ]);
  return null;
};
