import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const isDevelopment = process.env.ENV === "DEV";

const config = {
	GITHUB_ID: isDevelopment ? process.env.GITHUB_ID_DEV : process.env.GITHUB_ID,
	GITHUB_SECRET: isDevelopment
		? process.env.GITHUB_SECRET_DEV
		: process.env.GITHUB_SECRET,
};

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error(
		"Please set the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables"
	);
}

export default NextAuth({
	secret: process.env.SECRET,
	providers: [
		GithubProvider({
			clientId: config.GITHUB_ID,
			clientSecret: config.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
