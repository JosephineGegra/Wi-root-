import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);