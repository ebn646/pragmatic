// Dependencies
const mongoose = require('mongoose');


// Schema
const groupSchema = new mongoose.Schema({

}, {
	timestamps: true
});

// Model
const Group = mongoose.model('Group', groupSchema);

// Export
module.exports = Group;
