import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['CUSTOMER', 'ADMIN'], default: 'CUSTOMER' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);