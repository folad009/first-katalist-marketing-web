/** @type {import('next').NextConfig} */

function getWordPressMediaHosts() {
	const hosts = new Set(["cms.yoursite.com"]);

	const mediaHost = process.env.WORDPRESS_MEDIA_HOST?.trim();
	if (mediaHost) {
		hosts.add(mediaHost);
	}

	const apiUrl = process.env.WORDPRESS_API_URL?.trim();
	if (apiUrl) {
		try {
			hosts.add(new URL(apiUrl).hostname);
		} catch {
			// Ignore invalid WORDPRESS_API_URL during config load.
		}
	}

	return [...hosts];
}

const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: getWordPressMediaHosts().flatMap(hostname => [
			{
				protocol: "https",
				hostname,
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname,
				pathname: "/**",
			},
		]),
	},
};

module.exports = nextConfig;
