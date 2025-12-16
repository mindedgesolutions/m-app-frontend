import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '@/features/common.slice';
import categoryReducer from '@/features/category.slice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    categories: categoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
