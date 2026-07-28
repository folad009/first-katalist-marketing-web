import CareerDetailsPrimary from "@/components/sections/careers/CareerDetailsPrimary";
import HeroInner from "@/components/sections/hero/HeroInner";
import getCareers from "@/libs/getCareers";
import getPreviousNextItem from "@/libs/getPreviousNextItem";

const CareerDetailsMain = async ({ currentSlug }) => {
	const items = await getCareers();
	const option = getPreviousNextItem(items, currentSlug);
	const { title } = option?.currentItem || {};

	return (
		<div>
			<HeroInner
				title={title ?? "Career Details"}
				text={title ?? "Career Details"}
				breadcrums={[{ name: "Careers", path: "/careers" }]}
			/>
			<CareerDetailsPrimary option={option} />
		</div>
	);
};

export default CareerDetailsMain;
