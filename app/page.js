import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { getProducts } from '@/lib/actions/products';
import { ShoppingBag, Heart, Leaf, Award } from 'lucide-react';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6">
            Healthy Flour, <br />
            <span className="text-green-600">Happy Families</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Premium cassava flour from women-led vendors. Natural, nutritious, and sustainably sourced.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8">
                Shop Now
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">100% Natural</h3>
              <p className="text-gray-600">Pure cassava flour with no additives or preservatives</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Women Empowerment</h3>
              <p className="text-gray-600">Supporting women-led businesses in our community</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully processed and quality-checked cassava flour</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Featured Products</h2>
          <p className="text-gray-600">Explore our best-selling cassava flour options</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden border-green-100 hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Leaf className="h-32 w-32 text-green-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.weightKg}kg</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">Le {product.price.toFixed(2)}</span>
                  <Link href={`/products/${product._id}`}>
                    <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">Wi Root - Empowering Communities Through Quality Cassava Flour</p>
          <p className="text-green-200">© 2026 Wi Root. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}