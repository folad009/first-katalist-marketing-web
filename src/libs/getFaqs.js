import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapFaqs } from "@/lib/wordpress-mappers";
import { GET_FAQS } from "@/lib/wordpress-queries";
import { cache } from "react";
import faqs from "../../public/fakedata/faqs.json";

/** FAQs from WordPress → FAQs (falls back to the local JSON). */
const getFaqs = cache(async () =>
	withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_FAQS, { tags: [REVALIDATE_TAGS.faqs] });
		return mapFaqs(data?.faqs?.nodes ?? []);
	}, faqs)
);

export default getFaqs;
