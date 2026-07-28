import { fetchGraphQL } from "@/lib/wordpress";
import {
	GET_CAREER_BY_ID,
	GET_PORTFOLIO_BY_ID,
	GET_POST_BY_ID,
	GET_SERVICE_BY_ID,
	GET_TEAM_MEMBER_BY_ID,
} from "@/lib/wordpress-queries";
import { draftMode } from "next/headers";

/** WordPress post type → frontend route segment */
export const CONTENT_TYPE_TO_ROUTE = {
	post: "blogs",
	posts: "blogs",
	service: "services",
	services: "services",
	portfolio: "portfolios",
	portfolios: "portfolios",
	team_member: "team",
	team: "team",
	career: "careers",
	careers: "careers",
};

const PREVIEW_BY_ID_QUERY = {
	post: GET_POST_BY_ID,
	service: GET_SERVICE_BY_ID,
	portfolio: GET_PORTFOLIO_BY_ID,
	team_member: GET_TEAM_MEMBER_BY_ID,
	career: GET_CAREER_BY_ID,
};

const PREVIEW_NODE_KEY = {
	post: "post",
	service: "service",
	portfolio: "portfolio",
	team_member: "teamMember",
	career: "career",
};

const TYPE_ALIASES = {
	post: "post",
	posts: "post",
	service: "service",
	services: "service",
	portfolio: "portfolio",
	portfolios: "portfolio",
	team_member: "team_member",
	team: "team_member",
	career: "career",
	careers: "career",
};

function normalizePreviewType(type) {
	return TYPE_ALIASES[String(type ?? "").toLowerCase().trim()] ?? null;
}

export async function isDraftModeEnabled() {
	const { isEnabled } = await draftMode();
	return isEnabled;
}

export function resolvePreviewRouteSegment(type) {
	if (!type) return null;
	const normalized = String(type).toLowerCase().trim();
	return CONTENT_TYPE_TO_ROUTE[normalized] ?? null;
}

export function buildPreviewPath(type, slug) {
	const segment = resolvePreviewRouteSegment(type);
	if (!segment || !slug) return null;
	return `/${segment}/${slug}`;
}

export async function fetchPreviewSlugById(type, id) {
	const normalized = normalizePreviewType(type);
	const query = normalized ? PREVIEW_BY_ID_QUERY[normalized] : null;
	const nodeKey = normalized ? PREVIEW_NODE_KEY[normalized] : null;

	if (!query || !nodeKey || !id) {
		return null;
	}

	const data = await fetchGraphQL(query, {
		variables: { id: String(id), preview: true },
		preview: true,
	});

	return data?.[nodeKey]?.slug ?? null;
}

export function getPreviewRouteMappings() {
	return { ...CONTENT_TYPE_TO_ROUTE };
}
