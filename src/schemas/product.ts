// schemas/product.ts
import { z } from 'zod';

export const productVariantSchema = z.object({
  type: z.string().min(1, 'Variant type is required'),
  value: z.string().min(1, 'Variant value is required'),
  price: z.number().min(0, 'Price cannot be negative').optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative').optional(),
});

export const productCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(100, 'Product name cannot exceed 100 characters')
    .trim(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  shortDescription: z
    .string()
    .max(300, 'Short description cannot exceed 300 characters')
    .optional(),
  price: z
    .number()
    .positive('Price must be greater than 0')
    .max(100000, 'Price cannot exceed ₹1,00,000'),
  comparePrice: z
    .number()
    .positive('Compare price must be greater than 0')
    .optional(),
  category: z.string().min(1, 'Category is required'),
  images: z
    .array(z.string().url('Please provide valid image URLs'))
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
  tags: z
    .array(z.string().trim().min(1))
    .max(10, 'Maximum 10 tags allowed')
    .default([]),
  variants: z.array(productVariantSchema).default([]),
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
//   inventory: z.object({
//     quantity: z.number().int().min(0, 'Quantity cannot be negative'),
//     lowStockThreshold: z.number().int().min(0).default(5),
//     trackQuantity: z.boolean().default(true),
//   }),
//   specifications: z.record(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
//   weight: z.number().positive().optional(),
//   dimensions: z.object({
//     length: z.number().positive(),
//     width: z.number().positive(),
//     height: z.number().positive(),
//   }).optional(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const productSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxPrice: z.string().regex(/^\d+$/).transform(Number).optional(),
  tags: z.string().optional(),
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('12'),
  sort: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc', 'newest']).default('newest'),
});

// Type inference
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProductSearchInput = z.infer<typeof productSearchSchema>;
