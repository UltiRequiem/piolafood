import { getSession } from "next-auth/react";

import { database } from "lib/db";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (request.method !== "POST") {
		return response.status(405).end("Method not allowed");
	}

	const session = await getSession({ req: request });

	if (!session) {
		return response.send({
			error: "You must be sign in to view the protected content on this page.",
		});
	}

	if (!request.body) {
		return response.status(400).send({
			error: "You must provide data.",
		});
	}

	const body = JSON.parse(request.body);

	const { title, description, imageData, imageDataFileType } = body;

	if (!title || !description || !imageData || !imageDataFileType) {
		return response.status(400).send({
			error: "You must provide title, description and imageData.",
		});
	}

	const post = await database.post({
		title,
		description,
		imageData,
		imageDataFileType,
		user: session.user?.email as string,
		tags: ["food"],
	});

	response.send(post);
}
