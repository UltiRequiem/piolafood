import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "../../../lib/mongoAdapter";

const isDev = process.env.ENV === "DEV";

const config = {
  GITHUB_ID: isDev ? process.env.GITHUB_ID_DEV : process.env.GITHUB_ID,
  GITHUB_SECRET: isDev
    ? process.env.GITHUB_SECRET_DEV
    : process.env.GITHUB_SECRET,
};

console.log(config);

export default NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: config.GITHUB_ID,
      clientSecret: config.GITHUB_SECRET,
    }),
  ],
});
