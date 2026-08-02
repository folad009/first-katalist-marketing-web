import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import FkGroupOverview from "@/components/sections/fk-group/FkGroupOverview";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";
import getFkGroup from "@/libs/getFkGroup";

export const metadata = pageMetadata({
	title: "FKM Group",
	description:
		"FKM Group — First Katalyst Marketing, Image Target, SSB Africa, FK Properties, and FK Digital. Structure from the FKM Group org chart.",
});

export default async function FkGroupPage() {
	const entities = await getFkGroup();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title="FKM Group" text="FKM Group" />
						<FkGroupOverview entities={entities} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
