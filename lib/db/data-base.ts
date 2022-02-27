import { Buffer } from "node:buffer";

import mongoose from "mongoose";

import { Post } from "./models";
import { client } from "lib/images";

import type { IPost } from "./models";
import { nanoid } from "nanoid";

export interface SortOptions {
	reverse?: boolean;
}

export default class DataBase {
	public PostModel: typeof Post;

	constructor(uri: string) {
		mongoose.connect(uri);
		this.PostModel = Post;
	}

	async post({
		title,
		description,
		tags,
		imageData,
		imageDataFileType,
		user,
	}: {
		title: string;
		description: string;
		tags: string[];
		imageData: string;
		imageDataFileType: string;
		user: string;
	}) {
		const slug = nanoid();

		const {
			data: { url, direct_url },
		} = await client.uploadFile(
			Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), "base64"),
			{
				extension: imageDataFileType,
			}
		);

		const post: IPost & { slug: string } = {
			title,
			description,
			tags,
			imageRawPath: direct_url,
			imagePath: url,
			user,
			slug,
		};

		await new this.PostModel(post).save();

		return this.findPostBySlug(slug) as Promise<IPost>;
	}

	async findPostBySlug(slug: string): Promise<IPost | null> {
		return this.PostModel.findOne({ slug }, "-_id -__v");
	}

	async findPostByUser(user: string, options?: SortOptions): Promise<IPost[]> {
		const data = await this.PostModel.find({ user }, "-_id -__v");

		if (options?.reverse) {
			data.reverse();
		}

		return data;
	}

	async allPosts(options?: SortOptions): Promise<IPost[]> {
		const data = await this.PostModel.find({}, "-_id -__v");

		if (options?.reverse) {
			data.reverse();
		}

		return data;
	}
}
