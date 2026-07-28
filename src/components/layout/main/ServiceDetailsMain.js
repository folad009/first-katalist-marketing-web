import HeroInner from "@/components/sections/hero/HeroInner";
import ServicesDetailsPrimary from "@/components/sections/services/ServicesDetailsPrimary";
import getALlServices from "@/libs/getALlServices";
import getPreviousNextItem from "@/libs/getPreviousNextItem";

const ServiceDetailsMain = async ({ currentSlug }) => {
	const items = await getALlServices();
	const option = getPreviousNextItem(items, currentSlug);
	const { title } = option?.currentItem || {};
	return (
		<div>
			<HeroInner
				title={title ? title : "Service Details"}
				text={title ? title : "Service Details"}
				breadcrums={[{ name: "Services", path: "/services" }]}
			/>
			<ServicesDetailsPrimary option={{ ...option, items }} />
		</div>
	);
};

export default ServiceDetailsMain;
