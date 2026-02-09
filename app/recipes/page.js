'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getRecipes } from '@/lib/actions/recipes';
import { Clock, Star } from 'lucide-react';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadRecipes();
  }, [filter]);

  const loadRecipes = async () => {
    try {
      const filters = {};
      if (filter === 'quick') filters.quickToMake = true;
      if (filter === 'popular') filters.isPopular = true;

      const data = await getRecipes(filters);
      setRecipes(data);
    } catch (error) {
      console.error('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'Quick to Make' },
    { id: 'meal', label: 'Meal Type' },
    { id: 'popular', label: 'Most Popular' },
  ];

  // Mock recipes data for demonstration
  const mockRecipes = [
    {
      _id: '1',
      title: 'Foo-foo Recipe',
      mealType: 'Lunch or Dinner',
      prepTime: 15,
      category: 'Cooking',
      rating: 4.0,
      imageUrl: '🍚',
      benefits: 'Foo-foo is gluten-free, low-fat, fiber-rich energy food that aids digestion, supports blood sugar management, and provides lasting energy.',
    },
    {
      _id: '2',
      title: 'Pancakes Recipe',
      mealType: 'Breakfast, Brunch',
      prepTime: 5,
      category: 'Frying',
      rating: 4.0,
      imageUrl: '🥞',
      benefits: 'Foo-foo is gluten-free, low-fat, fiber-rich energy food.',
    },
    {
      _id: '3',
      title: 'Cake Recipe',
      mealType: 'Lunch or Dinner',
      prepTime: 25,
      category: 'Baking',
      rating: 4.0,
      imageUrl: '🍰',
      benefits: 'Foo-foo is gluten-free, low-fat, fiber-rich energy food.',
    },
    {
      _id: '4',
      title: 'Cookies Recipe',
      mealType: 'Lunch or Snacks',
      prepTime: 35,
      category: 'Baking',
      rating: 4.0,
      imageUrl: '🍪',
      benefits: 'Boost this is gluten-free, low-fat, fiber-rich energy.',
    },
    {
      _id: '5',
      title: 'Pizza Crust Recipe',
      mealType: 'Breakfast, Brunch',
      prepTime: 15,
      category: 'Baking',
      rating: 4.0,
      imageUrl: '🍕',
      benefits: 'Foo-foo is gluten-free, low-fat, fiber-rich energy.',
    },
    {
      _id: '6',
      title: 'Bread Recipe',
      mealType: 'Lunch or Dinner',
      prepTime: 25,
      category: 'Baking',
      rating: 4.0,
      imageUrl: '🍞',
      benefits: 'Foo-foo is gluten-free, low-fat, fiber-rich energy food.',
    },
  ];

  const displayRecipes = recipes.length > 0 ? recipes : mockRecipes;

  return (
    <div className="min-h-screen bg-[#E8F5ED]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#C8E6D5] to-[#E8F5ED] py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold text-[#2C5F3F] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Cook Healthy with<br />Cassava Flour.
              </h1>
              <div className="space-y-2 text-[#4A7C59]">
                <p>Discover easy recipes made with Wi Root cassava flour.</p>
                <p>Perfect for breakfast, main meals, and everyday cooking.</p>
                <p>Wholesome, gluten-free, and simple to prepare.</p>
                <p>Wi Root Cassava Flour helps you create flavorful, light,</p>
                <p>and satisfying recipes with minimal effort.</p>
              </div>

              {/* Categories */}
              <div className="flex gap-4 mt-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl mb-2 shadow-md">🍳</div>
                  <p className="text-[#2C5F3F] font-semibold">Cooking</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl mb-2 shadow-md">🧁</div>
                  <p className="text-[#2C5F3F] font-semibold">Baking</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl mb-2 shadow-md">🍳</div>
                  <p className="text-[#2C5F3F] font-semibold">Frying</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg" style={{ transform: 'rotate(-10deg)' }}>
                  How to Cook<br />
                  <span className="italic">with</span><br />
                  <span className="text-2xl">ssava Flour</span>
                </div>
                <div className="w-80 h-80 bg-white/50 rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-9xl">🌿</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === cat.id
                  ? 'bg-[#5C9776] text-white'
                  : 'bg-[#C8E6D5] text-[#2C5F3F] hover:bg-[#B5D9C8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button className="ml-auto px-6 py-2 text-[#2C5F3F] font-semibold">View All</button>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((recipe) => (
            <Card
              key={recipe._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#FFE5B4] to-[#FFF8DC] flex items-center justify-center text-7xl">
                {recipe.imageUrl || '🍲'}
                <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  ❤️
                </button>
                <button className="absolute top-3 right-16 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  ⋮
                </button>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#2C5F3F]">{recipe.title}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-[#2C5F3F]">{recipe.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#4A7C59] mb-2">
                  <span className="font-semibold">Meal type:</span> {recipe.mealType}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-[#4A7C59]" />
                  <span className="text-sm text-[#4A7C59] font-semibold">{recipe.prepTime} mins</span>
                </div>
                <p className="text-sm text-[#4A7C59] mb-4">
                  <span className="font-semibold">Benefits:</span> {recipe.benefits}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-[#4A7C59] hover:bg-[#2C5F3F] text-white px-12 py-6 text-lg rounded-lg"
          >
            View More Recipes
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4A7C59] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Wi Root</h3>
              <p className="text-white/90">Wi Root – Pure cassava flour empowering women farmers in Sierra Leone.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/90 hover:text-white">▸ Home</Link></li>
                <li><Link href="/shop" className="text-white/90 hover:text-white">▸ Shop</Link></li>
                <li><Link href="/recipes" className="text-white/90 hover:text-white">▸ Recipes / Ideas</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact & Support</h3>
              <p className="text-white/90">📍 251 Regent Road, Freetown</p>
              <p className="text-white/90">✉️ info@wiroot.sl</p>
              <p className="text-white/90">📞 +232 90 829241/073 789890</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80">© 2026 Wi Root. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}