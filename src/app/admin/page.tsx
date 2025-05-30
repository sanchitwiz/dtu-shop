// app/admin/page.tsx
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { requireAdmin } from '@/lib/auth/adminAuth';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const admin = await requireAdmin();

  // Mock data - replace with real database queries
  const stats = {
    totalUsers: 150,
    totalProducts: 45,
    totalOrders: 89,
    revenue: 15420
  };

  const recentActivity = [
    { id: 1, action: 'New user registered', user: 'john.doe@college.edu', time: '2 minutes ago' },
    { id: 2, action: 'Order placed', user: 'jane.smith@college.edu', time: '5 minutes ago' },
    { id: 3, action: 'Product added', user: 'admin@college.edu', time: '10 minutes ago' },
    { id: 4, action: 'User updated profile', user: 'mike.wilson@college.edu', time: '15 minutes ago' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {admin.name}!</h2>
          <p className="text-gray-600 mt-1">Here's what's happening in your college marketplace today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+8% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in your marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                    <Badge variant="outline">{activity.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Add New Product</div>
                <div className="text-sm text-gray-500">Create a new product listing</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-gray-500">View and manage user accounts</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-gray-500">Generate sales and activity reports</div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
