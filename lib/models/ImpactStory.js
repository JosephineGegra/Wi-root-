import mongoose from 'mongoose';

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

export default mongoose.models.ImpactStory || mongoose.model('ImpactStory', ImpactStorySchema);