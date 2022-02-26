import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const session = await getSession({ req });

  if (!session) {
    return res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }

  if (!req.body) {
    return res.status(400).send({
      error: "You must provide data.",
    });
  }

  const body = JSON.parse(req.body);

  const { title, description, imageData, imageDataFileType } = body;

  if (!title || !description || !imageData || !imageDataFileType) {
    return res.status(400).send({
      error: "You must provide title, description and imageData.",
    });
  }

  const post = await db.newPost({
    title,
    description,
    imageData,
    imageDataFileType,
    user: session.user?.email as string,
    tags: ["food"],
  });

  res.send(post);
}
