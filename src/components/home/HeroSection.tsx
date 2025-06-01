// components/home/HeroSection.tsx - Simplified with product slideshow
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // Product images for slideshow
  const productImages = [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Books
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Electronics
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Furniture
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Clothing
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Stationery
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [productImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="bg-white border-b border-gray-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 px-4 py-2 inline-block">
                <span className="text-sm font-medium text-red-800">Official DTU Student Marketplace</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Find Everything You Need
                <span className="block text-red-600">For Campus Life</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                Browse thousands of products from fellow DTU students. From textbooks to electronics, 
                discover great deals within your campus community.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-lg">
              <div className="flex border border-gray-300 mt-2 rounded-2xl">
                <div className="relative flex-1 ">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-base border-0 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 border-0 mt-1.5 mr-2"
                  disabled={!search.trim()}
                >
                  Search
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50 px-8 py-3">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Product Images Slideshow */}
          <div className="relative">
            <div className="bg-gray-100 border border-gray-300 overflow-hidden h-96">
              {/* Main Slideshow Image */}
              <div className="relative h-full">
                <img
                  src={productImages[currentImageIndex]}
                  alt="Product showcase"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
                
                {/* Overlay with product category */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 border border-gray-300">
                  <span className="text-sm font-medium text-gray-800">
                    {currentImageIndex === 0 && 'Textbooks & Study Materials'}
                    {currentImageIndex === 1 && 'Electronics & Gadgets'}
                    {currentImageIndex === 2 && 'Furniture & Home Decor'}
                    {currentImageIndex === 3 && 'Clothing & Accessories'}
                    {currentImageIndex === 4 && 'Stationery & Supplies'}
                  </span>
                </div>
              </div>
              
              {/* Slideshow Indicators */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 border border-white transition-colors ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
