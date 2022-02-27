import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
});

export interface User {
	name: string;
	username: string;
	email: string;
}

export const User =
	mongoose.models.users ?? mongoose.model("users", UserSchema);
