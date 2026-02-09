const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'wiroot_db';

// Mongoose Schemas
const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  bio: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name: { type: String, required: true },
  description: { type: String },
  weightKg: { type: Number, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String },
}, { timestamps: true });

const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create vendors
    const vendors = await Vendor.create([
      {
        name: 'Fatmata\'s Farm',
        phone: '+232 76 123 456',
        location: 'Freetown, Sierra Leone',
        bio: 'Women-led cooperative producing premium cassava flour since 2018. Supporting 25 local farmers.',
        isActive: true,
      },
      {
        name: 'Mariama Enterprises',
        phone: '+232 77 234 567',
        location: 'Bo, Sierra Leone',
        bio: 'Family business specializing in organic cassava processing. Traditional methods meet modern quality standards.',
        isActive: true,
      },
      {
        name: 'Kadiatu\'s Cassava Co.',
        phone: '+232 78 345 678',
        location: 'Makeni, Sierra Leone',
        bio: 'Award-winning women\'s cooperative. Empowering rural women through sustainable cassava farming.',
        isActive: true,
      },
    ]);

    console.log(`✅ Created ${vendors.length} vendors`);

    // Create products
    const products = await Product.create([
      // Fatmata's Farm Products
      {
        vendorId: vendors[0]._id,
        name: 'Premium Cassava Flour - 1kg',
        description: 'Finely milled, pure white cassava flour. Perfect for baking and cooking.',
        weightKg: 1,
        price: 25.00,
        stockQuantity: 150,
        isAvailable: true,
      },
      {
        vendorId: vendors[0]._id,
        name: 'Premium Cassava Flour - 2kg',
        description: 'Finely milled, pure white cassava flour. Perfect for baking and cooking. Value pack.',
        weightKg: 2,
        price: 48.00,
        stockQuantity: 100,
        isAvailable: true,
      },
      {
        vendorId: vendors[0]._id,
        name: 'Premium Cassava Flour - 5kg',
        description: 'Finely milled, pure white cassava flour. Perfect for baking and cooking. Family size.',
        weightKg: 5,
        price: 115.00,
        stockQuantity: 50,
        isAvailable: true,
      },

      // Mariama Enterprises Products
      {
        vendorId: vendors[1]._id,
        name: 'Organic Cassava Flour - 1kg',
        description: 'Certified organic cassava flour. No chemicals, no additives. Pure and natural.',
        weightKg: 1,
        price: 30.00,
        stockQuantity: 120,
        isAvailable: true,
      },
      {
        vendorId: vendors[1]._id,
        name: 'Organic Cassava Flour - 3kg',
        description: 'Certified organic cassava flour. No chemicals, no additives. Pure and natural. Best value.',
        weightKg: 3,
        price: 85.00,
        stockQuantity: 80,
        isAvailable: true,
      },

      // Kadiatu's Cassava Co. Products
      {
        vendorId: vendors[2]._id,
        name: 'Traditional Cassava Flour - 1kg',
        description: 'Traditionally processed cassava flour. Rich flavor, authentic quality.',
        weightKg: 1,
        price: 22.00,
        stockQuantity: 200,
        isAvailable: true,
      },
      {
        vendorId: vendors[2]._id,
        name: 'Traditional Cassava Flour - 2.5kg',
        description: 'Traditionally processed cassava flour. Rich flavor, authentic quality. Popular size.',
        weightKg: 2.5,
        price: 52.00,
        stockQuantity: 90,
        isAvailable: true,
      },
      {
        vendorId: vendors[2]._id,
        name: 'Traditional Cassava Flour - 10kg',
        description: 'Traditionally processed cassava flour. Rich flavor, authentic quality. Bulk size for businesses.',
        weightKg: 10,
        price: 200.00,
        stockQuantity: 30,
        isAvailable: true,
      },
    ]);

    console.log(`✅ Created ${products.length} products`);

    // Create an admin user (you'll need to sign up with Clerk first)
    console.log('\n📝 To create an admin user:');
    console.log('1. Sign up through the app');
    console.log('2. Run this command in MongoDB:');
    console.log('   db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "ADMIN" } })');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Vendors: ${vendors.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log('\n🎉 You can now start using the application!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();