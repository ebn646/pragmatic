// Dependency
import mongoose from 'mongoose';

// Schema
const userSchema = new mongoose.Schema(
	{
		email: {type: String, required: true, unique: true},
		username: {type: String, required: true, unique: true},
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		password: {type: String, required: true},
	},
	{timestamps: true}
);

// Model
const User = mongoose.model('User', userSchema);

// Export
export default User;
