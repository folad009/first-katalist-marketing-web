import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CareerDetailsMain from "@/components/layout/main/CareerDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getCareerBySlug from "@/libs/getCareerBySlug";
import getCareers from "@/libs/getCareers";
import { DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { buildMetadataFromItem } from "@/lib/wordpress-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const career = await getCareerBySlug(slug);
	if (!career) return { title: "Career Not Found" };
	return buildMetadataFromItem(career, {
		title: "Careers at First Katalyst Marketing",
		description: `Careers at First Katalyst Marketing Limited. ${DEFAULT_DESCRIPTION}`,
	});
}

export async function generateStaticParams() {
	const items = await getCareers();
	return items.map(({ slug }) => ({ slug }));
}

export default async function CareerDetails({ params }) {
	const { slug } = await params;
	const career = await getCareerBySlug(slug);
	if (!career) {
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
						<CareerDetailsMain currentSlug={slug} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
