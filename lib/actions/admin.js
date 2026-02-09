'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '../db';
import Vendor from '../models/Vendor';
import Product from '../models/Product';
import { checkIsAdmin } from './auth';

// Vendor Actions
export async function createVendor(data) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  const vendor = await Vendor.create(data);

  revalidatePath('/admin/vendors');
  return JSON.parse(JSON.stringify(vendor));
}

export async function updateVendor(vendorId, data) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  const vendor = await Vendor.findByIdAndUpdate(vendorId, data, { new: true });

  revalidatePath('/admin/vendors');
  return JSON.parse(JSON.stringify(vendor));
}

export async function getAllVendors() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  const vendors = await Vendor.find({}).sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(vendors));
}

// Product Actions
export async function createProduct(data) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  const product = await Product.create(data);

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return JSON.parse(JSON.stringify(product));
}

export async function updateProduct(productId, data) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  const product = await Product.findByIdAndUpdate(productId, data, { new: true });

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return JSON.parse(JSON.stringify(product));
}

export async function updateStock(productId, stockQuantity) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  await Product.findByIdAndUpdate(productId, { stockQuantity });

  revalidatePath('/admin/products');
  return { success: true };
}

export async function getAllProducts() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  await connectDB();
  const products = await Product.find({}).populate('vendorId').sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(products));
}