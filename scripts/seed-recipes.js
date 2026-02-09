const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'wiroot_db';

// Mongoose Schemas
const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Cooking', 'Baking', 'Frying'], required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Brunch'] },
  prepTime: { type: Number },
  cookTime: { type: Number },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  imageUrl: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  benefits: { type: String },
  quickToMake: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
}, { timestamps: true });

const ImpactStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  vendorName: { type: String },
  location: { type: String },
  metrics: {
    womenEmployed: { type: Number },
    familiesSupported: { type: Number },
    incomeGenerated: { type: Number },
  },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
const ImpactStory = mongoose.models.ImpactStory || mongoose.model('ImpactStory', ImpactStorySchema);

async function seedRecipesAndImpact() {
  try {
    console.log('🌱 Starting recipes and impact data seed...');
    
    await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Recipe.deleteMany({});
    await ImpactStory.deleteMany({});
    console.log('🧹 Cleared existing recipes and impact stories');

    // Create recipes
    const recipes = await Recipe.create([
      {
        title: 'Foo-foo Recipe',
        description: 'Traditional West African foo-foo made with cassava flour',
        category: 'Cooking',
        mealType: 'Lunch',
        prepTime: 10,
        cookTime: 15,
        difficulty: 'Easy',
        ingredients: ['2 cups Wi Root cassava flour', '4 cups water', 'Salt to taste'],
        instructions: [
          'Boil water in a pot',
          'Gradually add cassava flour while stirring',
          'Cook for 10 minutes, stirring constantly',
          'Knead into smooth dough',
          'Serve hot with your favorite soup',
        ],
        rating: 4.0,
        benefits: 'Gluten-free, low-fat, fiber-rich energy food that aids digestion',
        quickToMake: true,
        isPopular: true,
      },
      {
        title: 'Pancakes Recipe',
        description: 'Fluffy gluten-free pancakes perfect for breakfast',
        category: 'Frying',
        mealType: 'Breakfast',
        prepTime: 5,
        cookTime: 10,
        difficulty: 'Easy',
        ingredients: [
          '1 cup Wi Root cassava flour',
          '2 eggs',
          '1 cup milk',
          '2 tbsp sugar',
          '1 tsp baking powder',
        ],
        instructions: [
          'Mix all dry ingredients',
          'Add eggs and milk, whisk until smooth',
          'Heat pan and pour batter',
          'Cook until bubbles form, then flip',
          'Serve with honey or syrup',
        ],
        rating: 4.5,
        benefits: 'Protein-rich breakfast that keeps you energized',
        quickToMake: true,
        isPopular: true,
      },
      {
        title: 'Cassava Cake Recipe',
        description: 'Moist and delicious gluten-free cake',
        category: 'Baking',
        mealType: 'Snacks',
        prepTime: 15,
        cookTime: 45,
        difficulty: 'Medium',
        ingredients: [
          '2 cups Wi Root cassava flour',
          '3 eggs',
          '1 cup sugar',
          '1/2 cup butter',
          '1 tsp vanilla',
        ],
        rating: 4.5,
        benefits: 'Delicious gluten-free dessert option',
        isPopular: true,
      },
      {
        title: 'Cookies Recipe',
        description: 'Crispy and tasty gluten-free cookies',
        category: 'Baking',
        mealType: 'Snacks',
        prepTime: 20,
        cookTime: 35,
        difficulty: 'Easy',
        rating: 4.0,
        benefits: 'Perfect snack for kids and adults',
        isPopular: false,
      },
      {
        title: 'Pizza Crust Recipe',
        description: 'Gluten-free pizza base',
        category: 'Baking',
        mealType: 'Dinner',
        prepTime: 15,
        cookTime: 20,
        difficulty: 'Medium',
        rating: 4.0,
        benefits: 'Healthier pizza option',
      },
      {
        title: 'Bread Recipe',
        description: 'Soft gluten-free bread',
        category: 'Baking',
        mealType: 'Breakfast',
        prepTime: 20,
        cookTime: 40,
        difficulty: 'Medium',
        rating: 4.0,
        benefits: 'Daily bread alternative',
      },
    ]);

    console.log(`✅ Created ${recipes.length} recipes`);

    // Create impact stories
    const impactStories = await ImpactStory.create([
      {
        title: 'Empowering Fatmata\\'s Community',
        description:
          'Fatmata\\'s Farm has transformed from a small family operation into a thriving cooperative supporting 25 local women. Through Wi Root partnership, they now have consistent market access and fair pricing.',
        vendorName: 'Fatmata\\'s Farm',
        location: 'Freetown',
        metrics: {
          womenEmployed: 25,
          familiesSupported: 75,
          incomeGenerated: 500000,
        },
        featured: true,
      },
      {
        title: 'Mariama\\'s Success Story',
        description:
          'From traditional methods to modern standards, Mariama Enterprises has built a reputation for quality. Their partnership with Wi Root has enabled expansion and education support for community children.',
        vendorName: 'Mariama Enterprises',
        location: 'Bo',
        metrics: {
          womenEmployed: 15,
          familiesSupported: 50,
          incomeGenerated: 350000,
        },
        featured: true,
      },
      {
        title: 'Kadiatu\\'s Award-Winning Cooperative',
        description:
          'An award-winning women\\'s cooperative that has become a model for sustainable farming practices. Through Wi Root, they\\'ve reached national markets and empowered rural women.',
        vendorName: 'Kadiatu\\'s Cassava Co.',
        location: 'Makeni',
        metrics: {
          womenEmployed: 30,
          familiesSupported: 100,
          incomeGenerated: 600000,
        },
        featured: true,
      },
    ]);

    console.log(`✅ Created ${impactStories.length} impact stories`);

    console.log('\n✅ Recipes and impact data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Recipes: ${recipes.length}`);
    console.log(`   - Impact Stories: ${impactStories.length}`);
    console.log('\n🎉 You can now view recipes and impact stories in the application!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedRecipesAndImpact();
