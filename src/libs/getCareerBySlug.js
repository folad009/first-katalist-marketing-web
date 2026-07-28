import getCareers from "@/libs/getCareers";
import { isDraftModeEnabled } from "@/lib/wordpress-preview";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapCareers } from "@/lib/wordpress-mappers";
import { GET_CAREER_BY_SLUG } from "@/lib/wordpress-queries";
import { cache } from "react";

const getCareerBySlug = cache(async slug => {
	if (!slug) return null;

	const isPreview = await isDraftModeEnabled();

	if (!isPreview) {
		const careers = await getCareers();
		const fromList = careers.find(career => career.slug === slug);
		if (fromList) return fromList;
	}

	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_CAREER_BY_SLUG, {
			variables: { slug, preview: isPreview },
			tags: [REVALIDATE_TAGS.careers],
			preview: isPreview,
		});
		if (!data?.career) return null;
		return mapCareers([data.career])[0] ?? null;
	}, null);
});

export default getCareerBySlug;
