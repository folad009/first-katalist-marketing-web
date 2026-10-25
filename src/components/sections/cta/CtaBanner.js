import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import { SITE_IMAGE_FALLBACKS } from "@/lib/site-images";

const CtaBanner = ({ image = SITE_IMAGE_FALLBACKS.ctaImage }) => {
	return (
		<section className="tj-cta-section">
			<div className="tj-container">
				<div>
					<div>
						<div className="cta-area">
							<div className="cta-content">
								<h2 className="title title-anim">
									Ready to Activate Your Brand?
								</h2>
								<div className="cta-btn wow fadeInUp" data-wow-delay=".6s">
									<ButtonPrimary
										text={"Send Us a Brief"}
										url={"/contact"}
										className={"btn-dark"}
									/>
								</div>
							</div>
							<div className="cta-img">
								<img src={image} alt="FMK Call to Action Banner" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CtaBanner;
