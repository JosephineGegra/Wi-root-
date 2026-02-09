import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { getProducts } from '@/lib/actions/products';
import { Leaf } from 'lucide-react';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Browse our collection of premium cassava flour</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Leaf className="h-24 w-24 text-green-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-green-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.weightKg}kg</p>
                <p className="text-sm text-gray-500 mb-4">Stock: {product.stockQuantity}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">Le {product.price.toFixed(2)}</span>
                  <Link href={`/products/${product._id}`}>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}