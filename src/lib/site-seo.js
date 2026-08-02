/**
 * First Katalyst Marketing Limited — default SEO copy grounded in live site
 * positioning (homepage “ideas powerhouse” + Marketing Communications 360).
 * Live meta description is only “First Katalyst Marketing”; we expand from
 * homepage / company-overview messaging without inventing unrelated claims.
 */

export const SITE_NAME = "First Katalyst Marketing Limited";
export const SITE_NAME_SHORT = "First Katalyst Marketing";

export const DEFAULT_TITLE = `${SITE_NAME} | Marketing Communications 360`;

export const DEFAULT_DESCRIPTION =
	"First Katalyst Marketing Limited — a first class ideas powerhouse. Marketing Communications 360: cost-effective, value-adding and result-oriented activation, trade marketing, sales and distribution, HR outsourcing, advertising, digital, production and events across Nigeria and West Africa.";

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL || "https://firstkatalystmarketing.com";

export function getMetadataBase() {
	try {
		return new URL(siteUrl);
	} catch {
		return new URL("https://firstkatalystmarketing.com");
	}
}

/** Root layout metadata object for Next.js App Router */
export const rootMetadata = {
	metadataBase: getMetadataBase(),
	title: {
		default: DEFAULT_TITLE,
		template: `%s | ${SITE_NAME_SHORT}`,
	},
	description: DEFAULT_DESCRIPTION,
	applicationName: SITE_NAME,
	keywords: [
		"First Katalyst Marketing",
		"FKM",
		"Marketing Communications 360",
		"consumer activation",
		"trade marketing",
		"HR outsourcing",
		"digital marketing",
		"events",
		"Nigeria",
		"West Africa",
		"Ikeja Lagos",
	],
	authors: [{ name: SITE_NAME }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	openGraph: {
		type: "website",
		locale: "en_NG",
		siteName: SITE_NAME,
		title: DEFAULT_TITLE,
		description: DEFAULT_DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: DEFAULT_TITLE,
		description: DEFAULT_DESCRIPTION,
	},
	robots: {
		index: true,
		follow: true,
	},
};

/**
 * Static page metadata helper (uses title template from root layout).
 */
export function pageMetadata({ title, description } = {}) {
	return {
		title,
		description: description || DEFAULT_DESCRIPTION,
		openGraph: {
			title: title ? `${title} | ${SITE_NAME_SHORT}` : DEFAULT_TITLE,
			description: description || DEFAULT_DESCRIPTION,
			siteName: SITE_NAME,
		},
		twitter: {
			card: "summary_large_image",
			title: title ? `${title} | ${SITE_NAME_SHORT}` : DEFAULT_TITLE,
			description: description || DEFAULT_DESCRIPTION,
		},
	};
}

/** Treat placeholder / template strings as missing for SEO */
export function isUsableSeoText(value) {
	if (!value || typeof value !== "string") return false;
	const t = value.trim();
	if (!t) return false;
	if (/^TODO\b/i.test(t)) return false;
	if (/lorem ipsum/i.test(t)) return false;
	if (/bexon/i.test(t)) return false;
	if (/themejunction/i.test(t)) return false;
	if (/corporate business/i.test(t)) return false;
	return true;
}
