'use client';

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold text-green-700">Wi Root</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium">
              Products
            </Link>

            {isSignedIn ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-green-600 font-medium">
                  Orders
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10',
                    },
                  }}
                />
              </>
            ) : (
              <Link href="/sign-in">
                <Button className="bg-green-600 hover:bg-green-700">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}