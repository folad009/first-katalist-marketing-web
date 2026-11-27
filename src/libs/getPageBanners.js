import { PAGE_BANNERS } from "@/lib/page-banners";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { GET_PAGE_BANNERS } from "@/lib/wordpress-queries";
import { cache } from "react";

/**
 * Per-page header banners from WordPress → Pages → Site Images → Page Banners.
 * Returns { about: url, services: url, … } with only the slots that have an
 * image; HeroInner falls back to the shared banner for the rest.
 */
const getPageBanners = cache(async () => {
	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_PAGE_BANNERS, {
			tags: [REVALIDATE_TAGS.siteImages],
		});
		const fields = data?.page?.pageBanners ?? {};

		return Object.fromEntries(
			PAGE_BANNERS.map(({ key, field }) => [key, fields[field]?.node?.sourceUrl ?? null]).filter(
				([, url]) => url
			)
		);
	}, {});
});

export default getPageBanners;
