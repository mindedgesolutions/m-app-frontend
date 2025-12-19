import { customFetch } from '../api/custom.fetch';

export const getCategoriesAll = async () => {
  const response = await customFetch.get(`/admin/categories/all`);
  return response.data.data;
};

export const getSubcategoriesAll = async () => {
  const response = await customFetch.get(`/admin/sub-categories/all`);
  return response.data.data;
};
