import mongoose from 'mongoose';

const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['NEW', 'READ', 'RESPONDED'], default: 'NEW' },
}, { timestamps: true });

export default mongoose.models.ContactSubmission || mongoose.model('ContactSubmission', ContactSubmissionSchema);