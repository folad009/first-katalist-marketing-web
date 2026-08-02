import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";

const Features = ({ type }) => {
	const features = [
		{
			title: "Marketing Mix Mastery",
			desc: "A robust and in-depth knowledge of marketing from experience across the whole gamut of the marketing mix.",
			icon: "tji-innovative",
		},
		{
			title: "West African Insight",
			desc: "Deep knowledge of the West African sub-regional market — familiar with consumer needs and preferences across the landscape.",
			icon: "tji-award",
		},
		{
			title: "Brand Building Strength",
			desc: "Strong at brand building, driven by our work and wide exposure to best practices across industries and blue-chip clients.",
			icon: "tji-support",
		},
	];

	return (
		<section id="choose" className="tj-choose-section section-gap">
			<div className="tj-container">
				<div>
					<div>
						{type == 2 ? (
							<div className="sec-heading-wrap">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Stand Out Points
								</span>
								<div className="heading-wrap-content">
									<div className="sec-heading">
										<h2 className="sec-title title-anim">
											Why Brands Choose <span>FKM.</span>
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
									<i className="tji-box"></i>Stand Out Points
								</span>
								<h2 className="sec-title title-anim">
									Why Brands Choose <span>FKM.</span>
								</h2>
							</div>
						)}
					</div>
				</div>
				<div className="rightSwipeWrap grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3">
					{features.map((feature, idx) => (
						<div key={idx}>
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Features;
