'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { getImpactStories } from '@/lib/actions/impact';
import { Users, TrendingUp, Heart } from 'lucide-react';

export default function OurImpactPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const data = await getImpactStories();
      setStories(data);
    } catch (error) {
      console.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  // Mock data
  const metrics = [
    { icon: Users, label: 'Women Employed', value: '150+', color: 'bg-blue-500' },
    { icon: Heart, label: 'Families Supported', value: '500+', color: 'bg-pink-500' },
    { icon: TrendingUp, label: 'Income Generated', value: 'Le 10M+', color: 'bg-green-500' },
  ];

  const mockStories = [
    {
      _id: '1',
      title: 'Fatmata\'s Story',
      vendorName: 'Fatmata\'s Farm',
      location: 'Freetown',
      description: 'Supporting 25 local women farmers and their families through sustainable cassava farming. Our cooperative has transformed lives by providing stable income and empowering women in our community.',
      metrics: { womenEmployed: 25, familiesSupported: 75, incomeGenerated: 500000 },
    },
    {
      _id: '2',
      title: 'Mariama\'s Enterprise',
      vendorName: 'Mariama Enterprises',
      location: 'Bo',
      description: 'A family business that has grown into a thriving enterprise, supporting education for children and healthcare for families. Traditional methods meet modern quality standards.',
      metrics: { womenEmployed: 15, familiesSupported: 50, incomeGenerated: 350000 },
    },
    {
      _id: '3',
      title: 'Kadiatu\'s Cooperative',
      vendorName: 'Kadiatu\'s Cassava Co.',
      location: 'Makeni',
      description: 'Award-winning women\'s cooperative empowering rural women through sustainable farming. We believe in community, quality, and creating lasting change.',
      metrics: { womenEmployed: 30, familiesSupported: 100, incomeGenerated: 600000 },
    },
  ];

  const displayStories = stories.length > 0 ? stories : mockStories;

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#4A7C59] to-[#2C5F3F] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Impact</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Empowering women farmers in Sierra Leone through sustainable cassava flour production.
            Every purchase you make creates positive change in our communities.
          </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-white shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${metric.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-[#2C5F3F] mb-2">{metric.value}</h3>
                  <p className="text-[#4A7C59] font-semibold">{metric.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Our Mission */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2C5F3F] mb-6 text-center">Our Mission</h2>
          <p className="text-[#4A7C59] text-lg leading-relaxed text-center">
            Wi Root is committed to empowering women-led businesses in Sierra Leone by providing market access
            for their premium cassava flour products. In collaboration with Innovation SL, we're building a
            sustainable supply chain that brings nutritious, wholesome food from local farms to your table,
            while creating economic opportunities for women and their families.
          </p>
        </div>
      </div>

      {/* Impact Stories */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-4xl font-bold text-[#2C5F3F] text-center mb-12">Stories of Change</h2>

        <div className="space-y-8">
          {displayStories.map((story) => (
            <Card key={story._id} className="bg-white shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-[#2C5F3F] mb-3">{story.title}</h3>
                    <div className="flex items-center gap-4 mb-4 text-[#4A7C59]">
                      <span className="font-semibold">{story.vendorName}</span>
                      <span>•</span>
                      <span>📍 {story.location}</span>
                    </div>
                    <p className="text-[#4A7C59] leading-relaxed mb-6">{story.description}</p>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-2xl font-bold text-[#2C5F3F]">{story.metrics?.womenEmployed || 0}</p>
                        <p className="text-sm text-[#4A7C59]">Women Employed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#2C5F3F]">{story.metrics?.familiesSupported || 0}</p>
                        <p className="text-sm text-[#4A7C59]">Families Supported</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-[#C8E6D5] to-[#E8F5ED] rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="text-7xl">👩‍🌾</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#4A7C59] py-16 mb-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every purchase of Wi Root cassava flour directly supports women farmers and their families.
            Together, we're building stronger, healthier communities.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-[#4A7C59] px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#E8F5ED] transition-colors"
          >
            Shop Now & Support
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2C5F3F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Wi Root</h3>
              <p className="text-white/90">Empowering women farmers in Sierra Leone.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/90 hover:text-white">▸ Home</Link></li>
                <li><Link href="/shop" className="text-white/90 hover:text-white">▸ Shop</Link></li>
                <li><Link href="/our-impact" className="text-white/90 hover:text-white">▸ Our Impact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
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