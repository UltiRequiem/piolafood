import type { NextApiResponse, NextApiRequest } from "next";

import { db } from "../../lib/db";

export default async function handleRaw(
	{ method, query: { user } }: NextApiRequest,
	response: NextApiResponse
) {
	if (method !== "GET") {
		return response.status(405);
	}

	console.log(user);

	const data = await db.allPosts();

	response.status(200).json(data);
}
