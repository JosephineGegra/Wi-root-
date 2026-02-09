'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, ShoppingCart, Star } from 'lucide-react';
import { addToCart } from '@/lib/actions/cart';
import { toast } from 'sonner';

export default function ProductDetailClient({ productData }) {
  const { product, reviews } = productData;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product._id, quantity);
      toast.success('Added to cart!');
      router.push('/cart');
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        toast.error('Please sign in to add items to cart');
        router.push('/sign-in');
      } else {
        toast.error('Failed to add to cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="h-96 lg:h-full bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
          <Leaf className="h-48 w-48 text-green-300" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= avgRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-green-600">Le {product.price.toFixed(2)}</span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Weight:</span>
              <span className="text-gray-600">{product.weightKg}kg</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Stock:</span>
              <span className="text-gray-600">{product.stockQuantity} available</span>
            </div>
            {product.vendorId && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Vendor:</span>
                <span className="text-gray-600">{product.vendorId.name}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'Premium quality cassava flour, perfect for all your baking and cooking needs. Sourced from local women-led farms and processed with care to maintain nutritional value.'}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={loading || product.stockQuantity === 0}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {loading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Customer Reviews</h2>
        
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review._id} className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}