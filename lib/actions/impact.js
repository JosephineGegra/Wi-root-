'use server';

import connectDB from '../db';
import ImpactStory from '../models/ImpactStory';

export async function getImpactStories() {
  await connectDB();

  const stories = await ImpactStory.find({})
    .sort({ featured: -1, createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(stories));
}

export async function getFeaturedImpactStories() {
  await connectDB();

  const stories = await ImpactStory.find({ featured: true })
    .limit(3)
    .lean();

  return JSON.parse(JSON.stringify(stories));
}