/**
 * Generate a URL-safe slug from a title (used for static fallback data).
 */
export default function slugify(text) {
	if (!text || typeof text !== "string") return "";
	return text
		.toLowerCase()
		.trim()
		.replace(/['']/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Ensure every item has a slug (fallback: slugify title/name, then id).
 */
export function withSlugs(items, titleKey = "title") {
	return (items ?? []).map(item => ({
		...item,
		slug:
			item.slug ||
			slugify(item[titleKey] ?? item.name ?? item.title) ||
			`item-${item.id}`,
	}));
}
