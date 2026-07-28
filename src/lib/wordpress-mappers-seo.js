export function mapSeo(node) {
	const seo = node?.seo;
	if (!seo) return null;
	return {
		title: seo.title ?? null,
		metaDesc: seo.metaDesc ?? null,
		canonical: seo.canonical ?? null,
		opengraphTitle: seo.opengraphTitle ?? null,
		opengraphDescription: seo.opengraphDescription ?? null,
		opengraphImage: seo.opengraphImage?.sourceUrl ?? null,
		twitterTitle: seo.twitterTitle ?? null,
		twitterDescription: seo.twitterDescription ?? null,
		twitterImage: seo.twitterImage?.sourceUrl ?? null,
	};
}
