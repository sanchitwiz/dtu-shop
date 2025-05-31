// app/api/cart/remove/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Cart from '@/models/Cart';

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { itemId } = await request.json();
    
    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const cart = await Cart.findOne({ user: session.user.id });
    
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter((item: { _id: string }) => item._id.toString() !== itemId);
    await cart.save();

    return NextResponse.json({
      message: 'Item removed from cart successfully',
      cart
    });

  } catch (error: any) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
