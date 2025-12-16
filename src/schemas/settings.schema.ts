import z from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Category is required'),
  icon: z.string().optional().nullable(),
  description: z.string().optional(),
});
export type CategorySchema = z.infer<typeof categorySchema>;

export const subCategorySchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Sub-category is required'),
  icon: z.string().optional().nullable(),
  description: z.string().optional(),
});
export type SubcategorySchema = z.infer<typeof subCategorySchema>;
