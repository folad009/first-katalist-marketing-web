import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import companyProfile from "../../../../public/fakedata/company-profile.json";

const VisionMission = ({ type }) => {
	const { facts, vision, mission } = companyProfile;

	// Verbatim from profile PDF Vision / Mission / Facts slides (July 2023 deck).
	// “11 years Experience” kept as PDF wording — refresh only when confirmed.
	const visionMission = [
		{
			title: "Facts",
			desc: `${facts.commenced}. ${facts.team}. ${facts.expertise}`,
			icon: "tji-innovative",
		},
		{
			title: "Vision",
			desc: `‘…${vision}…’`,
			icon: "tji-award",
		},
		{
			title: "Mission",
			desc: `‘…${mission}…’`,
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
									<i className="tji-box"></i>Facts, Vision & Mission
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
									<i className="tji-box"></i>Facts, Vision & Mission
								</span>
								<h2 className="sec-title title-anim">
									Why Brands Choose <span>First Katalyst Marketing.</span>
								</h2>
							</div>
						)}
					</div>
				</div>
				<div className="rightSwipeWrap grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3">
					{visionMission.map((feature, idx) => (
						<div key={feature.title}>
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default VisionMission;
