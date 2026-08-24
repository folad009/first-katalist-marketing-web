/**
 * Server-safe HTML sanitizer (no jsdom / isomorphic-dompurify).
 * Used during SSR; browser path uses DOMPurify in WordPressContent.
 */

export function sanitizeHtmlServer(html) {
	if (!html || typeof html !== "string") return "";
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
		.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
		.replace(/\s+on\w+\s*=\s*(["'])[\s\S]*?\1/gi, "")
		.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, "")
		.replace(/(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '$1="#"')
		.replace(/(href|src)\s*=\s*javascript:[^\s>]*/gi, '$1="#"');
}

/** @deprecated Use sanitizeHtmlServer or WordPressContent (client DOMPurify). */
export function sanitizeHtml(html) {
	return sanitizeHtmlServer(html);
}
