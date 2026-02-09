'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProducts } from '@/lib/actions/products';
import { Star } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: 'all', label: 'Search' },
    { id: 'popular', label: 'Most Popular - 1kg' },
    { id: 'value', label: 'Best Value - 5kg' },
    { id: 'starter', label: 'Starter Pack - 500g' },
  ];

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#C8E6D5] to-[#E8F5ED] py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#2C5F3F] mb-4">
                Shop your Healthy<br />Cassava Flour<br />Here!
              </h1>
              <p className="text-[#4A7C59] text-lg mb-2">
                Shop wholesome cassava flour made with care by local women.
              </p>
              <p className="text-[#4A7C59] mb-2">Healthy, locally made, and easy to cook with.</p>
              <p className="text-[#4A7C59]">Every purchase supports better livelihoods.</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/80 rounded-2xl p-8 shadow-xl">
                <div className="text-6xl text-center mb-4">👨‍👩‍👧‍👦</div>
                <div className="text-center text-[#2C5F3F] font-semibold">Supporting Local Families</div>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 mt-8">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === f.id
                    ? 'bg-[#4A7C59] text-white'
                    : 'bg-white text-[#4A7C59] hover:bg-[#C8E6D5]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#4A7C59]">Loading products...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border-[#C8E6D5]"
              >
                <div className="h-56 bg-gradient-to-br from-[#C8E6D5] to-[#E8F5ED] flex items-center justify-center p-6">
                  <div className="text-7xl">🌾</div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold text-[#2C5F3F] mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                    <span className="text-sm text-[#4A7C59]">4.5</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-[#4A7C59]">📍 Freetown</span>
                    <span className="text-sm text-[#4A7C59]">• {product.weightKg}kg</span>
                  </div>
                  <div className="text-sm text-[#4A7C59] mb-4">
                    <span className="font-semibold">Vendor:</span> {product.vendorId?.name || 'Wi Root'}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#2C5F3F]">Le{product.price.toFixed(1)}</span>
                    <Link href={`/products/${product._id}`}>
                      <Button className="bg-[#5C9776] hover:bg-[#4A7C59] text-white rounded-lg">
                        Check Out 🛒
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-[#4A7C59] hover:bg-[#2C5F3F] text-white px-12 py-6 text-lg rounded-lg"
          >
            See More
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4A7C59] text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Wi Root</h3>
              <p className="text-white/90 leading-relaxed">
                Wi Root – Pure cassava flour empowering women farmers in Sierra Leone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/90 hover:text-white">▸ Home</Link></li>
                <li><Link href="/shop" className="text-white/90 hover:text-white">▸ Shop</Link></li>
                <li><Link href="/recipes" className="text-white/90 hover:text-white">▸ Recipes / Ideas</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact & Support</h3>
              <p className="text-white/90">📍 251 Regent Road, Freetown</p>
              <p className="text-white/90">✉️ info@wiroot.sl</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80">© 2026 Wi Root. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}