import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  paymentMethod: { type: String, enum: ['CASH', 'CARD', 'MOBILE_MONEY'], required: true },
  paymentStatus: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  amount: { type: Number, required: true },
  transactionRef: { type: String },
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);