import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import Team1 from "@/components/sections/teams/Team1";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";
import getTeamMembers from "@/libs/getTeamMembers";

export const metadata = pageMetadata({
	title: "Our Team",
	description:
		"Meet the people behind First Katalyst Marketing Limited — leaders in marketing communications, activations, trade, HR, finance and production.",
});

export default async function Team() {
	const teamMembers = await getTeamMembers();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"Team"} text={"Team"} />
						<Team1 type={2} teamMembers={teamMembers} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
