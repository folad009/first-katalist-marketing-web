import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import PortfolioDetailsMain from "@/components/layout/main/PortfolioDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getPortfolio from "@/libs/getPortfolio";
import getPortfolioBySlug from "@/libs/getPortfolioBySlug";
import { buildMetadataFromItem } from "@/lib/wordpress-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const item = await getPortfolioBySlug(slug);
	if (!item) return { title: "Portfolio Not Found" };
	return buildMetadataFromItem(item);
}

export async function generateStaticParams() {
	const items = await getPortfolio();
	return items.map(({ slug }) => ({ slug }));
}

export default async function PortfolioDetails({ params }) {
	const { slug } = await params;
	const item = await getPortfolioBySlug(slug);
	if (!item) {
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
						<PortfolioDetailsMain currentSlug={slug} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
