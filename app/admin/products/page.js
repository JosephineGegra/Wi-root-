'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getAllProducts, createProduct, updateStock } from '@/lib/actions/admin';
import { getAllVendors } from '@/lib/actions/admin';
import { toast } from 'sonner';
import { Plus, Leaf } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vendorId: '',
    weightKg: '',
    price: '',
    stockQuantity: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, vendorsData] = await Promise.all([
        getAllProducts(),
        getAllVendors(),
      ]);
      setProducts(productsData);
      setVendors(vendorsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...formData,
        weightKg: parseFloat(formData.weightKg),
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
      });
      toast.success('Product created');
      setDialogOpen(false);
      setFormData({ name: '', description: '', vendorId: '', weightKg: '', price: '', stockQuantity: '' });
      await loadData();
    } catch (error) {
      toast.error(error.message || 'Failed to create product');
    }
  };

  const handleStockUpdate = async (productId, newStock) => {
    try {
      await updateStock(productId, parseInt(newStock));
      toast.success('Stock updated');
      await loadData();
    } catch (error) {
      toast.error('Failed to update stock');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-800">Manage Products</h1>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-5 w-5" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="vendor">Vendor *</Label>
                  <Select value={formData.vendorId} onValueChange={(value) => setFormData({ ...formData, vendorId: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor._id} value={vendor._id}>{vendor.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="weightKg">Weight (kg) *</Label>
                    <Input
                      id="weightKg"
                      type="number"
                      step="0.1"
                      value={formData.weightKg}
                      onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (Le) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockQuantity">Stock *</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Create Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="border-green-200">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Leaf className="h-20 w-20 text-green-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-green-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Vendor: {product.vendorId?.name}</p>
                <p className="text-sm text-gray-600 mb-2">{product.weightKg}kg - Le {product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Label className="text-sm">Stock:</Label>
                  <Input
                    type="number"
                    defaultValue={product.stockQuantity}
                    onBlur={(e) => handleStockUpdate(product._id, e.target.value)}
                    className="w-20 h-8"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}