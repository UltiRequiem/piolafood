import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const isDev = process.env.ENV === "DEV";

const config = {
  GITHUB_ID: isDev ? process.env.GITHUB_ID_DEV : process.env.GITHUB_ID,
  GITHUB_SECRET: isDev
    ? process.env.GITHUB_SECRET_DEV
    : process.env.GITHUB_SECRET,
};

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: config.GITHUB_ID,
      clientSecret: config.GITHUB_SECRET,
    }),
  ],
});
