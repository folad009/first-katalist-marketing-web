import HeroInner from "@/components/sections/hero/HeroInner";
import ServicesDetailsPrimary from "@/components/sections/services/ServicesDetailsPrimary";
import getALlServices from "@/libs/getALlServices";
import getFaqs from "@/libs/getFaqs";
import getPreviousNextItem from "@/libs/getPreviousNextItem";

const ServiceDetailsMain = async ({ currentSlug }) => {
	const [items, faqs] = await Promise.all([getALlServices(), getFaqs()]);
	const option = getPreviousNextItem(items, currentSlug);
	const { title } = option?.currentItem || {};
	return (
		<div>
			<HeroInner banner="services"
				title={title ? title : "Service Details"}
				text={title ? title : "Service Details"}
				breadcrums={[{ name: "Services", path: "/services" }]}
			/>
			<ServicesDetailsPrimary option={{ ...option, items, faqs }} />
		</div>
	);
};

export default ServiceDetailsMain;
