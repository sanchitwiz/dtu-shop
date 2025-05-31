// app/categories/page.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { Package, ArrowRight } from 'lucide-react';

export default async function CategoriesPage() {
  await dbConnect();

  // Fetch categories with product counts
  const categoriesRaw = await Category.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .lean();

  // Get product counts for each category
  const categoriesWithCounts = await Promise.all(
    categoriesRaw.map(async (category: any) => {
      const productCount = await Product.countDocuments({
        category: category._id,
        isActive: true
      });

      return {
        _id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        image: category.image,
        sortOrder: category.sortOrder,
        productCount
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you need for your college life
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesWithCounts.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    {/* Category Image/Icon */}
                    <div className="relative">
                      {category.image ? (
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Package className="w-10 h-10 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* View Category Button */}
                    <div className="pt-2">
                      <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                        Browse Products
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {categoriesWithCounts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Categories will appear here once they are added.</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Marketplace Overview
            </h2>
            <p className="text-gray-600">
              Discover what makes our marketplace special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {categoriesWithCounts.length}
              </div>
              <div className="text-gray-600">Categories Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categoriesWithCounts.reduce((sum, cat) => sum + cat.productCount, 0)}
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Available Shopping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
