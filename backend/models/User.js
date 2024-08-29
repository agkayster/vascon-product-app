import mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please provide a name'],
		minlength: 3,
		maxlength: 50,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 6,
	},
	deposit: {
		type: Number,
	},
	role: {
		type: String,
		enum: {
			values: ['seller', 'buyer'],
			message: '{VALUE} is not supported',
		}, // message is error message in case the user provides a value outside the "enum" values array //
	},
});

// before we save the userSchema to the mongoDB, we carry out the following
userSchema.pre('save', async function (next) {
	// implement salt to power of 10
	const salt = await genSalt(10);

	// hash password based on the salt
	this.password = await hash(this.password, salt);

	// use next() to move out
	next();
});

// define a createJWT function using OOP
userSchema.methods.createJWT = function () {
	return jwt.sign(
		{
			userId: this._id,
			username: this.username,
		},
		process.env.JWT_SECRET,
		// optional
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

export default mongoose.model('User', userSchema);
