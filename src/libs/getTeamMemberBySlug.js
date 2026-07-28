import getTeamMembers from "@/libs/getTeamMembers";
import { isDraftModeEnabled } from "@/lib/wordpress-preview";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapTeamMembers } from "@/lib/wordpress-mappers";
import { GET_TEAM_MEMBER_BY_SLUG } from "@/lib/wordpress-queries";
import { cache } from "react";

const getTeamMemberBySlug = cache(async slug => {
	if (!slug) return null;

	const isPreview = await isDraftModeEnabled();

	if (!isPreview) {
		const members = await getTeamMembers();
		const fromList = members.find(member => member.slug === slug);
		if (fromList) return fromList;
	}

	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_TEAM_MEMBER_BY_SLUG, {
			variables: { slug, preview: isPreview },
			tags: [REVALIDATE_TAGS.team],
			preview: isPreview,
		});
		if (!data?.teamMember) return null;
		return mapTeamMembers([data.teamMember])[0] ?? null;
	}, null);
});

export default getTeamMemberBySlug;
