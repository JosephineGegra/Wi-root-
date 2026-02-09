'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '../db';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import Product from '../models/Product';
import { getCurrentUser } from './auth';

export async function addToCart(productId, quantity = 1) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await connectDB();

  // Get or create cart
  let cart = await Cart.findOne({ userId: user.clerkId });
  if (!cart) {
    cart = await Cart.create({ userId: user.clerkId });
  }

  // Get product
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  // Check if item already in cart
  let cartItem = await CartItem.findOne({ cartId: cart._id, productId });
  
  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      cartId: cart._id,
      productId,
      quantity,
      unitPrice: product.price,
    });
  }

  revalidatePath('/cart');
  return { success: true };
}

export async function updateCartItem(itemId, quantity) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await connectDB();

  if (quantity <= 0) {
    await CartItem.findByIdAndDelete(itemId);
  } else {
    await CartItem.findByIdAndUpdate(itemId, { quantity });
  }

  revalidatePath('/cart');
  return { success: true };
}

export async function removeCartItem(itemId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await connectDB();
  await CartItem.findByIdAndDelete(itemId);

  revalidatePath('/cart');
  return { success: true };
}

export async function getCart() {
  const user = await getCurrentUser();
  if (!user) return { items: [], total: 0 };

  await connectDB();

  const cart = await Cart.findOne({ userId: user.clerkId });
  if (!cart) return { items: [], total: 0 };

  const items = await CartItem.find({ cartId: cart._id })
    .populate('productId')
    .lean();

  const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  return JSON.parse(JSON.stringify({ items, total }));
}