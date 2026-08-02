import WordPressContent from "@/components/shared/content/WordPressContent";
import getTeamMembers from "@/libs/getTeamMembers";
import Image from "next/image";

const TeamDetails1 = async ({ currentSlug }) => {
	const items = await getTeamMembers();
	const currentItem = items?.find(({ slug }) => slug === currentSlug);
	const {
		name,
		desig,
		contentHtml,
		imgLarge = "/images/team/team-1-big.webp",
	} = currentItem || {};

	return (
		<section className="team-details slidebar-stickiy-container">
			<div className="tj-container">
				<div className="grid grid-cols-1 items-start justify-center gap-6 lg:grid-cols-12">
					{/* <!--  left --> */}
					<div className="md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-auto">
						<div
							className="team-details__img slidebar-stickiy wow fadeInUp"
							data-wow-delay=".1s"
						>
							<Image
								src={imgLarge}
								alt=""
								width={645}
								height={700}
								style={{ height: "auto" }}
							/>
						</div>
					</div>
					{/* <!-- right --> */}
					<div className="lg:col-span-7">
						<div className="team-details__content">
							<h2 className="team-details__name title-anim">
								Hello, I am {name}
							</h2>
							<span
								className="team-details__desig wow fadeInUp"
								data-wow-delay=".1s"
							>
								{desig}
							</span>
							{contentHtml ? (
								<WordPressContent
									html={contentHtml}
									className="wow fadeInUp"
									data-wow-delay=".3s"
								/>
							) : (
								<p className="wow fadeInUp" data-wow-delay=".3s">
									{/* TODO: Bio missing — profiles live on our-team.html modals */}
									Part of the First Katalyst team delivering cost-effective,
									value-adding and result-oriented marketing solutions through the
									power of ideas.
								</p>
							)}
							<div
								className="team-details__contact-info wow fadeInUp"
								data-wow-delay=".5s"
							>
								<ul>
									<li>
										<span>Email address</span>
										<a href="mailto:outsourcing@firstkatalystmarketing.com">
											outsourcing@firstkatalystmarketing.com
										</a>
									</li>
									<li>
										<span>Phone number</span>
										<a href="tel:+2348092900214">+234 809 290 0214</a>
									</li>
								</ul>
							</div>
							<div className="social-links wow fadeInUp" data-wow-delay=".5s">
								<ul>
									<li>
										<a
											href="https://www.facebook.com/firstkatalystmarketing"
											target="_blank"
										>
											<i className="fa-brands fa-facebook-f"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/firstkatalystmarketing/"
											target="_blank"
										>
											<i className="fa-brands fa-instagram"></i>
										</a>
									</li>
									<li>
										<a href="https://twitter.com/FirstKatalyst" target="_blank">
											<i className="fa-brands fa-x-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/company/first-katalyst-marketing-limited/"
											target="_blank"
										>
											<i className="fa-brands fa-linkedin-in"></i>
										</a>
									</li>
								</ul>
							</div>
							<div className="team-details__experience">
								<h4
									className="team-details__subtitle wow fadeInUp"
									data-wow-delay=".3s"
								>
									Work experience
								</h4>
								{/* TODO: Live site has no structured work-experience timeline — bio is in contentHtml above */}
								<p className="wow fadeInUp" data-wow-delay=".3s">
									We care for our clients’ business as our business. We think and
									act like business partners — sharing aspirations, understanding
									reality, and aligning incentives with client objectives.
								</p>
								<div
									className="team-details__experience__list wow fadeInUp"
									data-wow-delay=".3s"
								>
									<ul>
										<li>
											<i className="tji-check"></i>
											<p>Youthfulness</p>
										</li>
										<li>
											<i className="tji-check"></i>
											<p>Commitment to excellence</p>
										</li>
										<li>
											<i className="tji-check"></i>
											<p>Passion</p>
										</li>
										<li>
											<i className="tji-check"></i>
											<p>Through-the-line thinking</p>
										</li>
									</ul>
								</div>
							</div>
							<div className="team-details__skills">
								<h4
									className="team-details__subtitle wow fadeInUp"
									data-wow-delay=".3s"
								>
									Professional skills
								</h4>
								{/* TODO: Skill percentages not published on live site — keep layout stubs only */}
								<p className="wow fadeInUp" data-wow-delay=".3s">
									Experience and global standards shape how we deliver marketing
									communications, activations, trade, and production for brands
									across West Africa.
								</p>
								<ul
									className="tj-progress-list wow fadeInUp"
									data-wow-delay=".3s"
								>
									<li>
										<h6 className="tj-progress-title">
											TODO: Skill metric unpublished
										</h6>
										<div className="tj-progress">
											<span className="tj-progress-percent">0%</span>
											<div className="tj-progress-bar" data-percent="0"></div>
										</div>
									</li>
									<li>
										<h6 className="tj-progress-title">
											TODO: Skill metric unpublished
										</h6>
										<div className="tj-progress">
											<span className="tj-progress-percent">0%</span>
											<div className="tj-progress-bar" data-percent="0"></div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TeamDetails1;
