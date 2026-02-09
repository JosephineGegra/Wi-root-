'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserOrders } from '@/lib/actions/orders';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const STATUS_CONFIG = {
  PENDING: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pending' },
  PROCESSING: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Processing' },
  SHIPPED: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Shipped' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' },
  CANCELLED: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelled' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status];
              const StatusIcon = statusConfig.icon;

              return (
                <Card key={order._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-green-800">{order.orderNumber}</h3>
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                            <StatusIcon className="h-4 w-4" />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-2xl font-bold text-green-600 mt-2">Le {order.totalAmount.toFixed(2)}</p>
                      </div>

                      <Link href={`/orders/${order._id}`}>
                        <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}