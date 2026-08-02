import { cache } from "react";
import fkGroup from "../../public/fakedata/fk-group";

const getFkGroup = cache(async () => {
	return Array.isArray(fkGroup) ? fkGroup : [];
});

export function getFkGroupTopLevel(entities = []) {
	return entities.filter(item => item.parentSlug == null);
}

export function getFkGroupChildren(entities = [], parentSlug) {
	return entities.filter(item => item.parentSlug === parentSlug);
}

export default getFkGroup;
