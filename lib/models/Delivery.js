import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  deliveryStatus: { type: String, enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED'], default: 'PENDING' },
  deliveryAddress: { type: String, required: true },
  deliveredAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema);