import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minLength: 1,
			maxLength: 20,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			// default: undefined,
			// index: true,
		},
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			require: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
