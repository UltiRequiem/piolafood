import type { NextApiResponse, NextApiRequest } from "next";

import { database } from "lib/db";

export default async function handleRaw(
	{ method, query: { user } }: NextApiRequest,
	response: NextApiResponse
) {
	if (method !== "GET") {
		return response.status(405);
	}

	let data;

	try {
		data = await database.findPostByUser(user as string, { reverse: true });
	} catch (error) {
		response.status(400).json({ message: error });
		return;
	}

	response.status(200).json(data);
}
