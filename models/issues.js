// Dependencies
import mongoose from 'mongoose';

// Schema
const issueSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: null
	},
	type: {
		type: String,
		default: 'user story'
	},
	reporter: {
		type: String,
		default: null
	},
	assignee: {
		type: String,
		default: null
	},
	priority: {
		type: String,
		default: 'medium'
	},
	storyPoints: {
		type: Number,
		default: null
	},
	epic: {
		type: String,
		default: null
	},
	groupId: {
		type: mongoose.ObjectId,
		required: true
	}
}, {
	timestamps: true
});

// Model
const Issue = mongoose.model('Issue', issueSchema);

// Export
export default Issue;
