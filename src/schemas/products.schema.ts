import z from 'zod';

export const productSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().min(1, 'Sub-category is required'),
  name: z.string().min(1, 'Product name is required'),
});
