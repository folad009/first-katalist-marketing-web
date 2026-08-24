import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import companyProfile from "../../../../public/fakedata/company-profile.json";

const edgeIcons = [
	"tji-innovative",
	"tji-award",
	"tji-support",
	"tji-innovative",
	"tji-award",
	"tji-support",
	"tji-innovative",
	"tji-award",
];

/** Our Edge from profile PDF — titles only; body copy TODO. */
const Features = ({ type }) => {
	const features = companyProfile.ourEdge.map((title, idx) => ({
		title,
		// TODO: PDF Our Edge titles only — add body copy when confirmed.
		desc: "",
		icon: edgeIcons[idx % edgeIcons.length],
	}));

	return (
		<section id="choose" className="tj-choose-section section-gap">
			<div className="tj-container">
				<div>
					<div>
						{type == 2 ? (
							<div className="sec-heading-wrap">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Our Edge
								</span>
								<div className="heading-wrap-content">
									<div className="sec-heading">
										<h2 className="sec-title title-anim">
											Why Brands Choose <span>First Katalyst Marketing.</span>
										</h2>
									</div>
									<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
										<ButtonPrimary text="Send Us a Brief" url="/contact" />
									</div>
								</div>
							</div>
						) : (
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Our Edge
								</span>
								<h2 className="sec-title title-anim">
									Why Brands Choose <span>First Katalyst Marketing.</span>
								</h2>
							</div>
						)}
					</div>
				</div>
				<div className="rightSwipeWrap grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, idx) => (
						<div key={feature.title}>
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Features;
