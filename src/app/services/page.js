import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Brands1 from "@/components/sections/brands/Brands1";
import Contact2 from "@/components/sections/contacts/Contact2";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import PricingPlan from "@/components/sections/pricing-plan/PricingPlan";
import ServicesPrimary from "@/components/sections/services/ServicesPrimary";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";
import getALlServices from "@/libs/getALlServices";

export const metadata = pageMetadata({
	title: "Services",
	description:
		"Marketing Communications 360 from First Katalyst Marketing: consumer activation, trade marketing, sales and distribution, HR outsourcing, advertising, digital marketing, production services and events.",
});

export default async function Services() {
	const services = await getALlServices();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"Services"} text={"Services"} />
						<ServicesPrimary services={services} />
						<Contact2 />
						<PricingPlan type={3} />
						<Brands1 type={2} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
