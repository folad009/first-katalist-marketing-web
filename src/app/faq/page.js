import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import Faq2 from "@/components/sections/faq/Faq2";
import Faq3 from "@/components/sections/faq/Faq3";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";
import getSiteImages from "@/libs/getSiteImages";

export const metadata = pageMetadata({
	title: "FAQ",
	description:
		"Common questions about First Katalyst Marketing services — Experiential, Activations, Merchandising Management, Field Force Management, Procurement and Production, Creative Development.",
});

export default async function Faq() {
	const { faqImage } = await getSiteImages();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"Faq"} text={"Faq"} />
						<Faq2 type={4} faqImage={faqImage} />
						<Faq3 />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
