/**
 * One-off import: public/fakedata/services.json → WordPress "Services".
 *
 *   node scripts/import-services.mjs           (dry run)
 *   node scripts/import-services.mjs --apply
 *
 * Credentials: see scripts/lib/wp-import.mjs. Re-running skips existing slugs.
 *
 * - Plain fields go to their ACF serviceFields.
 * - subServices and process (stages / steps) have no dedicated ACF field, so
 *   they go into the `templateData` JSON field, which the site merges in.
 * - The post content is left empty on purpose: with content set, the service
 *   page switches to a layout that drops the sub-services/process sections.
 * - Images are not imported: the fakedata images are template placeholders.
 * - The site lists services oldest-first by publish date, so dates are spaced
 *   one minute apart in JSON order.
 */

import { importPosts, readFakedata } from "./lib/wp-import.mjs";

const services = await readFakedata("services.json");
const start = Date.now() - (services.length + 1) * 60_000;

const ACF_TEXT_FIELDS = [
	"shortTitle",
	"titleLarge",
	"iconName",
	"svg",
	"desc",
	"shortDesc",
	"desc1",
	"desc2",
	"desc3",
	"totalProject",
];

// Only the process keys the service page renders; the image/icon copies in
// the fakedata are unused template leftovers.
function pickProcess(process) {
	if (!process) return null;
	const { title, desc, stages, processItems, diagramTodo } = process;
	return Object.fromEntries(
		Object.entries({ title, desc, stages, processItems, diagramTodo }).filter(
			([, value]) => value !== undefined
		)
	);
}

await importPosts({
	restBase: "service",
	items: services,
	acfCheckField: "shortTitle",
	toPayload: (service, i) => ({
		title: service.title,
		slug: service.slug,
		date_gmt: new Date(start + i * 60_000).toISOString().slice(0, 19),
		content: "",
		acf: {
			...Object.fromEntries(ACF_TEXT_FIELDS.map(key => [key, service[key] ?? ""])),
			templateData: JSON.stringify(
				{ subServices: service.subServices ?? [], process: pickProcess(service.process) },
				null,
				2
			),
		},
	}),
});
