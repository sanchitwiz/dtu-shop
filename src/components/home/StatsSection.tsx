// components/home/StatsSection.tsx
import { Users, Package, Star, TrendingUp } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: '10,000+',
      label: 'Active Students',
      description: 'Trusted community members'
    },
    {
      icon: Package,
      number: '50,000+',
      label: 'Products Sold',
      description: 'Successful transactions'
    },
    {
      icon: Star,
      number: '4.8/5',
      label: 'Average Rating',
      description: 'Customer satisfaction'
    },
    {
      icon: TrendingUp,
      number: '₹2M+',
      label: 'Money Saved',
      description: 'By students this year'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by Students Everywhere
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of students who are already saving money and finding great deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-blue-100 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-blue-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
