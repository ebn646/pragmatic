// Dependencies
import mongoose from 'mongoose';

// Schema
const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		default: 'Backlog'
	},
	index: {
		type: Number,
		required: true,
		default: 0
	},
	boardId: {
		type: mongoose.ObjectId,
		required: true
	}
}, {
	timestamps: true
});

// Model
const Group = mongoose.model('Group', groupSchema);

// Export
export default Group;
