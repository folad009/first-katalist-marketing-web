import { isWordPressConfigured } from "@/lib/wordpress";

/**
 * Load static fallback data when WordPress is not configured (local dev / CI),
 * when the request fails, or when WordPress has no entries yet for a list
 * (so an empty CMS never blanks a section of the live site).
 * @param {() => Promise<T>} loader
 * @param {T} fallback
 * @returns {Promise<T>}
 */
export async function withWordPressFallback(loader, fallback) {
	if (!isWordPressConfigured()) {
		return fallback;
	}

	try {
		const result = await loader();

		if (Array.isArray(result) && result.length === 0 && Array.isArray(fallback)) {
			return fallback;
		}

		return result;
	} catch (error) {
		console.error("WordPress fetch failed, using static fallback:", error);
		return fallback;
	}
}
