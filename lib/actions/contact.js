'use server';

import connectDB from '../db';
import ContactSubmission from '../models/ContactSubmission';
import Notification from '../models/Notification';

export async function submitContactForm(data) {
  await connectDB();

  const submission = await ContactSubmission.create({
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    message: data.message,
  });

  return JSON.parse(JSON.stringify(submission));
}

export async function getAllContactSubmissions() {
  await connectDB();

  const submissions = await ContactSubmission.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(submissions));
}