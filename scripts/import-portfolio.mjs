/**
 * One-off import: public/fakedata/portfolio.json → WordPress "Portfolio".
 *
 *   node scripts/import-portfolio.mjs           (dry run)
 *   node scripts/import-portfolio.mjs --apply
 *
 * Credentials: see scripts/lib/wp-import.mjs. Re-running skips existing slugs.
 * Needs "Show in REST API" on the Portfolio Fields ACF group.
 *
 * - contentHtml → post content (the details page renders it when present).
 * - Plain fields → portfolioFields. Tags are sent comma-separated; the site
 *   splits them back into a list.
 * - Lists/objects with no dedicated ACF field (objectives, results, activity,
 *   client, employee, statusItem, descItems) → the `templateData` JSON field.
 * - Images are not imported: the fakedata images are template placeholders.
 * - The site lists portfolio oldest-first by publish date, so dates are spaced
 *   one minute apart in JSON order.
 */

import { importPosts, readFakedata } from "./lib/wp-import.mjs";

const projects = await readFakedata("portfolio.json");
const start = Date.now() - (projects.length + 1) * 60_000;

const ACF_TEXT_FIELDS = [
	"title2",
	"titleLarge",
	"desc",
	"shortDesc",
	"desc1",
	"desc2",
	"category",
	"featuredDesc",
	"dataFilter",
];

const TEMPLATE_DATA_FIELDS = [
	"objectives",
	"activity",
	"results",
	"client",
	"employee",
	"statusItem",
	"descItems",
];

await importPosts({
	restBase: "portfolio",
	items: projects,
	acfCheckField: "titleLarge",
	toPayload: (project, i) => ({
		title: project.title,
		slug: project.slug,
		date_gmt: new Date(start + i * 60_000).toISOString().slice(0, 19),
		content: project.contentHtml ?? "",
		acf: {
			...Object.fromEntries(ACF_TEXT_FIELDS.map(key => [key, project[key] ?? ""])),
			featured: Boolean(project.featured),
			tags: (project.tags ?? []).join(", "),
			templateData: JSON.stringify(
				Object.fromEntries(
					TEMPLATE_DATA_FIELDS.filter(key => project[key] !== undefined).map(key => [
						key,
						project[key],
					])
				),
				null,
				2
			),
		},
	}),
});
