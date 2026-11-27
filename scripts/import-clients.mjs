/**
 * One-off import: src/constants/clients.json → WordPress "Clients".
 *
 *   node scripts/import-clients.mjs           (dry run)
 *   node scripts/import-clients.mjs --apply
 *
 * Needs the Clients post type and Client Fields from wordpress/acf-clients.json.
 * With --apply, each new client's logo is uploaded from public/images/clients
 * to the Media Library. Order is kept via Page Attributes → Order (menu_order).
 * Re-running skips existing slugs (and uploads nothing for them).
 */

import { readFile } from "node:fs/promises";
import { importPosts, slugify, uploadMedia } from "./lib/wp-import.mjs";

const clients = JSON.parse(
	await readFile(new URL("../src/constants/clients.json", import.meta.url), "utf8")
);

await importPosts({
	restBase: "client",
	items: clients,
	acfCheckField: "logo",
	toPayload: (client, i) => ({
		title: client.name,
		slug: slugify(client.name),
		menu_order: i,
	}),
	beforeCreate: async (payload, client) => {
		payload.acf = { logo: await uploadMedia(client.img, { alt: client.name }) };
	},
});
