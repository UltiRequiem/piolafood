import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	imagePath: {
		type: String,
		required: true,
	},
	imageRawPath: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
	},
});

export interface IPost {
	title: string;
	description: string;
	imagePath: string;
	imageRawPath: string;
	user: string;
	tags: string[];
}

export const Post =
	mongoose.models.posts ?? mongoose.model("posts", PostSchema);
