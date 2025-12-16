import { images } from '@/constants';

const AppNoDataFound = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex justify-end items-center">
        <img src={images.noDataFound} alt="No data found" className="h-20" />
      </div>
      <div className="flex flex-col justify-center items-start gap-2">
        <h1 className="text-base font-inter uppercase font-bold text-muted-foreground tracking-wider">
          no data found
        </h1>
        <p className="font-inter tracking-wide text-muted-foreground">
          We couldn't find any data matching your search.
        </p>
      </div>
    </div>
  );
};
export default AppNoDataFound;
