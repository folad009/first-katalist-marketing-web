import companyProfile from "../../../../public/fakedata/company-profile.json";

const Awards1 = () => {
	const { awards } = companyProfile;

	return (
		<section className="tj-choose-section section-gap">
			<div className="tj-container">
				<div className="sec-heading text-center">
					<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
						<i className="tji-box"></i>Most Recent Awards
					</span>
					<h2 className="sec-title title-anim">
						Recognition that reflects <span>our work.</span>
					</h2>
				</div>
				<ul className="list-none grid grid-cols-1 gap-4 md:grid-cols-4">
					{awards.map((award, idx) => (
						<li
							key={award.title}
							className="wow fadeInUp choose-box"
							data-wow-delay={`.${2 + idx}s`}
						>
							<div className="choose-content">
								<span className="choose-icon">
									<i className="tji-award"></i>
								</span>
								<h4 className="title">
									{idx + 1}. {award.title}
									{award.year ? `; ${award.year}` : ""}
								</h4>
								{/* {award.imageTodo} */}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Awards1;
