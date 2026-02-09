import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], default: 'PENDING' },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);