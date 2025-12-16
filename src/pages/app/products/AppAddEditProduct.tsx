import { AppTitleWrapper } from '@/components';
import AppContentWrapper from '@/components/app/wrappers/AppContentWrapper';
import { useParams } from 'react-router-dom';

const AppAddEditProduct = () => {
  const { slug } = useParams();
  const title = slug ? 'edit product' : 'add new product';

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
        </div>
      </AppContentWrapper>
    </div>
  );
};
export default AppAddEditProduct;
