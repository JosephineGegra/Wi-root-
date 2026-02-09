'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllOrders, updateOrderStatus, updateDeliveryStatus } from '@/lib/actions/orders';
import { toast } from 'sonner';
import { Package } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success('Order status updated');
      await loadOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeliveryStatusUpdate = async (orderId, deliveryStatus) => {
    try {
      await updateDeliveryStatus(orderId, deliveryStatus);
      toast.success('Delivery status updated');
      await loadOrders();
    } catch (error) {
      toast.error('Failed to update delivery status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Manage Orders</h1>

        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-500">Orders will appear here once customers start placing them</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="border-green-200">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-bold text-green-800">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-xl font-bold text-green-600 mt-2">Le {order.totalAmount.toFixed(2)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Order Status</p>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleOrderStatusUpdate(order._id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PROCESSING">Processing</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Delivery Status</p>
                      <Select
                        defaultValue="PENDING"
                        onValueChange={(value) => handleDeliveryStatusUpdate(order._id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`/orders/${order._id}`, '_blank')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}