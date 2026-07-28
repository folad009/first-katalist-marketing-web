import {
	buildPreviewPath,
	fetchPreviewSlugById,
	getPreviewRouteMappings,
	resolvePreviewRouteSegment,
} from "@/lib/wordpress-preview";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * Enable Next.js draft mode and redirect to the preview page.
 *
 * GET /api/draft?secret=...&type=post&slug=my-post
 * GET /api/draft?secret=...&type=post&id=123
 */
export async function GET(request) {
	const expectedSecret = process.env.WORDPRESS_PREVIEW_SECRET;
	const { searchParams } = new URL(request.url);

	const secret = searchParams.get("secret");
	const type =
		searchParams.get("type") ??
		searchParams.get("contentType") ??
		searchParams.get("post_type");
	const slug = searchParams.get("slug");
	const id = searchParams.get("id");

	if (!expectedSecret || secret !== expectedSecret) {
		return NextResponse.json({ message: "Invalid preview secret" }, { status: 401 });
	}

	if (!type) {
		return NextResponse.json(
			{
				message: "Missing content type",
				contentTypeMappings: getPreviewRouteMappings(),
			},
			{ status: 400 }
		);
	}

	if (!resolvePreviewRouteSegment(type)) {
		return NextResponse.json(
			{
				message: "Unsupported content type",
				contentTypeMappings: getPreviewRouteMappings(),
			},
			{ status: 400 }
		);
	}

	const draft = await draftMode();
	draft.enable();

	let targetSlug = slug;

	if (!targetSlug && id) {
		try {
			targetSlug = await fetchPreviewSlugById(type, id);
		} catch (error) {
			console.error("Preview slug lookup failed:", error);
			return NextResponse.json(
				{ message: "Failed to load preview content" },
				{ status: 502 }
			);
		}
	}

	const previewPath = buildPreviewPath(type, targetSlug);

	if (!previewPath) {
		return NextResponse.json(
			{ message: "Preview content not found. Provide a valid slug or id." },
			{ status: 404 }
		);
	}

	redirect(previewPath);
}
