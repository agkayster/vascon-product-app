import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		amountAvailable: {
			type: String,
			require: [true, 'please provide available amount'],
		},

		cost: { type: Number, require: [true, 'price must be provided'] },

		productName: { type: String, require: [true, 'name must be provided'] },

		createdAt: { type: Date, default: Date.now() },

		// references the User Model //
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User', // ref means the schema we are referencing. to get the user who created a job, we take the schema from the User schema //
			required: [true, 'Please provide a user'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
