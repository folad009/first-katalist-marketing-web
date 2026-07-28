/**
 * Map Yoast SEO fields (via WPGraphQL) to Next.js Metadata.
 */
export function buildMetadataFromItem(item, defaults = {}) {
	if (!item) return defaults;

	const seo = item.seo ?? {};
	const title = seo.title || item.title || item.name || defaults.title;
	const description =
		seo.metaDesc ||
		item.desc ||
		item.shortDesc ||
		item.desc1 ||
		defaults.description;
	const ogImage =
		seo.opengraphImage ||
		item.detailsImg ||
		item.imgLarge ||
		item.img ||
		defaults.openGraph?.images?.[0]?.url;

	const metadata = {
		title,
		description,
		openGraph: {
			title: seo.opengraphTitle || title,
			description: seo.opengraphDescription || description,
			...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
		},
		twitter: {
			card: ogImage ? "summary_large_image" : "summary",
			title: seo.twitterTitle || seo.opengraphTitle || title,
			description:
				seo.twitterDescription || seo.opengraphDescription || description,
			...(ogImage ? { images: [seo.twitterImage || ogImage] } : {}),
		},
	};

	if (seo.canonical) {
		metadata.alternates = { canonical: seo.canonical };
	}

	return metadata;
}
