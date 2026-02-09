'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '../db';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Payment from '../models/Payment';
import Delivery from '../models/Delivery';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import Notification from '../models/Notification';
import { getCurrentUser, checkIsAdmin } from './auth';

export async function createOrderFromCart(deliveryAddress, paymentMethod) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await connectDB();

  const cart = await Cart.findOne({ userId: user.clerkId });
  if (!cart) throw new Error('Cart not found');

  const cartItems = await CartItem.find({ cartId: cart._id }).populate('productId');
  if (cartItems.length === 0) throw new Error('Cart is empty');

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  // Create order
  const order = await Order.create({
    userId: user.clerkId,
    orderNumber: `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`,
    totalAmount,
    status: 'PENDING',
  });

  // Create order items
  for (const item of cartItems) {
    await OrderItem.create({
      orderId: order._id,
      productId: item.productId._id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    });
  }

  // Create payment
  await Payment.create({
    orderId: order._id,
    paymentMethod,
    paymentStatus: 'PENDING',
    amount: totalAmount,
    transactionRef: `TXN-${Date.now()}`,
  });

  // Create delivery
  await Delivery.create({
    orderId: order._id,
    deliveryAddress,
    deliveryStatus: 'PENDING',
  });

  // Create notification
  await Notification.create({
    userId: user.clerkId,
    title: 'Order Placed Successfully',
    message: `Your order ${order.orderNumber} has been placed successfully.`,
  });

  // Clear cart
  await CartItem.deleteMany({ cartId: cart._id });

  revalidatePath('/orders');
  revalidatePath('/cart');

  return JSON.parse(JSON.stringify(order));
}

export async function getUserOrders() {
  const user = await getCurrentUser();
  if (!user) return [];

  await connectDB();

  const orders = await Order.find({ userId: user.clerkId })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(orders));
}

export async function getOrderDetails(orderId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await connectDB();

  const order = await Order.findById(orderId).lean();
  if (!order) throw new Error('Order not found');

  const items = await OrderItem.find({ orderId }).populate('productId').lean();
  const payment = await Payment.findOne({ orderId }).lean();
  const delivery = await Delivery.findOne({ orderId }).lean();

  return JSON.parse(JSON.stringify({ order, items, payment, delivery }));
}

export async function getAllOrders() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();

  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(orders));
}

export async function updateOrderStatus(orderId, status) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();

  await Order.findByIdAndUpdate(orderId, { status });

  revalidatePath('/admin/orders');
  return { success: true };
}

export async function updateDeliveryStatus(orderId, deliveryStatus) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();

  const update = { deliveryStatus };
  if (deliveryStatus === 'DELIVERED') {
    update.deliveredAt = new Date();
  }

  await Delivery.findOneAndUpdate({ orderId }, update);

  revalidatePath('/admin/orders');
  return { success: true };
}