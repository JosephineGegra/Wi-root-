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
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#4A7C59] to-[#2C5F3F] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions about our products or want to partner with us? We'd love to hear from you!
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#2C5F3F] mb-8">Get in Touch</h2>
            
            <div className="space-y-6 mb-12">
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C8E6D5] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#2C5F3F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C5F3F] mb-1">Our Location</h3>
                      <p className="text-[#4A7C59]">251 Regent Road, Freetown, Sierra Leone</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C8E6D5] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#2C5F3F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C5F3F] mb-1">Email Us</h3>
                      <p className="text-[#4A7C59]">info@wiroot.sl</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C8E6D5] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#2C5F3F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C5F3F] mb-1">Call Us</h3>
                      <p className="text-[#4A7C59]">+232 90 829241</p>
                      <p className="text-[#4A7C59]">+232 73 789890</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#2C5F3F] mb-4">Business Hours</h3>
              <div className="space-y-2 text-[#4A7C59]">
                <p><span className="font-semibold">Monday - Friday:</span> 8:00 AM - 6:00 PM</p>
                <p><span className="font-semibold">Saturday:</span> 9:00 AM - 4:00 PM</p>
                <p><span className="font-semibold">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#2C5F3F] mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-[#2C5F3F] font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="mt-2 border-[#C8E6D5] focus:border-[#4A7C59]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#2C5F3F] font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="mt-2 border-[#C8E6D5] focus:border-[#4A7C59]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#2C5F3F] font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+232 XX XXX XXXX"
                      className="mt-2 border-[#C8E6D5] focus:border-[#4A7C59]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#2C5F3F] font-semibold">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="mt-2 border-[#C8E6D5] focus:border-[#4A7C59]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4A7C59] hover:bg-[#2C5F3F] text-white py-6 text-lg rounded-lg"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section (Placeholder) */}
      <div className="bg-[#C8E6D5] py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-[#2C5F3F] mb-4">Visit Us</h3>
            <p className="text-[#4A7C59] mb-6">Find us at 251 Regent Road, Freetown, Sierra Leone</p>
            <div className="h-64 bg-gradient-to-br from-[#C8E6D5] to-[#E8F5ED] rounded-lg flex items-center justify-center">
              <p className="text-[#4A7C59] text-lg">🗺️ Map Coming Soon</p>
            </div>
          </div>
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
                <li><Link href="/contact" className="text-white/90 hover:text-white">▸ Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  f
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  in
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  📷
                </a>
              </div>
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