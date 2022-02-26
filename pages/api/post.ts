import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }

  res.send({
    message: "You are signed in!",
    user: session.user,
  });
}
