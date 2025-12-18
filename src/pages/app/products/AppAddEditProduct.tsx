import { AppTitleWrapper } from '@/components';
import AppContentWrapper from '@/components/app/wrappers/AppContentWrapper';
import {
  setCategoriesAll,
  setSubcategoriesAll,
} from '@/features/category.slice';
import type { RootState } from '@/store';
import { customFetch } from '@/utils/api/custom.fetch';
import { useAppSelector } from '@/utils/hooks';
import type { Store } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

const AppAddEditProduct = () => {
  const { slug } = useParams();
  const title = slug ? 'edit product' : 'add new product';
  const { categoriesAll, subCategoriesAll } = useAppSelector(
    (store) => store.categories
  );
  console.log(subCategoriesAll);

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
          <form>
            <fieldset>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1"></div>
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

export const loader = (store: Store<RootState>) => async () => {
  try {
    const responsecat = await customFetch.get(`/admin/categories/all`);
    if (responsecat.status === 200) {
      const { data } = responsecat.data;
      store.dispatch(setCategoriesAll(data));
    }

    const responsesub = await customFetch.get(`/admin/sub-categories/all`);
    if (responsesub.status === 200) {
      const { data } = responsesub.data;
      store.dispatch(setSubcategoriesAll(data));
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
