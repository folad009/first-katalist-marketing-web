import { SITE_IMAGE_FALLBACKS } from "@/lib/site-images";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapSiteImages } from "@/lib/wordpress-mappers";
import { GET_SITE_IMAGES } from "@/lib/wordpress-queries";
import { cache } from "react";

const getSiteImages = cache(async () => {
	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_SITE_IMAGES, {
			tags: [REVALIDATE_TAGS.siteImages],
		});

		return mapSiteImages(data);
	}, SITE_IMAGE_FALLBACKS);
});

export default getSiteImages;

