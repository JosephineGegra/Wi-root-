'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '../db';
import Recipe from '../models/Recipe';

export async function getRecipes(filters = {}) {
  await connectDB();
  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.mealType) {
    query.mealType = filters.mealType;
  }

  if (filters.quickToMake) {
    query.quickToMake = true;
  }

  if (filters.isPopular) {
    query.isPopular = true;
  }

  if (filters.search) {
    query.title = { $regex: filters.search, $options: 'i' };
  }

  const recipes = await Recipe.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(recipes));
}

export async function getRecipeById(recipeId) {
  await connectDB();
  const recipe = await Recipe.findById(recipeId).lean();

  if (!recipe) return null;

  return JSON.parse(JSON.stringify(recipe));
}

export async function getFeaturedRecipes() {
  await connectDB();
  const recipes = await Recipe.find({ isPopular: true })
    .limit(6)
    .lean();

  return JSON.parse(JSON.stringify(recipes));
}