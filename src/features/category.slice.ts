import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [] as CategoryProps[],
  subCategories: [] as SubCategoryProps[],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});
export const { setCategories, setSubcategories } = categorySlice.actions;
export default categorySlice.reducer;
