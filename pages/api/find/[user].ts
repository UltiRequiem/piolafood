import type { NextApiResponse, NextApiRequest } from "next";

import { db } from "../../../lib/db";

export default async function handleRaw(
	{ method, query: { user } }: NextApiRequest,
	response: NextApiResponse
) {
	if (method !== "GET") {
		return response.status(405);
	}

	let data;

	try {
		data = await db.findPostByUser(user as string);
	} catch (error) {
		response.status(400).json({ message: error });
		return;
	}

	response.status(200).json(data);
}
