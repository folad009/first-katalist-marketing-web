"use client";
import { usePathname } from "next/navigation";

const LIST_PATHS = ["/services", "/portfolios", "/blogs", "/contact"];

const pathMatches = (path, currentPathname) => {
	if (!path || path === "#") return false;
	if (path === currentPathname) return true;
	if (path !== "/" && currentPathname.startsWith(`${path}/`)) return true;
	return false;
};

const makeForcelyInactive = (pathname, currentPathname) => {
	const isListOrDetail = LIST_PATHS.some(p => pathMatches(p, currentPathname));
	return LIST_PATHS.includes(pathname) && isListOrDetail
		? false
		: pathname === currentPathname;
};

const checkActive = (mainObject, currentPathname, isRestricted = false) => {
	if (!mainObject) return false;

	const { path, submenu } = mainObject;
	const isActiveLink =
		(isRestricted
			? makeForcelyInactive(path, currentPathname)
			: pathMatches(path, currentPathname)) ||
		submenu?.some(({ items, path: path1 }) => {
			if (isRestricted ? makeForcelyInactive(path1, currentPathname) : pathMatches(path1, currentPathname)) {
				return true;
			}
			return items?.some(({ path: path2 }) =>
				isRestricted
					? makeForcelyInactive(path2, currentPathname)
					: pathMatches(path2, currentPathname)
			);
		});

	return isActiveLink;
};

export default function useActiveLink() {
	const currentPathname = usePathname();
	const makeActiveLink = modifiableObject => {
		if (!modifiableObject) {
			return { name: "", path: "#", isActive: false, submenu: [] };
		}

		const currentObject = {
			...modifiableObject,
			isActive: checkActive(modifiableObject, currentPathname),
			submenu: modifiableObject?.submenu?.length
				? modifiableObject.submenu.map(submenuItem => ({
						...submenuItem,
						isActive: checkActive(submenuItem, currentPathname),
						items: submenuItem?.items?.length
							? submenuItem.items.map(item => ({
									...item,
									isActive: checkActive(item, currentPathname),
							  }))
							: [],
				  }))
				: [],
		};

		return currentObject;
	};
	return makeActiveLink;
}
