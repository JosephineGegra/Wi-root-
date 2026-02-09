import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);