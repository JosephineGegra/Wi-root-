import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Cooking', 'Baking', 'Frying'], required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Brunch'] },
  prepTime: { type: Number }, // in minutes
  cookTime: { type: Number }, // in minutes
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  imageUrl: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  benefits: { type: String },
  quickToMake: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);