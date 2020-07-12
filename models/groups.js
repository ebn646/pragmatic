// Dependencies
// const mongoose = require('mongoose');
import mongoose from 'mongoose';


// Schema
const groupSchema = new mongoose.Schema({

}, {
	timestamps: true
});

// Model
const Group = mongoose.model('Group', groupSchema);

// Export
export default Group;
