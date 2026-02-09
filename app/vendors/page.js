import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star } from 'lucide-react';
import { getAllVendors } from '@/lib/actions/admin';

export default async function VendorsPage() {
  // For now, use the existing vendors from the database
  const mockVendors = [
    {
      _id: '1',
      name: 'Fatmata\'s Farm',
      location: 'Freetown',
      phone: '+232 76 123 456',
      bio: 'Women-led cooperative producing premium cassava flour since 2018. Supporting 25 local farmers with sustainable practices and fair trade principles.',
      isActive: true,
      productsCount: 3,
    },
    {
      _id: '2',
      name: 'Mariama Enterprises',
      location: 'Bo',
      phone: '+232 77 234 567',
      bio: 'Family business specializing in organic cassava processing. Traditional methods meet modern quality standards for the best cassava flour.',
      isActive: true,
      productsCount: 2,
    },
    {
      _id: '3',
      name: 'Kadiatu\'s Cassava Co.',
      location: 'Makeni',
      phone: '+232 78 345 678',
      bio: 'Award-winning women\'s cooperative empowering rural women through sustainable cassava farming and processing.',
      isActive: true,
      productsCount: 3,
    },
  ];

  return (
    <div className=\"min-h-screen bg-[#E8F5ED]\">
      <Navbar />

      {/* Hero Section */}
      <div className=\"bg-gradient-to-b from-[#4A7C59] to-[#2C5F3F] text-white py-20\">
        <div className=\"container mx-auto px-4 text-center\">
          <h1 className=\"text-5xl font-bold mb-6\">Our Vendors</h1>
          <p className=\"text-xl max-w-3xl mx-auto leading-relaxed\">
            Meet the amazing women entrepreneurs behind Wi Root cassava flour.
            Each vendor brings dedication, quality, and tradition to every product.
          </p>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className=\"container mx-auto px-4 py-16\">
        <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">
          {mockVendors.map((vendor) => (
            <Card key={vendor._id} className=\"bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden\">
              <div className=\"h-48 bg-gradient-to-br from-[#C8E6D5] to-[#E8F5ED] flex items-center justify-center\">
                <div className=\"text-7xl\">👩‍🌾</div>
              </div>
              <CardContent className=\"p-6\">
                <h3 className=\"text-2xl font-bold text-[#2C5F3F] mb-3\">{vendor.name}</h3>
                
                <div className=\"space-y-2 mb-4\">
                  <div className=\"flex items-center gap-2 text-[#4A7C59]\">
                    <MapPin className=\"h-4 w-4\" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className=\"flex items-center gap-2 text-[#4A7C59]\">
                    <Phone className=\"h-4 w-4\" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className=\"flex items-center gap-1\">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className=\"h-4 w-4 fill-orange-400 text-orange-400\" />
                    ))}
                    <span className=\"text-sm text-[#4A7C59] ml-1\">4.8 (50+ reviews)</span>
                  </div>
                </div>

                <p className=\"text-[#4A7C59] mb-4 leading-relaxed\">{vendor.bio}</p>

                <div className=\"flex items-center justify-between pt-4 border-t border-[#C8E6D5]\">
                  <span className=\"text-sm text-[#4A7C59] font-semibold\">
                    {vendor.productsCount} Products
                  </span>
                  <Link href={`/shop?vendor=${vendor._id}`}>
                    <Button className=\"bg-[#5C9776] hover:bg-[#4A7C59] text-white rounded-lg\">
                      View Products
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className=\"bg-[#4A7C59] py-16\">
        <div className=\"container mx-auto px-4 text-center text-white\">
          <h2 className=\"text-4xl font-bold mb-6\">Want to Become a Vendor?</h2>
          <p className=\"text-xl mb-8 max-w-2xl mx-auto\">
            Join our network of women entrepreneurs and bring your cassava flour to customers across Sierra Leone.
          </p>
          <Link
            href=\"/contact\"
            className=\"inline-block bg-white text-[#4A7C59] px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#E8F5ED] transition-colors\"
          >
            Contact Us to Join
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className=\"bg-[#2C5F3F] text-white py-12\">
        <div className=\"container mx-auto px-4\">
          <div className=\"grid md:grid-cols-3 gap-8\">
            <div>
              <h3 className=\"text-2xl font-bold mb-4\">Wi Root</h3>
              <p className=\"text-white/90\">Empowering women farmers in Sierra Leone.</p>
            </div>
            <div>
              <h3 className=\"text-xl font-bold mb-4\">Quick Links</h3>
              <ul className=\"space-y-2\">
                <li><Link href=\"/\" className=\"text-white/90 hover:text-white\">▸ Home</Link></li>
                <li><Link href=\"/shop\" className=\"text-white/90 hover:text-white\">▸ Shop</Link></li>
                <li><Link href=\"/vendors\" className=\"text-white/90 hover:text-white\">▸ Vendors</Link></li>
              </ul>
            </div>
            <div>
              <h3 className=\"text-xl font-bold mb-4\">Contact</h3>
              <p className=\"text-white/90\">📍 251 Regent Road, Freetown</p>
              <p className=\"text-white/90\">✉️ info@wiroot.sl</p>
            </div>
          </div>
          <div className=\"text-center mt-8 pt-8 border-t border-white/20\">
            <p className=\"text-white/80\">© 2026 Wi Root. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
