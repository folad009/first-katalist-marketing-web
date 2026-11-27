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

/* ---------- Line-based ACF text formats (ACF free has no repeaters) ---------- */

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodeEntities(text = "") {
	return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code) => {
		if (code[0] === "#") {
			const num = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
			return Number.isNaN(num) ? match : String.fromCodePoint(num);
		}
		return ENTITIES[code.toLowerCase()] ?? match;
	});
}

/** "a\nb\n\nc" → ["a", "b", "c"] */
export function splitLines(value) {
	if (Array.isArray(value)) return value;
	if (typeof value !== "string") return [];
	return value
		.split(/\r?\n/)
		.map(line => line.trim())
		.filter(Boolean);
}

/** "Key<sep> rest" per line → [{ key, value }] (split on the first separator). */
function splitPairs(value, separator) {
	return splitLines(value).map(line => {
		const at = line.indexOf(separator);
		return at === -1
			? { key: line, value: "" }
			: { key: line.slice(0, at).trim(), value: line.slice(at + separator.length).trim() };
	});
}

const commaList = text =>
	text
		.split(",")
		.map(item => item.trim())
		.filter(Boolean);

/** Post content HTML → plain paragraph strings. */
function htmlParagraphs(html) {
	if (!html) return [];
	const blocks = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) ?? [html];
	return blocks
		.map(block => decodeEntities(block.replace(/<[^>]*>/g, "")).trim())
		.filter(Boolean);
}

/** CMS value if filled in, otherwise the fallback (so an empty field never blanks a section). */
const orFallback = (value, fallback) =>
	value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)
		? fallback
		: value;

/** Clients → { name, img } for the logo slider; clients without a logo are skipped. */
export function mapClients(nodes = []) {
	return nodes
		.map(node => ({
			id: node.databaseId,
			name: decodeEntities(node.title ?? ""),
			img: resolveCmsImage(node.clientFields?.logo, null),
		}))
		.filter(client => client.img);
}

export function mapFaqs(nodes = []) {
	return nodes.map((node, index) => ({
		id: node.databaseId,
		title: decodeEntities(node.title ?? ""),
		desc: node.faqFields?.answer ?? "",
		// The first FAQ (lowest Order) opens by default.
		initActive: index === 0,
	}));
}

export function mapFkCompanies(nodes = []) {
	return nodes.map(node => {
		const acf = normalizeAcfMedia(node.fkCompanyFields ?? {});
		const phones = splitLines(acf.phones);
		const emails = splitLines(acf.emails);
		const hasContact = Boolean(acf.address || acf.locations || phones.length || emails.length);

		return {
			id: node.databaseId,
			name: decodeEntities(node.title ?? ""),
			slug: node.slug,
			parentSlug: node.parent?.node?.slug ?? null,
			shortDesc: acf.shortDesc ?? "",
			paragraphs: htmlParagraphs(node.content),
			color: acf.color || "blue",
			logo: acf.logo ?? null,
			externalUrl: acf.externalUrl || null,
			servicesTitle: acf.servicesTitle ?? "",
			services: splitPairs(acf.services, ":").map(({ key, value }) => ({ title: key, desc: value })),
			closing: acf.closing ?? "",
			contact: hasContact
				? {
						...(acf.address ? { address: acf.address } : {}),
						...(acf.locations ? { locations: acf.locations } : {}),
						phones,
						emails,
					}
				: null,
			relatedLinks: splitPairs(acf.relatedLinks, "|").map(({ key, value }) => ({ label: key, path: value })),
		};
	});
}

/**
 * Company Profile page fields → the company-profile.json shape.
 * Each empty field keeps the value from `fallback` (the local JSON).
 */
export function mapCompanyProfile(data, fallback) {
	const f = data?.page?.companyProfile;
	if (!f) return fallback;

	const awards = splitPairs(f.awards, "|").map(({ key, value }) =>
		value ? { year: key, title: value } : { year: null, title: key }
	);
	const coverageRegions = splitPairs(f.coverageRegions, ":").map(({ key, value }) => ({
		name: key,
		cities: commaList(value),
	}));
	const fieldRegions = splitPairs(f.fieldRegions, ":").map(({ key, value }) => ({
		name: key,
		levels: commaList(value),
	}));

	return {
		...fallback,
		strategyQuote: {
			label: orFallback(f.strategyQuoteLabel, fallback.strategyQuote?.label),
			text: orFallback(f.strategyQuoteText, fallback.strategyQuote?.text),
			attribution: orFallback(f.strategyQuoteAttribution, fallback.strategyQuote?.attribution),
		},
		facts: {
			...fallback.facts,
			commenced: orFallback(f.factCommenced, fallback.facts?.commenced),
			team: orFallback(f.factTeam, fallback.facts?.team),
			expertise: orFallback(f.factExpertise, fallback.facts?.expertise),
		},
		vision: orFallback(f.vision, fallback.vision),
		mission: orFallback(f.mission, fallback.mission),
		coreValues: orFallback(splitLines(f.coreValues), fallback.coreValues),
		ourEdge: orFallback(splitLines(f.ourEdge), fallback.ourEdge),
		awards: orFallback(awards, fallback.awards),
		regionalCoverage: {
			...fallback.regionalCoverage,
			sectionTitle: orFallback(f.coverageSectionTitle, fallback.regionalCoverage?.sectionTitle),
			capabilitiesTitle: orFallback(f.capabilitiesTitle, fallback.regionalCoverage?.capabilitiesTitle),
			intro: orFallback(splitLines(f.coverageIntro), fallback.regionalCoverage?.intro),
			fieldOperativesNote: orFallback(f.fieldOperativesNote, fallback.regionalCoverage?.fieldOperativesNote),
			regions: orFallback(coverageRegions, fallback.regionalCoverage?.regions),
		},
		fieldStructure: {
			...fallback.fieldStructure,
			sectionTitle: orFallback(f.fieldStructureTitle, fallback.fieldStructure?.sectionTitle),
			summary: orFallback(f.fieldStructureSummary, fallback.fieldStructure?.summary),
			topRole: orFallback(f.fieldTopRole, fallback.fieldStructure?.topRole),
			supportRole: orFallback(f.fieldSupportRole, fallback.fieldStructure?.supportRole),
			regions: orFallback(fieldRegions, fallback.fieldStructure?.regions),
		},
	};
}

export { repeatImage, featuredImageUrl, stripHtml, resolveCmsImage };
