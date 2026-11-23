"use client";

import { useEffect, useState } from "react";

/** Scroll distance (px) after which the fixed header slides in — just past the normal header. */
const STICKY_OFFSET = 200;

/**
 * True once the page is scrolled past the normal header, in either direction,
 * so the sticky navigation stays available while reading. Resets near the top,
 * where the normal header is visible again.
 */
const useIsSticky = isStickyHeader => {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		if (!isStickyHeader) return undefined;

		const handleScroll = () => setIsSticky(window.scrollY > STICKY_OFFSET);

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isStickyHeader]);

	return isSticky;
};

export default useIsSticky;
