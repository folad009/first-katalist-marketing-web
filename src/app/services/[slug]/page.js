import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ServiceDetailsMain from "@/components/layout/main/ServiceDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getALlServices from "@/libs/getALlServices";
import getServiceBySlug from "@/libs/getServiceBySlug";
import { DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { buildMetadataFromItem } from "@/lib/wordpress-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const service = await getServiceBySlug(slug);
	if (!service) return { title: "Service Not Found" };
	return buildMetadataFromItem(service, {
		title: service.title,
		description: service.shortDesc || service.desc || DEFAULT_DESCRIPTION,
	});
}

export async function generateStaticParams() {
	const items = await getALlServices();
	return items.map(({ slug }) => ({ slug }));
}

export default async function ServiceDetails({ params }) {
	const { slug } = await params;
	const service = await getServiceBySlug(slug);
	if (!service) {
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
						<ServiceDetailsMain currentSlug={slug} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
