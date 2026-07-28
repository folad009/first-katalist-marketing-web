/**
 * WordPress WPGraphQL client for Next.js App Router.
 *
 * Set WORDPRESS_API_URL to your WPGraphQL endpoint, e.g.
 * https://cms.example.com/graphql
 */

export const REVALIDATE_TAGS = {
	posts: "posts",
	services: "services",
	portfolio: "portfolio",
	team: "team",
	testimonials: "testimonials",
	careers: "careers",
};

/** WordPress post type (or alias) → Next.js cache tag */
export const CONTENT_TYPE_TO_TAG = {
	post: REVALIDATE_TAGS.posts,
	posts: REVALIDATE_TAGS.posts,
	service: REVALIDATE_TAGS.services,
	services: REVALIDATE_TAGS.services,
	portfolio: REVALIDATE_TAGS.portfolio,
	portfolios: REVALIDATE_TAGS.portfolio,
	team_member: REVALIDATE_TAGS.team,
	team: REVALIDATE_TAGS.team,
	testimonial: REVALIDATE_TAGS.testimonials,
	testimonials: REVALIDATE_TAGS.testimonials,
	career: REVALIDATE_TAGS.careers,
	careers: REVALIDATE_TAGS.careers,
};

const ALLOWED_TAGS = new Set(Object.values(REVALIDATE_TAGS));

/**
 * Resolve a cache tag from a direct tag name or WordPress content type.
 */
export function resolveRevalidateTag({ tag, type, contentType } = {}) {
	if (tag && ALLOWED_TAGS.has(tag)) {
		return tag;
	}

	const rawType = type ?? contentType;
	if (rawType) {
		const normalized = String(rawType).toLowerCase().trim();
		return CONTENT_TYPE_TO_TAG[normalized] ?? null;
	}

	return null;
}

export function getAllowedRevalidateTags() {
	return [...ALLOWED_TAGS];
}

export function getContentTypeMappings() {
	return { ...CONTENT_TYPE_TO_TAG };
}

export function isWordPressConfigured() {
	return Boolean(process.env.WORDPRESS_API_URL?.trim());
}

function getEndpoint() {
	const endpoint = process.env.WORDPRESS_API_URL?.trim();
	if (!endpoint) {
		throw new Error(
			"WORDPRESS_API_URL is not set. Add it to .env.local (see .env.example)."
		);
	}
	return endpoint;
}

/**
 * Execute a WPGraphQL query with Next.js fetch caching and tag-based revalidation.
 *
 * @param {string} query - GraphQL query string
 * @param {object} [options]
 * @param {object} [options.variables] - GraphQL variables
 * @param {string[]} [options.tags] - Revalidation tags (posts, services, etc.)
 * @returns {Promise<Record<string, unknown>>}
 */
function getPreviewAuthHeader() {
	const user = process.env.WORDPRESS_PREVIEW_USER?.trim();
	const password = process.env.WORDPRESS_PREVIEW_PASSWORD?.trim();

	if (!user || !password) {
		return {};
	}

	const credentials = Buffer.from(`${user}:${password}`).toString("base64");
	return { Authorization: `Basic ${credentials}` };
}

export async function fetchGraphQL(
	query,
	{ variables = {}, tags = [], preview = false } = {}
) {
	const response = await fetch(getEndpoint(), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(preview ? getPreviewAuthHeader() : {}),
		},
		body: JSON.stringify({ query, variables }),
		...(preview
			? { cache: "no-store" }
			: {
					next: {
						tags,
					},
				}),
	});

	if (!response.ok) {
		throw new Error(
			`WPGraphQL request failed (${response.status} ${response.statusText})`
		);
	}

	const json = await response.json();

	if (json.errors?.length) {
		throw new Error(
			json.errors.map(error => error.message).join("\n")
		);
	}

	return json.data ?? {};
}
