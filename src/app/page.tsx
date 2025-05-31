// app/page.tsx - Beautiful homepage
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import StatsSection from '@/components/home/StatsSection';
// import TestimonialsSection from '@/components/home/TestimonialsSection';
// import CTASection from '@/components/home/CTASection';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { serializeProduct, serializeCategory } from '@/lib/utils/serialization';


export default async function HomePage() {
  await dbConnect();

  // Fetch featured products and categories
  // const [featuredProducts, categories] = await Promise.all([
  //   Product.find({ isFeatured: true, isActive: true })
  //     .populate('category', 'name')
  //     .limit(8)
  //     .lean(),
  //   Category.find({ isActive: true })
  //     .sort({ sortOrder: 1 })
  //     .limit(6)
  //     .lean()
  // ]);

  const [featuredProductsRaw, categoriesRaw] = await Promise.all([
    Product.find({ isFeatured: true, isActive: true })
      .populate('category', 'name')
      .limit(8)
      .lean(),
    Category.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .limit(6)
      .lean()
  ]);

  const featuredProducts = featuredProductsRaw.map(serializeProduct);
  const categories = categoriesRaw.map(serializeCategory);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <StatsSection />
    </div>
  );
}
