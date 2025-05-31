// components/home/HeroSection.tsx - Updated with working search
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Star, Users, Package } from 'lucide-react';

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">Trusted by 10,000+ Students</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Campus
                <span className="text-blue-600"> Marketplace</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Buy and sell with fellow students. From textbooks to electronics, 
                find everything you need for college life at unbeatable prices.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-20 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-2 h-12 px-6"
                disabled={!search.trim()}
              >
                Search
              </Button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Join Marketplace
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students using marketplace"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">₹</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Save up to 70%</div>
                  <div className="text-xs text-gray-500">on textbooks</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Safe & Secure</div>
                  <div className="text-xs text-gray-500">transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
