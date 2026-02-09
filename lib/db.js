import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'wiroot_db';

if (!MONGO_URL) {
  throw new Error('Please define MONGO_URL in .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: DB_NAME,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Ensure all models are registered
  await import('./models/User.js');
  await import('./models/Vendor.js');
  await import('./models/Product.js');
  await import('./models/Cart.js');
  await import('./models/CartItem.js');
  await import('./models/Order.js');
  await import('./models/OrderItem.js');
  await import('./models/Payment.js');
  await import('./models/Delivery.js');
  await import('./models/Review.js');
  await import('./models/Notification.js');
  await import('./models/Recipe.js');
  await import('./models/ContactSubmission.js');
  await import('./models/ImpactStory.js');

  return cached.conn;
}

export default connectDB;