// schemas/category.ts
import { z } from 'zod';

export const categoryCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(50, 'Category name cannot exceed 50 characters')
    .trim(),
//   description: z
//     .string()
//     .max(200, 'Description cannot exceed 200 characters')
//     .optional(),
  image: z.string().url('Please provide a valid image URL').optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

// Type inference
export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
