import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Disable Next.js draft mode.
 * GET /api/draft/disable?redirect=/
 */
export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const redirectTo = searchParams.get("redirect") || "/";

	const draft = await draftMode();
	draft.disable();

	redirect(redirectTo);
}
