import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { getProducts } from '@/lib/actions/products';
import { getFeaturedRecipes } from '@/lib/actions/recipes';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#C8E6D5] to-[#E8F5ED] overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C5F3F] leading-tight">
                Healthy Flour,<br />
                <span className="text-[#2C5F3F]">Happy Families.</span>
              </h1>
              <div className="space-y-3 text-[#4A7C59] text-lg">
                <p>Naturally gluten-free, wholesome, and delicious.</p>
                <p>Every bite of cassava flour nourishes your body and supports healthy living.</p>
                <p>Fuel your day, empower your health, and enjoy the goodness of nature.</p>
              </div>
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-[#2C5F3F] hover:bg-[#1F4A2E] text-white px-8 py-6 text-lg rounded-lg mt-4"
                >
                  Order Now
                </Button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-full bg-gradient-to-br from-[#5C9776]/30 to-transparent p-8">
                <div className="w-full h-full rounded-full overflow-hidden bg-white/80 shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-48 h-48 mx-auto mb-4 bg-[#C8E6D5] rounded-full flex items-center justify-center">
                      <div className="text-6xl">🌾</div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C5F3F]">Premium Cassava Flour</h3>
                    <p className="text-[#4A7C59] mt-2">100% Natural & Gluten-Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#4A7C59"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#4A7C59] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h2 className="text-4xl font-bold">Wi Root</h2>
            <p className="text-xl leading-relaxed">
              Wi Root – Pure cassava flour empowering women farmers in Sierra Leone.
            </p>
            <p className="text-lg opacity-90">
              In collaboration with Innovation SL, we bring nutritious, wholesome food from the soil to your table.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#E8F5ED]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2C5F3F] mb-4">Shop Our Products</h2>
            <p className="text-[#4A7C59] text-lg">Pure, wholesome cassava flour in various sizes</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 bg-gradient-to-br from-[#C8E6D5] to-[#E8F5ED] flex items-center justify-center p-8">
                  <div className="text-8xl">🌾</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F3F] mb-2">{product.name}</h3>
                  <p className="text-[#4A7C59] mb-4">{product.weightKg}kg</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#2C5F3F]">Le {product.price.toFixed(2)}</span>
                    <Link href={`/products/${product._id}`}>
                      <Button className="bg-[#5C9776] hover:bg-[#4A7C59] text-white rounded-lg">
                        Check Out
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-[#4A7C59] hover:bg-[#2C5F3F] text-white px-12 py-6 text-lg rounded-lg"
              >
                See More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A7C59] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Wi Root Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Wi Root</h3>
              <p className="text-white/90 leading-relaxed">
                Wi Root – Pure cassava flour empowering women farmers in Sierra Leone.
                In collaboration with Innovation SL, we bring nutritious, wholesome food from the soil to your table.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span>f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span>in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span>📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span>X</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/90 hover:text-white">▸ Home</Link></li>
                <li><Link href="/shop" className="text-white/90 hover:text-white">▸ Shop</Link></li>
                <li><Link href="/our-impact" className="text-white/90 hover:text-white">▸ Our Impact</Link></li>
                <li><Link href="/recipes" className="text-white/90 hover:text-white">▸ Recipes / Ideas</Link></li>
                <li><Link href="/contact" className="text-white/90 hover:text-white">▸ Contact</Link></li>
                <li><Link href="/faq" className="text-white/90 hover:text-white">▸ FAQs</Link></li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact & Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span className="text-white/90">251 Regent Road, Freetown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✉️</span>
                  <span className="text-white/90">info@wiroot.sl</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📞</span>
                  <span className="text-white/90">+232 90 829241 / 073 789890</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/80">
              © 2026 Wi Root. All Rights Reserved. In collaboration with Innovation SL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}