"use client";
import getNavItems from "@/libs/getNavItems";
import { createContext, useContext } from "react";

const NavItemsContext = createContext(null);

/** Supplies the CMS-built header menu (from the root layout) to Navbar/MobileMenu. */
export default function NavItemsProvider({ items, children }) {
	return <NavItemsContext.Provider value={items}>{children}</NavItemsContext.Provider>;
}

/** Header menu items; falls back to the static menu outside the provider. */
export function useNavItems() {
	return useContext(NavItemsContext) ?? getNavItems();
}
