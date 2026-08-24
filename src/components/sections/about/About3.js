import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import companyProfile from "../../../../public/fakedata/company-profile.json";

const About3 = ({ type }) => {
	const { coreValues, strategyQuote, vision, mission } = companyProfile;

	return (
		<section className="tj-about-section-2 section-gap section-gap-x">
			<div className="tj-container">
				<div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
					<div className="order-2 lg:order-1">
						<div
							className="about-img-area style-2 wow fadeInLeft"
							data-wow-delay=".3s"
						>
							<div className="about-img overflow-hidden">
								{/* TODO: Replace with FKM about image from profile/assets — do not hotlink */}
								<Image
									data-speed=".8"
									src="/images/about/about-5.webp"
									alt="First Katalyst Marketing"
									width={591}
									height={639}
								/>
							</div>
							<div className={`box-area ${type === 2 ? "style-2" : ""}`}>
								<div className="progress-box wow fadeInUp" data-wow-delay=".3s">
									<h4 className="title">FKM Group</h4>
									<ul className="list-items">
										<li>
											<i className="tji-list"></i>
											<Link href="/fk-group/fk-ghana">FK Ghana</Link>
										</li>
										<li>
											<i className="tji-list"></i>
											<Link href="/fk-group/image-target">Image Target</Link>
										</li>
										<li>
											<i className="tji-list"></i>
											<Link href="/fk-group/ssb-africa">SSB Africa</Link>
										</li>
										<li>
											<i className="tji-list"></i>
											<Link href="/fk-group/fk-properties">FK Properties</Link>
										</li>
										<li>
											<i className="tji-list"></i>
											<Link href="/fk-group/fk-digital">FK Digital</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="order-1 lg:order-2">
						<div className="about-content-area">
							<div className={`sec-heading ${type === 2 ? "" : "style-3"}`}>
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Who We Are
								</span>
								<h2 className="sec-title title-anim">
									{type === 2 ? (
										<>
											A Go-To Agency for Top-Notch Marketing Solutions Since{" "}
											<span>2012.</span>
										</>
									) : (
										"A Go-To Agency for Top-Notch Marketing Solutions Since 2012."
									)}
								</h2>
								{/* Optional disruption quote — fits existing About strategy block */}
								<p className="desc wow fadeInUp" data-wow-delay=".4s">
									{strategyQuote.label}: “{strategyQuote.text}” —{" "}
									{strategyQuote.attribution}
								</p>
							</div>
						</div>
						<div className="about-bottom-area">
							<div
								className="mission-vision-box wow fadeInLeft"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Core Values</h4>
								{/* TODO: PDF lists Core Value titles only — individual value body copy not provided */}
								<ul className="list-items">
									{coreValues.map(value => (
										<li key={value}>
											<i className="tji-list"></i>
											{value}
											{/* TODO: Add body copy for “{value}” when FKM provides it */}
										</li>
									))}
								</ul>
							</div>
							<div
								className="mission-vision-box wow fadeInRight"
								data-wow-delay=".5s"
							>
								<h4 className="title">Vision & Mission</h4>
								<p className="desc">
									Vision: ‘…{vision}…’
								</p>
								<p className="desc">
									Mission: ‘…{mission}…’
								</p>
							</div>
						</div>
						<div className="about-btn-area wow fadeInUp" data-wow-delay=".5s">
							<ButtonPrimary text={"Explore FKM Group"} url={"/fk-group"} />
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</section>
	);
};

export default About3;
