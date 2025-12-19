import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [] as CategoryProps[],
  categoriesAll: [] as AllCategoryProps[],
  subCategories: [] as SubCategoryProps[],
  subCategoriesAll: [] as AllCategoryProps[],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoriesAll: (state, action) => {
      state.categoriesAll = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setSubcategoriesAll: (state, action) => {
      state.subCategoriesAll = action.payload;
    },
  },
});
export const {
  setCategories,
  setCategoriesAll,
  setSubcategories,
  setSubcategoriesAll,
} = categorySlice.actions;
export default categorySlice.reducer;
