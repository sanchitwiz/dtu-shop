// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Cart from '@/models/Cart';
import Product from '@/models/Product';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { productId, quantity = 1, selectedVariants = [] } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify product exists and is active
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: 'Product not found or unavailable' },
        { status: 404 }
      );
    }

    // Check stock availability
    if (product.quantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ user: session.user.id });
    
    if (!cart) {
      cart = new Cart({
        user: session.user.id,
        items: []
      });
    }

    // Check if product with same variants already exists in cart
    const existingItemIndex = cart.items.findIndex((item: { product: string; quantity: number; selectedVariants?: { type: string; value: string }[] }) => {
      if (item.product.toString() !== productId) return false;
      
      // Compare variants
      if (selectedVariants.length !== (item.selectedVariants?.length || 0)) return false;
      
    interface Variant {
        type: string;
        value: string;
    }

    interface CartItem {
        product: string;
        quantity: number;
        selectedVariants?: Variant[];
    }

    return selectedVariants.every((variant: Variant) => 
        item.selectedVariants?.some((itemVariant: Variant) => 
            itemVariant.type === variant.type && itemVariant.value === variant.value
        )
    );
    });

    if (existingItemIndex > -1) {
      // Update quantity if product with same variants already in cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        selectedVariants
      });
    }

    await cart.save();

    return NextResponse.json({
      message: 'Product added to cart successfully',
      cart
    });

  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add product to cart' },
      { status: 500 }
    );
  }
}
