import getALlServices from "@/libs/getALlServices";
import getFkGroup from "@/libs/getFkGroup";
import getNavItems from "@/libs/getNavItems";
import { cache } from "react";

/**
 * Header menu with the Services and FKM Group dropdowns built from WordPress,
 * so adding/renaming/reordering a service or FK Group company updates the menu.
 * Server-only: the result is handed to client components via NavItemsProvider.
 */
const buildNavItems = cache(async () => {
	const [services, fkGroup] = await Promise.all([getALlServices(), getFkGroup()]);

	const dynamicSubmenus = {
		"/services": services.map((service, idx) => ({
			id: idx + 1,
			name: service.title,
			icon: service.iconName,
			path: `/services/${service.slug}`,
		})),
		"/fk-group": fkGroup.map((company, idx) => ({
			id: idx + 1,
			name: company.name,
			path: company.externalUrl || `/fk-group/${company.slug}`,
		})),
	};

	return getNavItems().map(item =>
		dynamicSubmenus[item.path]?.length ? { ...item, submenu: dynamicSubmenus[item.path] } : item
	);
});

export default buildNavItems;
