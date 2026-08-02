import {
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	SITE_NAME_SHORT,
	isUsableSeoText,
} from "@/lib/site-seo";

/**
 * Map Yoast SEO fields (via WPGraphQL) to Next.js Metadata.
 * Skips TODO / template placeholder copy so FKM defaults win.
 */
export function buildMetadataFromItem(item, defaults = {}) {
	if (!item) {
		return {
			title: defaults.title || DEFAULT_TITLE,
			description: defaults.description || DEFAULT_DESCRIPTION,
		};
	}

	const seo = item.seo ?? {};
	const title =
		(isUsableSeoText(seo.title) && seo.title) ||
		(isUsableSeoText(item.title) && item.title) ||
		(isUsableSeoText(item.name) && item.name) ||
		defaults.title ||
		DEFAULT_TITLE;

	const description =
		(isUsableSeoText(seo.metaDesc) && seo.metaDesc) ||
		(isUsableSeoText(item.desc) && item.desc) ||
		(isUsableSeoText(item.shortDesc) && item.shortDesc) ||
		(isUsableSeoText(item.desc1) && item.desc1) ||
		defaults.description ||
		DEFAULT_DESCRIPTION;

	const ogImage =
		seo.opengraphImage ||
		item.detailsImg ||
		item.imgLarge ||
		item.img ||
		defaults.openGraph?.images?.[0]?.url;

	const ogTitle =
		(isUsableSeoText(seo.opengraphTitle) && seo.opengraphTitle) || title;
	const ogDescription =
		(isUsableSeoText(seo.opengraphDescription) &&
			seo.opengraphDescription) ||
		description;

	const metadata = {
		title,
		description,
		openGraph: {
			title: ogTitle,
			description: ogDescription,
			siteName: SITE_NAME_SHORT,
			...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
		},
		twitter: {
			card: ogImage ? "summary_large_image" : "summary",
			title:
				(isUsableSeoText(seo.twitterTitle) && seo.twitterTitle) || ogTitle,
			description:
				(isUsableSeoText(seo.twitterDescription) &&
					seo.twitterDescription) ||
				ogDescription,
			...(ogImage ? { images: [seo.twitterImage || ogImage] } : {}),
		},
	};

	if (seo.canonical) {
		metadata.alternates = { canonical: seo.canonical };
	}

	return metadata;
}
