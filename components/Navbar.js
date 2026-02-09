'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Header */}
      <div className="bg-[#C8E6D5] border-b border-[#4A7C59]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-[#2C5F3F] font-bold text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="italic">Wi</span> <span className="font-bold">Root</span>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-[#4A7C59]/30 rounded-full"
                />
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <Link href="/cart">
                <Button
                  size="icon"
                  className="rounded-full bg-[#5C9776] hover:bg-[#4A7C59] text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>

              {isSignedIn ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10 rounded-full',
                    },
                  }}
                />
              ) : (
                <Link href="/sign-in">
                  <Button
                    size="icon"
                    className="rounded-full bg-[#C8E6D5] hover:bg-[#B5D9C8] text-[#2C5F3F] border border-[#4A7C59]"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-[#C8E6D5] border-b border-[#4A7C59]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3">
            <Link
              href="/"
              className="text-[#2C5F3F] hover:text-[#4A7C59] font-semibold text-base transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-[#2C5F3F] hover:text-[#4A7C59] font-semibold text-base transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/our-impact"
              className="text-[#2C5F3F] hover:text-[#4A7C59] font-semibold text-base transition-colors"
            >
              Our Impact
            </Link>
            <Link
              href="/vendors"
              className="text-[#2C5F3F] hover:text-[#4A7C59] font-semibold text-base transition-colors"
            >
              Vendors
            </Link>
            <Link
              href="/recipes"
              className="text-[#2C5F3F] hover:text-[#4A7C59] font-semibold text-base transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/contact"
              className="text-[#2C5F3F] hover:text-[#4A7C59] font-semibold text-base transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}