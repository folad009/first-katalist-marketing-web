import getFkGroup, { getFkGroupChildren } from "@/libs/getFkGroup";
import { cache } from "react";

const getFkGroupBySlug = cache(async slug => {
	const entities = await getFkGroup();
	const entity = entities.find(item => item.slug === slug);
	if (!entity) return null;

	const parent = entity.parentSlug
		? entities.find(item => item.slug === entity.parentSlug) ?? null
		: null;
	const children = getFkGroupChildren(entities, entity.slug);

	return { ...entity, parent, children };
});

export default getFkGroupBySlug;
