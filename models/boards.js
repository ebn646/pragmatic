// Dependency
import mongoose from 'mongoose';

// Schema
const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
    userId: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);

// Model
export default mongoose.model('Board', boardSchema);
