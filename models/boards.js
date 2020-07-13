// Dependency
import mongoose from 'mongoose';

// Schema
const boardSchema = new mongoose.Schema(
	{
		name: {type: String, required: true},
		key: {type: String, required: true},
		userId: {type: mongoose.ObjectId, required: true},
	},
	{timestamps: true}
);

// Model
const Board = mongoose.model('Board', boardSchema);

// Export
export default Board;
