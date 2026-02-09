'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getAllVendors, createVendor, updateVendor } from '@/lib/actions/admin';
import { toast } from 'sonner';
import { Plus, Edit } from 'lucide-react';

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', bio: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const data = await getAllVendors();
      setVendors(data);
    } catch (error) {
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateVendor(editingId, formData);
        toast.success('Vendor updated');
      } else {
        await createVendor(formData);
        toast.success('Vendor created');
      }
      setDialogOpen(false);
      setFormData({ name: '', phone: '', location: '', bio: '' });
      setEditingId(null);
      await loadVendors();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleEdit = (vendor) => {
    setFormData({
      name: vendor.name,
      phone: vendor.phone || '',
      location: vendor.location || '',
      bio: vendor.bio || '',
    });
    setEditingId(vendor._id);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-800">Manage Vendors</h1>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-5 w-5" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Vendor' : 'Create New Vendor'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  {editingId ? 'Update' : 'Create'} Vendor
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor._id} className="border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-green-800">{vendor.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(vendor)}
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                </div>
                {vendor.phone && <p className="text-gray-600 mb-1">Phone: {vendor.phone}</p>}
                {vendor.location && <p className="text-gray-600 mb-1">Location: {vendor.location}</p>}
                {vendor.bio && <p className="text-gray-600 mt-2 text-sm">{vendor.bio}</p>}
                <p className="text-sm text-gray-500 mt-3">
                  Status: <span className={vendor.isActive ? 'text-green-600' : 'text-red-600'}>
                    {vendor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}