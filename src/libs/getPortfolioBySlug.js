import getPortfolio from "@/libs/getPortfolio";
import { isDraftModeEnabled } from "@/lib/wordpress-preview";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapPortfolio } from "@/lib/wordpress-mappers";
import { GET_PORTFOLIO_BY_SLUG } from "@/lib/wordpress-queries";
import { cache } from "react";

const getPortfolioBySlug = cache(async slug => {
	if (!slug) return null;

	const isPreview = await isDraftModeEnabled();

	if (!isPreview) {
		const items = await getPortfolio();
		const fromList = items.find(item => item.slug === slug);
		if (fromList) return fromList;
	}

	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_PORTFOLIO_BY_SLUG, {
			variables: { slug, preview: isPreview },
			tags: [REVALIDATE_TAGS.portfolio],
			preview: isPreview,
		});
		if (!data?.portfolio) return null;
		return mapPortfolio([data.portfolio])[0] ?? null;
	}, null);
});

export default getPortfolioBySlug;
