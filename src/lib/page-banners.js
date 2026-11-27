/**
 * Per-page header banners (the image behind the page title on inner pages).
 *
 * Upload them in WordPress → Pages → Site Images → "Page Banners" (field group
 * from wordpress/acf-page-banners.json). Each empty slot falls back to the
 * shared "Contact / page header banner" on the same page, then to the local file.
 *
 * key: value of <HeroInner banner="…">, also the CSS variable --fkm-banner-<key>
 * field: GraphQL field name inside `pageBanners`
 */
export const PAGE_BANNERS = [
	{ key: "about", field: "bannerAbout" },
	{ key: "services", field: "bannerServices" },
	{ key: "portfolio", field: "bannerPortfolio" },
	{ key: "team", field: "bannerTeam" },
	{ key: "blog", field: "bannerBlog" },
	{ key: "careers", field: "bannerCareers" },
	{ key: "faq", field: "bannerFaq" },
	{ key: "fk-group", field: "bannerFkGroup" },
	{ key: "contact", field: "bannerContact" },
	{ key: "error", field: "bannerError" },
];

/** { about: "https://…", … } → { "--fkm-banner-about": 'url("https://…")', … } */
export function pageBannerCssVars(banners = {}) {
	return Object.fromEntries(
		Object.entries(banners)
			.filter(([, url]) => url)
			.map(([key, url]) => [`--fkm-banner-${key}`, `url(${JSON.stringify(url)})`])
	);
}
