// components/home/CategorySection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  image?: string;
  slug: string;
}

interface CategorySectionProps {
  categories: any[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need from our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {category.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/categories">
            <Button variant="outline" size="lg">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
