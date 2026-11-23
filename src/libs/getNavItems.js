import navItems from "../../public/fakedata/nav-items.json";

/**
 * Static header menu (top-level items and their order live in code).
 * The Services and FKM Group dropdowns are replaced with CMS data by
 * buildNavItems() in the root layout; this is the fallback.
 */
const getNavItems = () => navItems ?? [];

export default getNavItems;
