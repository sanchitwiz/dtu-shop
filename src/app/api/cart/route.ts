// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Cart from '@/models/Cart';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();

    const cart = await Cart.findOne({ user: session.user.id })
      .populate({
        path: 'items.product',
        select: 'name price images quantity category',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .lean();

    return NextResponse.json({
      cart: cart || { items: [], totalAmount: 0 }
    });

  } catch (error: any) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}
