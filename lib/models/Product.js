import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name: { type: String, required: true },
  description: { type: String },
  weightKg: { type: Number, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);