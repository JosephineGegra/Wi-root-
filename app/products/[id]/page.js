import Navbar from '@/components/Navbar';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getProduct } from '@/lib/actions/products';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }) {
  const productData = await getProduct(params.id);

  if (!productData || !productData.product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProductDetailClient productData={productData} />
    </div>
  );
}