import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { withSlugs } from "@/lib/slugify";
import { mapServices } from "@/lib/wordpress-mappers";
import { GET_SERVICES } from "@/lib/wordpress-queries";
import { cache } from "react";
import services from "../../public/fakedata/services";

const getALlServices = cache(async () => {
	const items = await withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_SERVICES, {
			tags: [REVALIDATE_TAGS.services],
		});
		return mapServices(data?.services?.nodes ?? []);
	}, services);

	return withSlugs(items, "title");
});

export default getALlServices;
