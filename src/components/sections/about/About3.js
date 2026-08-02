import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
const About3 = ({ type }) => {
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
								<Image
									data-speed=".8"
									src="/images/about/about-5.webp"
									alt="First Katalyst Marketing"
									width={591}
									height={639}
								/>
							</div>
							<div className={`box-area ${type === 2 ? "style-2" : ""}`}>
								{/* FKM Group org chart — full group at /fk-group */}
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
							</div>
						</div>
						<div className="about-bottom-area">
							<div
								className="mission-vision-box wow fadeInLeft"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Approach</h4>
								<p className="desc">
									We provide cost-effective, value-adding and result-oriented
									marketing solutions through the power of ideas — building
									long-term relationships between clients and their consumers,
									and sustainable profitability for both agency and clients.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Youthfulness
									</li>
									<li>
										<i className="tji-list"></i>Commitment to Excellence
									</li>
									<li>
										<i className="tji-list"></i>Passion
									</li>
								</ul>
							</div>
							<div
								className="mission-vision-box wow fadeInRight"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Ambition</h4>
								<p className="desc">
									Poised to become a first-class ideas powerhouse in West Africa
									and one of the top ten agencies within the sub-region —
									driving growth across Nigeria, West Africa, the UAE and the
									United Kingdom.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Experience
									</li>
									<li>
										<i className="tji-list"></i>Global Standards
									</li>
									<li>
										<i className="tji-list"></i>Through-the-Line Thinking
									</li>
								</ul>
							</div>
						</div>
						<div className="about-btn-area wow fadeInUp" data-wow-delay=".5s">
							{/* TODO: our-core-values.html lists value titles only — individual value body copy is missing/lorem on live site */}
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
