'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createOrderFromCart } from '@/lib/actions/orders';
import { toast } from 'sonner';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'MOBILE_MONEY',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const deliveryAddress = `${formData.address}, ${formData.city}`;
      const order = await createOrderFromCart(deliveryAddress, formData.paymentMethod);
      
      toast.success('Order placed successfully!');
      router.push(`/orders/${order._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Shipping Information</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+232 XX XXX XXXX"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Freetown"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Payment Method</h2>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  className="space-y-4"
                >
                  <Card className="cursor-pointer hover:border-green-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="MOBILE_MONEY" id="mobile" />
                        <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 text-green-600" />
                          <span className="font-semibold">Mobile Money</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-green-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="CARD" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-green-600" />
                          <span className="font-semibold">Credit/Debit Card</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-green-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="CASH" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Banknote className="h-5 w-5 text-green-600" />
                          <span className="font-semibold">Cash on Delivery</span>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>

                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> This is a mock payment system. Your order will be placed immediately.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}