'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { getOrderDetails } from '@/lib/actions/orders';
import { Package, MapPin, CreditCard, Leaf, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function OrderDetailPage() {
  const params = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderDetails();
  }, []);

  const loadOrderDetails = async () => {
    try {
      const data = await getOrderDetails(params.id);
      setOrderData(data);
    } catch (error) {
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Order not found</p>
        </div>
      </div>
    );
  }

  const { order, items, payment, delivery } = orderData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Order Details</h1>
          <p className="text-gray-600">{order.orderNumber}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-green-800">Order Items</h2>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded flex items-center justify-center flex-shrink-0">
                        <Leaf className="h-10 w-10 text-green-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-green-800">{item.productId?.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Unit Price: Le {item.unitPrice.toFixed(2)}</p>
                      </div>
                      <p className="font-bold text-green-600">Le {(item.quantity * item.unitPrice).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            {delivery && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-green-800">Delivery Information</h2>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-gray-700">Address:</span>
                      <p className="text-gray-600">{delivery.deliveryAddress}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Status:</span>
                      <p className="text-gray-600">{delivery.deliveryStatus}</p>
                    </div>
                    {delivery.deliveredAt && (
                      <div>
                        <span className="font-semibold text-gray-700">Delivered At:</span>
                        <p className="text-gray-600">{new Date(delivery.deliveredAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Status</span>
                    <span className="font-semibold">{order.status}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Order Date</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-green-800">
                    <span>Total</span>
                    <span>Le {order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            {payment && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-green-800">Payment</h2>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Method</span>
                      <span className="font-semibold">{payment.paymentMethod.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Status</span>
                      <span className="font-semibold">{payment.paymentStatus}</span>
                    </div>
                    {payment.transactionRef && (
                      <div className="flex justify-between text-gray-700">
                        <span>Reference</span>
                        <span className="text-sm">{payment.transactionRef}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}