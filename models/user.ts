import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, "name is required"],
			trim: true,
			minLength: 1,
			maxLength: 20,
		},
		email: {
			type: String,
			require: [true, "email is required"],
			index: true,
			lowercase: true,
			unique: true,
			trim: true,
		},
		password: String,
		role: {
			type: String,
			default: "user",
		},
		image: String,
		resetCode: {
			data: String,
			expireAt: {
				type: Date,
				default: () => new Date(Date.now() + 10 * 60 * 1000),
			},
		},
	},
	{ timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
