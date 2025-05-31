// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { productUpdateSchema } from '@/schemas/product';
import Product from '@/models/Product';
import Category from '@/models/Category';
import dbConnect from '@/lib/dbConnect';
import { requireAdmin } from '@/lib/auth/adminAuth';
import mongoose from 'mongoose';

/**
 * GET /api/products/[id] - Get single product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .lean();
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product });
    
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id] - Update product (Admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    await requireAdmin();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate input using Zod schema
    const validatedData = productUpdateSchema.parse(body);
    
    await dbConnect();
    
    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // If category is being updated, verify it exists
    if (validatedData.category) {
      const categoryExists = await Category.findById(validatedData.category);
      if (!categoryExists) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 400 }
        );
      }
    }
    
    // Update product (no slug handling needed)
    const product = await Product.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');
    
    return NextResponse.json({
      message: 'Product updated successfully',
      product
    });
    
  } catch (error: any) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id] - Delete product (Admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    await requireAdmin();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Soft delete by setting isActive to false
    await Product.findByIdAndUpdate(id, { isActive: false });
    
    return NextResponse.json({
      message: 'Product deleted successfully'
    });
    
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
