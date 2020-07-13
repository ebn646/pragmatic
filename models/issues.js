// Dependencies
import mongoose from 'mongoose';

// Schema
const issueSchema = new mongoose.Schema(
	{
		title: {type: String, required: true},
		description: {type: String, default: null},
		type: {
			type: String,
			enum: ['Story', 'Bug', 'Task', 'Epic'],
			default: 'Story',
		},
		reporter: {type: String, default: null},
		assignee: {type: String, default: null},
		priority: {
			type: String,
			enum: ['highest', 'high', 'medium', 'low', 'lowest'],
			default: 'medium',
		},
		storyPoints: {type: Number, min: [0, 'Invalid value'], default: null},
		epic: {type: String, default: null},
		groupId: {type: mongoose.ObjectId, required: true},
		boardId: {type: mongoose.ObjectId, required: true},
	},
	{timestamps: true}
);

// Model
const Issue = mongoose.model('Issue', issueSchema);

// Export
export default Issue;
