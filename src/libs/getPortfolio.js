import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { withSlugs } from "@/lib/slugify";
import { mapPortfolio } from "@/lib/wordpress-mappers";
import { GET_PORTFOLIO } from "@/lib/wordpress-queries";
import { cache } from "react";
import portfolio from "../../public/fakedata/portfolio";

const getPortfolio = cache(async () => {
	const items = await withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_PORTFOLIO, {
			tags: [REVALIDATE_TAGS.portfolio],
		});
		return mapPortfolio(data?.portfolios?.nodes ?? []);
	}, portfolio);

	return withSlugs(items, "title");
});

export default getPortfolio;
