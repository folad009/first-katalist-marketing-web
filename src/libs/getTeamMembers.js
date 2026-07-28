import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { withSlugs } from "@/lib/slugify";
import { mapTeamMembers } from "@/lib/wordpress-mappers";
import { GET_TEAM_MEMBERS } from "@/lib/wordpress-queries";
import { cache } from "react";
import teamMembers from "../../public/fakedata/team-members";

const getTeamMembers = cache(async () => {
	const items = await withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_TEAM_MEMBERS, {
			tags: [REVALIDATE_TAGS.team],
		});
		return mapTeamMembers(data?.teamMembers?.nodes ?? []);
	}, teamMembers);

	return withSlugs(items, "name");
});

export default getTeamMembers;
