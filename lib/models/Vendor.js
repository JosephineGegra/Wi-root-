import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  bio: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);