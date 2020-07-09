// Dependency
const mongoose = require('mongoose');

// Schema
const projectSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.ObjectId, required: true},
    name: {type: String, required: true},
    key: {type: String, required: true}
  }, {timestamps: true}
);

// Model
const Project = mongoose.model('Project', projectSchema);

// Export
module.exports = Project;
