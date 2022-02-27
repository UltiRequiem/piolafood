import type { NextApiResponse, NextApiRequest } from "next";

import { database } from "lib/db";

export default async function handleRaw(
	{ method }: NextApiRequest,
	response: NextApiResponse
) {
	if (method !== "GET") {
		return response.status(405);
	}

	const data = await database.allPosts();

	response.status(200).json(data);
}
