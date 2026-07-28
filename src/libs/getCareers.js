import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { withSlugs } from "@/lib/slugify";
import { mapCareers } from "@/lib/wordpress-mappers";
import { GET_CAREERS } from "@/lib/wordpress-queries";
import { cache } from "react";
import careers from "../../public/fakedata/careers";

const getCareers = cache(async () => {
	const items = await withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_CAREERS, {
			tags: [REVALIDATE_TAGS.careers],
		});
		return mapCareers(data?.careers?.nodes ?? []);
	}, careers);

	return withSlugs(items, "title");
});

export default getCareers;
