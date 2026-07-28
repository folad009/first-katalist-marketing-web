import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapTestimonials } from "@/lib/wordpress-mappers";
import { GET_TESTIMONIALS } from "@/lib/wordpress-queries";
import { cache } from "react";
import testimonials from "../../public/fakedata/testimonials";

const getTestimonials = cache(async () => {
	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_TESTIMONIALS, {
			tags: [REVALIDATE_TAGS.testimonials],
		});
		return mapTestimonials(data?.testimonials?.nodes ?? []);
	}, testimonials);
});

export default getTestimonials;
