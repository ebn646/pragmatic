// Dependencies
const mongoose = require('mongoose');

// Schema
const issueSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, default: null},
    issueType: {type: String, default: 'user story'},
    reporter: {type: String, default: null},
    assignee: {type: String, default: null},
    priority: {type: String, default: 'medium'},
    storyPoints: {type: Number, default: null},
    epic: {type: String, default: null},
    project: String
  }
);

// Model
const Issue = mongoose.model('Issue', issueSchema);

// Export
module.exports = Issue;
