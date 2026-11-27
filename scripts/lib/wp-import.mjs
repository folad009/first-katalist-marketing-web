/**
 * Shared helpers for the one-off fakedata → WordPress import scripts.
 *
 * Env vars:
 *   WORDPRESS_URL            default https://cms.firstkatalystmarketing.com
 *   WORDPRESS_ADMIN_USER     WordPress username
 *   WORDPRESS_APP_PASSWORD   Users → Profile → Application Passwords
 */

import { readFile } from "node:fs/promises";

export const APPLY = process.argv.includes("--apply");

const BASE = (process.env.WORDPRESS_URL || "https://cms.firstkatalystmarketing.com").replace(/\/$/, "");
const USER = process.env.WORDPRESS_ADMIN_USER?.trim();
const PASS = process.env.WORDPRESS_APP_PASSWORD?.trim();

const authHeaders =
	USER && PASS
		? { Authorization: `Basic ${Buffer.from(`${USER}:${PASS}`).toString("base64")}` }
		: {};

// Same rules as src/lib/slugify.js so existing URLs keep working.
export function slugify(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/['']/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

export async function readFakedata(name) {
	return JSON.parse(
		await readFile(new URL(`../../public/fakedata/${name}`, import.meta.url), "utf8")
	);
}

async function wp(url, options = {}) {
	const res = await fetch(url, {
		...options,
		headers: { "Content-Type": "application/json", ...authHeaders, ...options.headers },
	});
	const body = await res.json().catch(() => null);
	if (!res.ok) {
		throw new Error(`${options.method || "GET"} ${url} → ${res.status}: ${body?.message ?? res.statusText}`);
	}
	return body;
}

/**
 * Create one post per item, skipping slugs that already exist.
 *
 * @param {object} opts
 * @param {string} opts.restBase      REST route, e.g. "team_member" or "service"
 * @param {Array}  opts.items         source records
 * @param {(item, index) => object} opts.toPayload  build {title, slug, content, acf, ...}
 * @param {string} opts.acfCheckField ACF key that must round-trip, to detect
 *                                    a field group without "Show in REST API"
 * @param {(payload, item) => Promise<void>} [opts.beforeCreate] runs only for
 *        items about to be created with --apply (e.g. upload a logo and set its
 *        media ID on payload.acf), never on a dry run or for skipped items
 */
export async function importPosts({ restBase, items, toPayload, acfCheckField, beforeCreate }) {
	const endpoint = `${BASE}/wp-json/wp/v2/${restBase}`;

	if (APPLY && !authHeaders.Authorization) {
		console.error("Set WORDPRESS_ADMIN_USER and WORDPRESS_APP_PASSWORD to use --apply.");
		process.exit(1);
	}

	console.log(`${APPLY ? "IMPORTING" : "DRY RUN"} ${items.length} items → ${endpoint}\n`);

	let created = 0;
	let skipped = 0;
	// slug → WordPress ID of every item seen so far (existing or created), so
	// toPayload can point a child at its parent (e.g. FK Ghana → FKM).
	const idsBySlug = {};

	for (const [index, item] of items.entries()) {
		const payload = { status: "publish", ...toPayload(item, index, idsBySlug) };
		// ACF field names in WordPress are lowercase (shorttitle); only WPGraphQL
		// exposes them in camelCase (shortTitle). REST expects the real names.
		payload.acf = Object.fromEntries(
			Object.entries(payload.acf ?? {}).map(([key, value]) => [key.toLowerCase(), value])
		);
		acfCheckField = acfCheckField.toLowerCase();

		// context=edit + auth also finds drafts/private posts, not just published ones.
		const query = authHeaders.Authorization
			? `?slug=${payload.slug}&status=publish,draft,pending,private,future&context=edit`
			: `?slug=${payload.slug}`;
		const [existing] = await wp(`${endpoint}${query}`);

		if (existing) {
			idsBySlug[payload.slug] = existing.id;
			console.log(`skip    ${payload.title} (already in WordPress, id ${existing.id})`);
			skipped++;
			continue;
		}

		if (!APPLY) {
			console.log(`create  ${payload.title} (${payload.slug})`);
			continue;
		}

		if (beforeCreate) await beforeCreate(payload, item);

		const post = await wp(endpoint, { method: "POST", body: JSON.stringify(payload) });

		// ACF may return numbers (e.g. image IDs) as numbers or strings.
		if (String(post.acf?.[acfCheckField] ?? "") !== String(payload.acf[acfCheckField] ?? "")) {
			console.error(
				`\nCreated "${payload.title}" (id ${post.id}) but ACF fields were not saved.\n` +
					`Enable "Show in REST API" on this post type's ACF field group, ` +
					`delete that post, and re-run.`
			);
			process.exit(1);
		}

		idsBySlug[payload.slug] = post.id;
		console.log(`created ${payload.title} (id ${post.id}, ${post.slug})`);
		created++;
	}

	console.log(`\nDone: ${APPLY ? `${created} created` : "nothing written"}, ${skipped} skipped.`);
}

const MIME_TYPES = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", svg: "image/svg+xml" };

/**
 * Upload a file from public/ (e.g. "/images/clients/logo.jpg") to the Media
 * Library and return its attachment ID.
 */
export async function uploadMedia(publicPath, { alt = "" } = {}) {
	const filename = publicPath.split("/").pop();
	const type = MIME_TYPES[filename.split(".").pop().toLowerCase()];
	if (!type) throw new Error(`Unsupported file type: ${filename}`);

	const file = await readFile(new URL(`../../public${publicPath}`, import.meta.url));
	const media = await wp(`${BASE}/wp-json/wp/v2/media`, {
		method: "POST",
		headers: { "Content-Type": type, "Content-Disposition": `attachment; filename="${filename}"` },
		body: file,
	});

	if (alt) {
		await wp(`${BASE}/wp-json/wp/v2/media/${media.id}`, {
			method: "POST",
			body: JSON.stringify({ alt_text: alt }),
		});
	}
	return media.id;
}

/**
 * Fill the ACF fields of an existing page (e.g. Company Profile). Fields that
 * already have a value in WordPress are left alone, so editors' changes are
 * never overwritten by a re-run.
 */
export async function fillPageFields({ slug, acf }) {
	const endpoint = `${BASE}/wp-json/wp/v2/pages`;

	if (!authHeaders.Authorization) {
		console.error("Set WORDPRESS_ADMIN_USER and WORDPRESS_APP_PASSWORD (needed even for a dry run).");
		process.exit(1);
	}

	const [page] = await wp(`${endpoint}?slug=${slug}&status=publish,draft,private&context=edit`);
	if (!page) {
		console.error(`No page with slug "${slug}" in WordPress — create it first.`);
		process.exit(1);
	}

	const current = page.acf ?? {};
	const missing = Object.keys(acf).filter(key => !(key in current));
	if (missing.length) {
		console.error(
			`Page "${slug}" (id ${page.id}) has no ACF fields named: ${missing.join(", ")}.\n` +
				`Import wordpress/acf-fkm-content.json in ACF → Tools first.`
		);
		process.exit(1);
	}

	const toFill = Object.fromEntries(
		Object.entries(acf).filter(([key]) => current[key] === null || current[key] === "")
	);
	const kept = Object.keys(acf).filter(key => !(key in toFill));

	console.log(`${APPLY ? "UPDATING" : "DRY RUN"} page "${slug}" (id ${page.id})`);
	console.log(`fill  ${Object.keys(toFill).join(", ") || "(nothing)"}`);
	if (kept.length) console.log(`keep  ${kept.join(", ")} (already filled in WordPress)`);

	if (!APPLY || !Object.keys(toFill).length) return;

	const updated = await wp(`${endpoint}/${page.id}`, {
		method: "POST",
		body: JSON.stringify({ acf: toFill }),
	});
	const failed = Object.keys(toFill).filter(key => updated.acf?.[key] !== toFill[key]);
	if (failed.length) {
		console.error(`These fields did not save: ${failed.join(", ")}`);
		process.exit(1);
	}
	console.log(`\nDone: ${Object.keys(toFill).length} fields saved.`);
}
