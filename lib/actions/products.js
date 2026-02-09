'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '../db';
import Product from '../models/Product';
import Vendor from '../models/Vendor';
import Review from '../models/Review';

export async function getProducts(filters = {}) {
  await connectDB();
  const query = { isAvailable: true };
  
  if (filters.search) {
    query.name = { $regex: filters.search, $options: 'i' };
  }

  const products = await Product.find(query)
    .populate('vendorId')
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(products));
}

export async function getProduct(productId) {
  await connectDB();
  const product = await Product.findById(productId)
    .populate('vendorId')
    .lean();

  if (!product) return null;

  // Get reviews
  const reviews = await Review.find({ productId })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify({ product, reviews }));
}

export async function createReview(productId, rating, comment) {
  const { userId } = await require('@clerk/nextjs/server').auth();
  if (!userId) throw new Error('Unauthorized');

  await connectDB();
  const review = await Review.create({
    productId,
    userId,
    rating,
    comment,
  });

  revalidatePath(`/products/${productId}`);
  return JSON.parse(JSON.stringify(review));
}