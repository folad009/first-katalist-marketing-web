import {
	getAllowedRevalidateTags,
	getContentTypeMappings,
	resolveRevalidateTag,
} from "@/lib/wordpress";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

async function parsePayload(request) {
	const { searchParams } = new URL(request.url);
	let body = {};

	try {
		const contentType = request.headers.get("content-type") ?? "";
		if (contentType.includes("application/json")) {
			body = await request.json();
		}
	} catch {
		// Ignore invalid JSON bodies; query params may still be valid.
	}

	return {
		secret:
			searchParams.get("secret") ??
			request.headers.get("x-revalidation-secret") ??
			body.secret ??
			null,
		tag: searchParams.get("tag") ?? body.tag ?? null,
		type:
			searchParams.get("type") ??
			searchParams.get("contentType") ??
			body.type ??
			body.contentType ??
			body.post_type ??
			null,
	};
}

/**
 * On-demand cache revalidation for WordPress webhooks.
 *
 * POST /api/revalidate?secret=...&type=post
 * POST /api/revalidate?secret=...&tag=posts
 *
 * JSON body alternative:
 * { "secret": "...", "type": "service" }
 */
export async function POST(request) {
	const expectedSecret = process.env.REVALIDATION_SECRET;
	const payload = await parsePayload(request);

	if (!expectedSecret || payload.secret !== expectedSecret) {
		return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
	}

	const tag = resolveRevalidateTag({
		tag: payload.tag,
		type: payload.type,
	});

	if (!tag) {
		return NextResponse.json(
			{
				message: "Invalid or missing content type / tag",
				allowedTags: getAllowedRevalidateTags(),
				contentTypeMappings: getContentTypeMappings(),
			},
			{ status: 400 }
		);
	}

	revalidateTag(tag, "max");

	return NextResponse.json({
		revalidated: true,
		tag,
		type: payload.type ?? null,
		now: Date.now(),
	});
}

export async function GET() {
	return NextResponse.json(
		{
			message: "Use POST with secret and type (or tag).",
			example:
				"POST /api/revalidate?secret=YOUR_SECRET&type=post",
			allowedTags: getAllowedRevalidateTags(),
			contentTypeMappings: getContentTypeMappings(),
		},
		{ status: 405 }
	);
}
