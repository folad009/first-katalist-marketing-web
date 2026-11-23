import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapCompanyProfile } from "@/lib/wordpress-mappers";
import { GET_COMPANY_PROFILE } from "@/lib/wordpress-queries";
import { cache } from "react";
import companyProfile from "../../public/fakedata/company-profile.json";

/**
 * About-page content from WordPress → Pages → Company Profile.
 * Any field left empty in WordPress keeps the value from the local JSON.
 */
const getCompanyProfile = cache(async () =>
	withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_COMPANY_PROFILE, {
			tags: [REVALIDATE_TAGS.companyProfile],
		});
		return mapCompanyProfile(data, companyProfile);
	}, companyProfile)
);

export default getCompanyProfile;
