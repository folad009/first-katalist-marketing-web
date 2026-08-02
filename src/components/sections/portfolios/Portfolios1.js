import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import PortfolioCard1 from "@/components/shared/cards/PortfolioCard1";
import getPortfolio from "@/libs/getPortfolio";

const Portfolios1 = async () => {
	const portfolio = (await getPortfolio())?.slice(0, 4);
	return (
		<section className="tj-project-section section-gap">
			<div className="tj-container">
				<div>
					<div>
						<div className="sec-heading-wrap">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Our Work
							</span>
							<div className="heading-wrap-content">
								<div className="sec-heading">
									<h2 className="sec-title title-anim">
										Campaigns, Activations & Brand <span>Moments.</span>
									</h2>
								</div>
								<p className="desc wow fadeInUp" data-wow-delay=".5s">
									From trade and consumer activations to experiential events —
									a look at the work we deliver for leading brands.
								</p>
								<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
									<ButtonPrimary text={"View Gallery"} url="/portfolios" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div>
						<div className="project-area tj-arrange-container">
							{portfolio?.length
								? portfolio?.map((portfolioSingle, idx) => (
										<PortfolioCard1
											key={idx}
											portfolio={portfolioSingle}
										/>
								  ))
								: ""}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolios1;
