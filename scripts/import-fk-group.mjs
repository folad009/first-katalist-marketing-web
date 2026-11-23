/**
 * One-off import: public/fakedata/fk-group.json → WordPress "FK Group".
 *
 *   node scripts/import-fk-group.mjs           (dry run)
 *   node scripts/import-fk-group.mjs --apply
 *
 * Needs the FK Group post type from wordpress/acf-fkm-content.json.
 * - paragraphs → post content (one <p> each)
 * - parentSlug → Page Attributes → Parent (parents come first in the JSON)
 * - services / related links / phones / emails → one-per-line text fields
 *   in the formats the site parses (see src/lib/wordpress-mappers.js)
 * - logoTodo / sourceNote are internal notes and are not imported.
 * Order is kept via menu_order. Re-running skips existing slugs.
 */

import { importPosts, readFakedata } from "./lib/wp-import.mjs";

const companies = await readFakedata("fk-group.json");

const escapeHtml = text =>
	text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

await importPosts({
	restBase: "fk_company",
	items: companies,
	acfCheckField: "short_desc",
	toPayload: (company, i, idsBySlug) => ({
		title: company.name,
		slug: company.slug,
		menu_order: i,
		parent: company.parentSlug ? idsBySlug[company.parentSlug] ?? 0 : 0,
		content: (company.paragraphs ?? []).map(p => `<p>${escapeHtml(p)}</p>`).join("\n"),
		acf: {
			short_desc: company.shortDesc ?? "",
			color: company.color ?? "blue",
			external_url: company.externalUrl ?? "",
			services_title: company.servicesTitle ?? "",
			services: (company.services ?? []).map(s => `${s.title}: ${s.desc}`).join("\n"),
			closing: company.closing ?? "",
			address: company.contact?.address ?? "",
			locations: company.contact?.locations ?? "",
			phones: (company.contact?.phones ?? []).join("\n"),
			emails: (company.contact?.emails ?? []).join("\n"),
			related_links: (company.relatedLinks ?? []).map(l => `${l.label} | ${l.path}`).join("\n"),
		},
	}),
});
