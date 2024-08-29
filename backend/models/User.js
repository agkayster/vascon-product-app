import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);
