import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
	{
		amountAvailable: {
			type: String,
			require: [true, 'please provide available amount'],
		},
		cost: { type: Number, require: [true, 'price must be provided'] },
		productName: { type: String, require: [true, 'name must be provided'] },
		createdAt: { type: Date, default: Date.now() },
	},
	{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
