/**
 * One-off import: public/fakedata/faqs.json → WordPress "FAQs".
 *
 *   node scripts/import-faqs.mjs           (dry run)
 *   node scripts/import-faqs.mjs --apply
 *
 * Needs the FAQs post type from wordpress/acf-fkm-content.json.
 * Order is kept via Page Attributes → Order (menu_order). Re-running skips existing slugs.
 */

import { importPosts, readFakedata, slugify } from "./lib/wp-import.mjs";

const faqs = await readFakedata("faqs.json");

await importPosts({
	restBase: "faq",
	items: faqs,
	acfCheckField: "answer",
	toPayload: (faq, i) => ({
		title: faq.title,
		slug: slugify(faq.title),
		menu_order: i,
		acf: { answer: faq.desc ?? "" },
	}),
});
