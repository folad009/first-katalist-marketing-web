/**
 * One-off import: public/fakedata/team-members.json → WordPress "Team Members".
 *
 *   node scripts/import-team-members.mjs           (dry run)
 *   node scripts/import-team-members.mjs --apply
 *
 * Credentials: see scripts/lib/wp-import.mjs. Re-running skips existing slugs.
 * Photos are not imported: the fakedata images are template placeholders.
 *
 * The site sorts team members by menu order, then newest publish date first,
 * so the first JSON entry gets the newest date.
 */

import { importPosts, readFakedata, slugify } from "./lib/wp-import.mjs";

const members = await readFakedata("team-members.json");
const now = Date.now();

await importPosts({
	restBase: "team_member",
	items: members,
	acfCheckField: "desig",
	toPayload: (member, i) => ({
		title: member.name,
		slug: slugify(member.name),
		date_gmt: new Date(now - (i + 1) * 60_000).toISOString().slice(0, 19),
		content: member.contentHtml ?? "",
		acf: { name: member.name, desig: member.desig ?? "" },
	}),
});
