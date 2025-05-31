// app/admin/orders/page.tsx
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { requireAdmin } from '@/lib/auth/adminAuth';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default async function AdminOrders() {
  await requireAdmin();
  await dbConnect();

  // Fetch orders with user information
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(50)
    .lean() as any[];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'processing': return 'default';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      case 'refunded': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <AdminLayout title="Order Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="text-gray-600">Manage customer orders</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Total: {orders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Order #</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Items</th>
                    <th className="text-left p-3">Total</th>
                    <th className="text-left p-3">Payment</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id.toString()} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">{order.orderNumber}</div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{order.user?.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{order.user?.email}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{formatPrice(order.totalAmount)}</div>
                      </td>
                      <td className="p-3">
                        <Badge variant={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={getStatusColor(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <Link href={`/admin/orders/${order._id.toString()}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
