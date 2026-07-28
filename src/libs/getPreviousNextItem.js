const getPreviousNextItem = (items, currentSlug) => {
	const currentIndex =
		items?.findIndex(({ slug }) => slug === currentSlug) ?? -1;

	if (currentIndex === -1) {
		return {
			prevSlug: null,
			nextSlug: null,
			currentItem: null,
			isPrevItem: false,
			isNextItem: false,
		};
	}

	const prevItem = items[currentIndex - 1];
	const nextItem = items[currentIndex + 1];

	return {
		prevSlug: prevItem?.slug ?? null,
		nextSlug: nextItem?.slug ?? null,
		currentItem: items[currentIndex],
		isPrevItem: currentIndex > 0,
		isNextItem: currentIndex < items.length - 1,
	};
};

export default getPreviousNextItem;
