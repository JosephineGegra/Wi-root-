import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star } from 'lucide-react';

export default async function VendorsPage() {
  const mockVendors = [
    {
      _id: '1',
      name: 'Fatmata Farm',
      location: 'Freetown',
      phone: '+232 76 123 456',
      bio: 'Women-led cooperative producing premium cassava flour since 2018.',
      productsCount: 3,
    },
    {
      _id: '2',
      name: 'Mariama Enterprises',
      location: 'Bo',
      phone: '+232 77 234 567',
      bio: 'Family business specializing in organic cassava processing.',
      productsCount: 2,
    },
    {
      _id: '3',
      name: 'Kadiatu Cassava Co',
      location: 'Makeni',
      phone: '+232 78 345 678',
      bio: 'Award-winning cooperative empowering rural women.',
      productsCount: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      <div className="bg-gradient-to-b from-[#4A7C59] to-[#2C5F3F] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Vendors</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the amazing women entrepreneurs behind Wi Root cassava flour.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockVendors.map((vendor) => (
            <Card key={vendor._id} className="bg-white shadow-lg">
              <div className="h-48 bg-gradient-to-br from-[#C8E6D5] to-[#E8F5ED] flex items-center justify-center text-7xl">
                👩‍🌾
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#2C5F3F] mb-3">{vendor.name}</h3>
                <div className="space-y-2 mb-4 text-[#4A7C59]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{vendor.phone}</span>
                  </div>
                </div>
                <p className="text-[#4A7C59] mb-4">{vendor.bio}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm font-semibold">{vendor.productsCount} Products</span>
                  <Link href="/shop">
                    <Button className="bg-[#5C9776] hover:bg-[#4A7C59]">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <footer className="bg-[#2C5F3F] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 Wi Root. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
