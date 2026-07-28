import { isWordPressConfigured } from "@/lib/wordpress";

/**
 * Load static fallback data when WordPress is not configured (local dev / CI).
 * @param {() => Promise<T>} loader
 * @param {T} fallback
 * @returns {Promise<T>}
 */
export async function withWordPressFallback(loader, fallback) {
	if (!isWordPressConfigured()) {
		return fallback;
	}

	try {
		return await loader();
	} catch (error) {
		console.error("WordPress fetch failed, using static fallback:", error);
		return fallback;
	}
}
