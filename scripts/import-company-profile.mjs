/**
 * One-off import: public/fakedata/company-profile.json → WordPress page
 * "Company Profile" (slug company-profile) fields.
 *
 *   node scripts/import-company-profile.mjs           (dry run)
 *   node scripts/import-company-profile.mjs --apply
 *
 * Needs the Company Profile field group from wordpress/acf-fkm-content.json.
 * Lists are written one per line in the formats the site parses
 * (see mapCompanyProfile in src/lib/wordpress-mappers.js). Internal notes
 * (source, *Note, groupStructurePdf, boardNote) are not imported.
 * Fields already filled in WordPress are never overwritten.
 */

import { fillPageFields, readFakedata } from "./lib/wp-import.mjs";

const p = await readFakedata("company-profile.json");
const lines = list => (list ?? []).join("\n");

await fillPageFields({
	slug: "company-profile",
	acf: {
		strategy_quote_label: p.strategyQuote?.label ?? "",
		strategy_quote_text: p.strategyQuote?.text ?? "",
		strategy_quote_attribution: p.strategyQuote?.attribution ?? "",
		fact_commenced: p.facts?.commenced ?? "",
		fact_team: p.facts?.team ?? "",
		fact_expertise: p.facts?.expertise ?? "",
		vision: p.vision ?? "",
		mission: p.mission ?? "",
		core_values: lines(p.coreValues),
		our_edge: lines(p.ourEdge),
		awards: lines(p.awards?.map(a => (a.year ? `${a.year} | ${a.title}` : a.title))),
		coverage_section_title: p.regionalCoverage?.sectionTitle ?? "",
		capabilities_title: p.regionalCoverage?.capabilitiesTitle ?? "",
		coverage_intro: lines(p.regionalCoverage?.intro),
		field_operatives_note: p.regionalCoverage?.fieldOperativesNote ?? "",
		coverage_regions: lines(p.regionalCoverage?.regions?.map(r => `${r.name}: ${r.cities.join(", ")}`)),
		field_structure_title: p.fieldStructure?.sectionTitle ?? "",
		field_structure_summary: p.fieldStructure?.summary ?? "",
		field_top_role: p.fieldStructure?.topRole ?? "",
		field_support_role: p.fieldStructure?.supportRole ?? "",
		field_regions: lines(p.fieldStructure?.regions?.map(r => `${r.name}: ${r.levels.join(", ")}`)),
	},
});
