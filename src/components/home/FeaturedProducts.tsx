// components/home/FeaturedProducts.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: {
    name: string;
  };
}

interface FeaturedProductsProps {
  products: any[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const calculateDiscount = (price: number, comparePrice: number) => {
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked deals from your fellow students
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={product.images[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.comparePrice && (
                    <Badge className="absolute top-3 left-3 bg-red-500">
                      {calculateDiscount(product.price, product.comparePrice)}% OFF
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category.name}
                  </Badge>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
