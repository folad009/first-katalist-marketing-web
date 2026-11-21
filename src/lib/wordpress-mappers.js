/**
 * Map WPGraphQL nodes to the shapes expected by template components.
 * ACF field groups: postFields, serviceFields, portfolioFields,
 * teamMemberFields, testimonialFields, careerFields, siteImages.
 *
 * Complex nested data (process, comments, statusItem, etc.) can be stored
 * in the ACF `templateData` JSON field and is merged into the result.
 */

import { mapSeo } from "@/lib/wordpress-mappers-seo";
import { SITE_IMAGE_FALLBACKS } from "@/lib/site-images";
import slugify from "@/lib/slugify";

function parseTemplateData(value) {
	if (!value) return {};
	if (typeof value === "object") return value;
	try {
		return JSON.parse(value);
	} catch {
		return {};
	}
}

function featuredImageUrl(node) {
	return node?.featuredImage?.node?.sourceUrl ?? null;
}

/** True for a WPGraphQL media connection/node, e.g. `{ node: { sourceUrl } }`. */
function isMediaValue(value) {
	return (
		value !== null &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		("node" in value || "sourceUrl" in value)
	);
}

function resolveCmsImage(value, fallback) {
	if (typeof value === "string" && value.trim()) {
		return value.trim();
	}

	const mediaUrl = value?.node?.sourceUrl ?? value?.sourceUrl ?? null;
	if (typeof mediaUrl === "string" && mediaUrl.trim()) {
		return mediaUrl.trim();
	}

	return fallback;
}

/**
 * ACF image fields come back as media objects (or null when empty).
 * Flatten them to a URL string, or null so `??` falls back to the template image.
 */
function normalizeAcfMedia(acf) {
	return Object.fromEntries(
		Object.entries(acf).map(([key, value]) => [
			key,
			isMediaValue(value) || value === null
				? resolveCmsImage(value, null)
				: value,
		])
	);
}

function stripHtml(html) {
	if (!html) return "";
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/&nbsp;/g, " ")
		.replace(/&#038;/g, "&")
		.replace(/&amp;/g, "&")
		.trim();
}

function formatBlogDate(dateString) {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return dateString;
	const day = date.getDate();
	const month = date
		.toLocaleString("en-US", { month: "short" })
		.toUpperCase();
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
}

function formatBlogDate2(dateString) {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return dateString;
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function repeatImage(img, keys) {
	return keys.reduce((acc, key) => {
		acc[key] = img;
		return acc;
	}, {});
}

function mergeAcf(node, fieldKey) {
	const acf = normalizeAcfMedia(node?.[fieldKey] ?? {});
	const templateData = parseTemplateData(acf.templateData);
	const { templateData: _ignored, ...restAcf } = acf;
	// Empty ACF fields (null) must not override values supplied by templateData.
	const filledAcf = Object.fromEntries(
		Object.entries(restAcf).filter(([, value]) => value !== null)
	);
	return { ...templateData, ...filledAcf };
}

function resolveSlug(node, fallbackLabel, fallbackId) {
	return (
		node?.slug ||
		slugify(fallbackLabel) ||
		(fallbackId != null ? `item-${fallbackId}` : "")
	);
}

function parseTagsField(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "string" && value.trim()) {
		return value.split(",").map(tag => tag.trim());
	}
	return [];
}

export function mapPosts(nodes = []) {
	return nodes.map(node => {
		const acf = mergeAcf(node, "postFields");
		const img =
			acf.img ??
			acf.detailsImg ??
			acf.smallImg ??
			featuredImageUrl(node) ??
			"/images/blog/blog-1.webp";
		const category =
			acf.category ??
			node.categories?.nodes?.[0]?.name ??
			"Corporate";
		const tags =
			parseTagsField(acf.tags).length > 0
				? parseTagsField(acf.tags)
				: node.tags?.nodes?.map(tag => tag.name) ?? [];
		const date = acf.date ?? formatBlogDate(node.date);
		const parsedDate = new Date(node.date);

		return {
			id: node.databaseId,
			title: node.title,
			slug: resolveSlug(node, node.title, node.databaseId),
			contentHtml: node.content ?? "",
			seo: mapSeo(node),
			img,
			img1: acf.img1 ?? img,
			img2: acf.img2 ?? img,
			img3: acf.img3 ?? img,
			img4: acf.img4 ?? img,
			img5: acf.img5 ?? img,
			img6: acf.img6 ?? img,
			detailsImg: acf.detailsImg ?? img,
			smallImg: acf.smallImg ?? img,
			desc: acf.desc ?? stripHtml(node.excerpt),
			desc1: acf.desc1 ?? stripHtml(node.content),
			desc2: acf.desc2 ?? "",
			date,
			date2: acf.date2 ?? formatBlogDate2(node.date),
			day: acf.day ?? (Number.isNaN(parsedDate.getTime()) ? 1 : parsedDate.getDate()),
			month:
				acf.month ??
				(Number.isNaN(parsedDate.getTime())
					? "JAN"
					: parsedDate.toLocaleString("en-US", { month: "short" }).toUpperCase()),
			category,
			tags,
			author_role: acf.authorRole ?? acf.author_role ?? "Analysis",
			author: acf.author ?? node.author?.node?.slug ?? "admin",
			status: acf.status ?? "Tutorial",
			isBlogQuote: acf.isBlogQuote ?? false,
			blogTopList: acf.blogTopList ?? [],
			comments: acf.comments ?? [],
		};
	});
}

export function mapServices(nodes = []) {
	return nodes.map(node => {
		const acf = mergeAcf(node, "serviceFields");
		const img =
			acf.img ??
			acf.bgImg ??
			featuredImageUrl(node) ??
			"/images/service/service-1.webp";

		return {
			id: node.databaseId,
			title: node.title,
			slug: resolveSlug(node, node.title, node.databaseId),
			contentHtml: node.content ?? "",
			seo: mapSeo(node),
			shortTitle: acf.shortTitle ?? node.title,
			titleLarge: acf.titleLarge ?? stripHtml(node.excerpt) ?? node.title,
			img,
			img2: acf.img2 ?? img,
			img3: acf.img3 ?? img,
			img4: acf.img4 ?? img,
			img5: acf.img5 ?? img,
			bgImg: acf.bgImg ?? img,
			bgImg2: acf.bgImg2 ?? img,
			iconName: acf.iconName ?? "tji-service-1",
			svg: acf.svg ?? "/images/icons/service-1.svg",
			desc: acf.desc ?? stripHtml(node.excerpt),
			shortDesc: acf.shortDesc ?? stripHtml(node.excerpt),
			desc1: acf.desc1 ?? stripHtml(node.content),
			desc2: acf.desc2 ?? "",
			desc3: acf.desc3 ?? "",
			totalProject: acf.totalProject ?? "",
			subServices: acf.subServices ?? [],
			process: acf.process ?? null,
		};
	});
}

export function mapPortfolio(nodes = []) {
	return nodes.map(node => {
		const acf = mergeAcf(node, "portfolioFields");
		const img =
			acf.img ??
			acf.imgLarge ??
			featuredImageUrl(node) ??
			"/images/project/project-1.webp";
		const tags = parseTagsField(acf.tags);

		return {
			id: node.databaseId,
			title: node.title,
			slug: resolveSlug(node, node.title, node.databaseId),
			contentHtml: node.content ?? "",
			seo: mapSeo(node),
			title2: acf.title2 ?? "Project Description",
			titleLarge: acf.titleLarge ?? node.title,
			img,
			img2: acf.img2 ?? img,
			img3: acf.img3 ?? img,
			img4: acf.img4 ?? img,
			img5: acf.img5 ?? img,
			img6: acf.img6 ?? img,
			img7: acf.img7 ?? img,
			img8: acf.img8 ?? img,
			imgLarge: acf.imgLarge ?? img,
			detailsImg: acf.detailsImg ?? img,
			desc: acf.desc ?? stripHtml(node.excerpt),
			shortDesc: acf.shortDesc ?? stripHtml(node.excerpt),
			desc1: acf.desc1 ?? stripHtml(node.content),
			desc2: acf.desc2 ?? "",
			category: acf.category ?? "",
			featured: acf.featured ?? false,
			featuredDesc: acf.featuredDesc ?? "",
			featuredImg: acf.featuredImg ?? img,
			employee: acf.employee ?? null,
			tags,
			dataFilter: acf.dataFilter ?? "",
			statusItem: acf.statusItem ?? [],
			descItems: acf.descItems ?? [],
			objectives: acf.objectives ?? [],
			activity: acf.activity ?? [],
			results: acf.results ?? [],
			client: acf.client ?? "",
		};
	});
}

export function mapTeamMembers(nodes = []) {
	return nodes.map(node => {
		const acf = mergeAcf(node, "teamMemberFields");
		const img =
			acf.img ??
			featuredImageUrl(node) ??
			"/images/team/team-1.webp";

		return {
			id: node.databaseId,
			name: acf.name ?? node.title,
			slug: resolveSlug(node, acf.name ?? node.title, node.databaseId),
			contentHtml: node.content ?? "",
			seo: mapSeo(node),
			desig: acf.desig ?? "",
			img,
			img2: acf.img2 ?? img,
			imgLarge: acf.imgLarge ?? img,
		};
	});
}

export function mapTestimonials(nodes = []) {
	return nodes.map(node => {
		const acf = mergeAcf(node, "testimonialFields");
		const img =
			acf.img ??
			featuredImageUrl(node) ??
			"/images/testimonial/client-1.webp";
		const desc = acf.desc ?? stripHtml(node.excerpt) ?? "";

		return {
			id: node.databaseId,
			authorName: acf.authorName ?? node.title,
			authorDesig: acf.authorDesig ?? "",
			img,
			img2: acf.img2 ?? img,
			logoImg: acf.logoImg ?? "",
			logoImgLight: acf.logoImgLight ?? "",
			thumbImg: acf.thumbImg ?? img,
			desc,
			desc2: acf.desc2 ?? desc,
			desc3: acf.desc3 ?? desc,
			desc4: acf.desc4 ?? desc,
			desc5: acf.desc5 ?? desc,
		};
	});
}

export function mapCareers(nodes = []) {
	return nodes.map(node => {
		const acf = mergeAcf(node, "careerFields");

		return {
			id: node.databaseId,
			title: node.title,
			slug: resolveSlug(node, node.title, node.databaseId),
			contentHtml: node.content ?? "",
			seo: mapSeo(node),
			iconName: acf.iconName ?? "tji-strategy",
			price: acf.price ?? "",
			duration: acf.duration ?? "",
			location: acf.location ?? "",
			category: acf.category ?? "",
			need: acf.need ?? "",
		};
	});
}

/**
 * Site images come from the "Site Images" page in WordPress:
 * `page(id: "site-images") { siteImages { ... } }`.
 * Each empty slot falls back to the local file in SITE_IMAGE_FALLBACKS.
 */
export function mapSiteImages(data) {
	const fields =
		data?.page?.siteImages ??
		data?.siteImages?.siteImageFields ??
		data?.siteImages ??
		{};

	return Object.fromEntries(
		Object.entries(SITE_IMAGE_FALLBACKS).map(([key, fallback]) => [
			key,
			resolveCmsImage(fields?.[key], fallback),
		])
	);
}

export function mapCategoryNames(nodes = []) {
	return nodes.map(node => node.name).filter(Boolean);
}

export function mapTagNames(nodes = []) {
	return nodes.map(node => node.name).filter(Boolean);
}

export { repeatImage, featuredImageUrl, stripHtml, resolveCmsImage };
