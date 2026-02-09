'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '../db';
import User from '../models/User';

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  await connectDB();
  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    // Create user if doesn't exist
    const clerkUser = await auth();
    user = await User.create({
      clerkId: userId,
      email: clerkUser.sessionClaims?.email || '',
      fullName: clerkUser.sessionClaims?.fullName || '',
      role: 'CUSTOMER',
    });
  }

  return JSON.parse(JSON.stringify(user));
}

export async function checkIsAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN';
}