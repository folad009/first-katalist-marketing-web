import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import TeamDetails1 from "@/components/sections/teams/TeamDetails1";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getTeamMemberBySlug from "@/libs/getTeamMemberBySlug";
import getTeamMembers from "@/libs/getTeamMembers";
import { buildMetadataFromItem } from "@/lib/wordpress-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const member = await getTeamMemberBySlug(slug);
	if (!member) return { title: "Team Member Not Found" };
	return buildMetadataFromItem(member, {
		title: member.name,
		description: `${member.name}, ${member.desig} at First Katalyst Marketing Limited.`,
	});
}

export async function generateStaticParams() {
	const items = await getTeamMembers();
	return items.map(({ slug }) => ({ slug }));
}

export default async function TeamDetails({ params }) {
	const { slug } = await params;
	const member = await getTeamMemberBySlug(slug);
	if (!member) {
		notFound();
	}
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title={"Team details"}
							text={member.name ?? "Team details"}
						/>
						<TeamDetails1 currentSlug={slug} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
