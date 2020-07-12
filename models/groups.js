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
	}
}, {
	timestamps: true
});

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
	},
	issues: [issueSchema]
}, {
	timestamps: true
});

// Model
const Group = mongoose.model('Group', groupSchema);

// Export
export default Group;
