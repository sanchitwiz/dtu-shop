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
    .max(300, 'Short description cannot exceed 300 characters'), // Remove .default('') and .optional()
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
    .max(10, 'Maximum 10 tags allowed'), // Remove .default([])
  variants: z.array(productVariantSchema), // Remove .default([])
  quantity: z.number().int().min(0, 'Quantity cannot be negative'), // Remove .default(0)
  isActive: z.boolean(), // Remove .default(true)
  isFeatured: z.boolean() // Remove .default(false)
});

export const productUpdateSchema = productCreateSchema.partial();

// Type inference
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
