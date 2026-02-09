'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/actions/contact';
import { toast } from 'sonner';
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await submitContactForm(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const locations = [
    { name: 'Freetown', active: true },
    { name: 'Bo', active: false },
    { name: 'Kenema', active: false },
    { name: 'Makeni', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C5F3F]/80 to-[#4A7C59]/60 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%234A7C59" width="100" height="100"/%3E%3C/svg%3E)' }}></div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl">
            Have questions about our products? Want to partner with us? We would love to hear from you!
          </p>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            fill="#4A7C59"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left Side - Get in Touch */}
          <div>
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-[#2C5F3F] mb-4">
                <span className="border-b-4 border-[#5C9776] pb-2">GET IN TOUCH</span>
              </h2>
            </div>

            {/* Regional Network */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#5C9776] rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#2C5F3F]">Regional Network</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {locations.map((location) => (
                  <div
                    key={location.name}
                    className={`p-4 rounded-lg text-center font-semibold ${
                      location.active
                        ? 'bg-[#5C9776] text-white'
                        : 'bg-white text-[#4A7C59] border-2 border-[#C8E6D5]'
                    }`}
                  >
                    {location.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8E6D5] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#2C5F3F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C5F3F] mb-1">Our Location</h4>
                  <p className="text-[#4A7C59]">251 Regent Road, Freetown, Sierra Leone</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8E6D5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#2C5F3F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C5F3F] mb-1">Email Us</h4>
                  <p className="text-[#4A7C59]">info@wiroot.sl</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8E6D5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#2C5F3F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C5F3F] mb-1">Call Us</h4>
                  <p className="text-[#4A7C59]">+232 90 829241</p>
                  <p className="text-[#4A7C59]">+232 73 789890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <Card className="bg-white shadow-2xl rounded-3xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-[#2C5F3F] mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name..."
                      required
                      className="bg-[#F5F5F5] border-0 py-6 rounded-xl placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email...."
                      required
                      className="bg-[#F5F5F5] border-0 py-6 rounded-xl placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="what's your subject..."
                      className="bg-[#F5F5F5] border-0 py-6 rounded-xl placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Send Us a message......"
                      rows={6}
                      required
                      className="bg-[#F5F5F5] border-0 rounded-xl placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#5C9776] to-[#4A7C59] hover:from-[#4A7C59] hover:to-[#2C5F3F] text-white py-6 text-lg rounded-xl font-semibold"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2C5F3F] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Wi Root Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Wi Root</h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Wi Root – Pure cassava flour empowering women farmers in Sierra Leone.
                In collaboration with Innovation SL, we bring nutritious, wholesome food from the soil to your table.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="font-bold">𝕏</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-white/90 hover:text-white flex items-center gap-2">▸ Home</Link></li>
                <li><Link href="/shop" className="text-white/90 hover:text-white flex items-center gap-2">▸ Shop</Link></li>
                <li><Link href="/our-impact" className="text-white/90 hover:text-white flex items-center gap-2">▸ Our Impact</Link></li>
                <li><Link href="/recipes" className="text-white/90 hover:text-white flex items-center gap-2">▸ Recipes / Ideas</Link></li>
                <li><Link href="/contact" className="text-white/90 hover:text-white flex items-center gap-2">▸ Contact</Link></li>
                <li><Link href="/faq" className="text-white/90 hover:text-white flex items-center gap-2">▸ FAQs</Link></li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact & Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                  <span className="text-white/90">251 Regent Road, Freetown</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 flex-shrink-0 mt-1" />
                  <span className="text-white/90">info@wiroot.sl</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 flex-shrink-0 mt-1" />
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