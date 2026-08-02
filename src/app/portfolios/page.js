import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import PortfoliosPrimary from "@/components/sections/portfolios/PortfoliosPrimary";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";
import getPortfolio from "@/libs/getPortfolio";

export const metadata = pageMetadata({
	title: "Our Work & Clientele",
	description:
		"Brands that trust First Katalyst Marketing — clientele and campaign work across activation, trade marketing, events and brand building in Nigeria and West Africa.",
});

export default async function Portfolios() {
	const portfolio = await getPortfolio();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"Portfolio"} text={"Portfolio"} />
						<PortfoliosPrimary portfolio={portfolio} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
