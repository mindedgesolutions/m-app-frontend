import { AppFormSelect, AppTitleWrapper } from '@/components';
import AppContentWrapper from '@/components/app/wrappers/AppContentWrapper';
import { Label } from '@/components/ui/label';
import { productSchema, type ProductSchema } from '@/schemas/products.schema';
import { queryClient } from '@/utils/api/query.client';
import {
  getCategoriesAll,
  getSubcategoriesAll,
} from '@/utils/queries/master.queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const AppAddEditProduct = () => {
  const { slug } = useParams();
  const title = slug ? 'edit product' : 'add new product';
  const {
    formState: { isSubmitting, errors },
    ...form
  } = useForm<ProductSchema>({
    defaultValues: { category: '', subCategory: '', name: '' },
    mode: 'all',
    resolver: zodResolver(productSchema),
  });

  // --------------------
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAll,
  });

  const categoryOptions = categories.map(
    ({ id, name }: { id: number; name: string }) => ({
      value: id.toString(),
      label: name,
    })
  );

  const cat = form.watch('category');

  // --------------------

  const { data: subCategories } = useQuery({
    queryKey: ['subCategories'],
    queryFn: getSubcategoriesAll,
  });

  const subCategoryOptions =
    cat &&
    subCategories
      ?.filter((sub: AllCategoryProps) => sub.category_id!.toString() === cat)
      ?.map(({ id, name }: { id: number; name: string }) => ({
        value: id.toString(),
        label: name,
      }));

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
            <fieldset disabled={isSubmitting}>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <AppFormSelect
                      name="category"
                      control={form.control}
                      options={categoryOptions}
                      placeholder="Select a category"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  {cat && (
                    <div className="grid gap-3">
                      <Label htmlFor="category">Sub-category</Label>
                      <AppFormSelect
                        control={form.control}
                        name="subCategory"
                        options={subCategoryOptions}
                        placeholder="Select a sub-category"
                      />
                    </div>
                  )}
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
