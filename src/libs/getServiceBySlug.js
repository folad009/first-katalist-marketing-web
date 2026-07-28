import getALlServices from "@/libs/getALlServices";
import { isDraftModeEnabled } from "@/lib/wordpress-preview";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapServices } from "@/lib/wordpress-mappers";
import { GET_SERVICE_BY_SLUG } from "@/lib/wordpress-queries";
import { cache } from "react";

const getServiceBySlug = cache(async slug => {
	if (!slug) return null;

	const isPreview = await isDraftModeEnabled();

	if (!isPreview) {
		const services = await getALlServices();
		const fromList = services.find(service => service.slug === slug);
		if (fromList) return fromList;
	}

	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_SERVICE_BY_SLUG, {
			variables: { slug, preview: isPreview },
			tags: [REVALIDATE_TAGS.services],
			preview: isPreview,
		});
		if (!data?.service) return null;
		return mapServices([data.service])[0] ?? null;
	}, null);
});

export default getServiceBySlug;
