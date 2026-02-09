'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCart, updateCartItem, removeCartItem } from '@/lib/actions/cart';
import { Leaf, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      await loadCart();
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      await loadCart();
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Button onClick={() => router.push('/products')} className="bg-green-600 hover:bg-green-700">
              Browse Products
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded flex items-center justify-center flex-shrink-0">
                        <Leaf className="h-12 w-12 text-green-300" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-green-800 mb-1">
                          {item.productId?.name || 'Product'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.productId?.weightKg}kg
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                          Le {item.unitPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-lg font-bold text-green-800">
                          Le {(item.unitPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>Le {cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-xl font-bold text-green-800">
                      <span>Total</span>
                      <span>Le {cart.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}