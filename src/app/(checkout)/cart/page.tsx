// app/cart/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  CreditCard,
  Loader2 
} from 'lucide-react';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    quantity: number;
    category: {
      name: string;
    };
  };
  quantity: number;
  price: number;
  selectedVariants?: {
    type: string;
    value: string;
    price: number;
  }[];
}

interface Cart {
  _id: string;
  items: CartItem[];
  totalAmount: number;
}

export default function CartPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin?callbackUrl=/cart');
      return;
    }

    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => new Set(prev).add(itemId));
    
    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });

      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

// In your cart page component
  const removeItem = async (itemId: string) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'DELETE', // Make sure this is DELETE, not POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }), // Make sure itemId is being passed correctly
      });

      if (response.ok) {
        toast.success('Item removed from cart');
        await fetchCart(); // Refresh cart data
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('An error occurred while removing item');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getItemTotal = (item: CartItem) => {
    const variantPrice = item.selectedVariants?.reduce((sum, variant) => sum + variant.price, 0) || 0;
    return (item.price + variantPrice) * item.quantity;
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please sign in to checkout');
      router.push('/auth/signin?callbackUrl=/cart');
      return;
    }

    setIsProcessingCheckout(true);

    try {
      // Validate cart items before checkout
      const response = await fetch('/api/cart/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to checkout page
        router.push('/checkout');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Unable to proceed to checkout');
        
        // Refresh cart to show updated availability
        await fetchCart();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Link href="/products">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item._id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.images[0] || '/placeholder-product.jpg'}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link 
                              href={`/products/${item.product._id}`}
                              className="hover:text-blue-600"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">{item.product.category.name}</p>
                          
                          {/* Selected Variants */}
                          {item.selectedVariants && item.selectedVariants.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {item.selectedVariants.map((variant, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {variant.type}: {variant.value}
                                    {variant.price > 0 && ` (+${formatPrice(variant.price)})`}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent any form submission
                            e.stopPropagation(); // Stop event bubbling
                            removeItem(item._id); // Make sure item._id is correct
                          }}
                          disabled={updatingItems.has(item._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          {updatingItems.has(item._id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>

                      </div>

                      {/* Price and Quantity */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updatingItems.has(item._id)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max={item.product.quantity}
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1;
                                if (newQuantity !== item.quantity) {
                                  updateQuantity(item._id, newQuantity);
                                }
                              }}
                              className="w-16 h-8 text-center border-0 focus:ring-0"
                              disabled={updatingItems.has(item._id)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.quantity || updatingItems.has(item._id)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(getItemTotal(item))}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.price + (item.selectedVariants?.reduce((sum, v) => sum + v.price, 0) || 0))} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
{/* Order Summary */}
<div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.items.length} items)</span>
                    <span>{formatPrice(cart.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">
                      {cart.totalAmount > 500 ? 'Free' : formatPrice(50)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span>{formatPrice(Math.round(cart.totalAmount * 0.18))}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      cart.totalAmount + 
                      Math.round(cart.totalAmount * 0.18) + 
                      (cart.totalAmount > 500 ? 0 : 50)
                    )}
                  </span>
                </div>

                {cart.totalAmount <= 500 && (
                  <p className="text-sm text-gray-600">
                    Add {formatPrice(500 - cart.totalAmount)} more for free shipping
                  </p>
                )}

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessingCheckout || cart.items.length === 0}
                >
                  {isProcessingCheckout ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link href="/products" className="text-red-600 hover:underline text-sm">
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-50 p-3 border border-gray-200 text-center">
                  <p className="text-xs text-gray-600">
                    🔒 Secure checkout powered by DTU Shop
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
