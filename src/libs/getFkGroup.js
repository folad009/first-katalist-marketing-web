import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapFkCompanies } from "@/lib/wordpress-mappers";
import { GET_FK_COMPANIES } from "@/lib/wordpress-queries";
import { cache } from "react";
import fkGroup from "../../public/fakedata/fk-group.json";

/** FK Group companies from WordPress → FK Group (falls back to the local JSON). */
const getFkGroup = cache(async () =>
	withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_FK_COMPANIES, { tags: [REVALIDATE_TAGS.fkGroup] });
		return mapFkCompanies(data?.fkCompanies?.nodes ?? []);
	}, fkGroup)
);

export function getFkGroupTopLevel(entities = []) {
	return entities.filter(item => item.parentSlug == null);
}

export function getFkGroupChildren(entities = [], parentSlug) {
	return entities.filter(item => item.parentSlug === parentSlug);
}

export default getFkGroup;
