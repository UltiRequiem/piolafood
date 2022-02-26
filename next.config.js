/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"piolafood.wants.solutions",
			"avatars.githubusercontent.com",
			"piolafood.is-from.space",
		],
	},
};

module.exports = nextConfig;
