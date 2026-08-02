import Link from "next/link";

const ContactTop = () => {
	return (
		<div className="tj-contact-area section-gap">
			<div className="tj-container">
				<div className="sec-heading text-center">
					<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
						<i className="tji-box"></i>Contact info
					</span>
					<h2 className="sec-title title-anim">
						<span>Reach</span> Out to Us
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-4">
					<div>
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".3s"
						>
							<div className="contact-icon">
								<i className="tji-location-3"></i>
							</div>
							<h3 className="contact-title">Our Location</h3>
							<p>
								19b Alhaji Bankole Street, Off Adeniyi Jones, Ikeja, Lagos
							</p>
						</div>
					</div>
					<div>
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".5s"
						>
							<div className="contact-icon">
								<i className="tji-envelop"></i>
							</div>
							<h3 className="contact-title">Email us</h3>
							<ul className="contact-list">
								<li>
									<Link href="mailto:outsourcing@firstkatalystmarketing.com">
										outsourcing@firstkatalystmarketing.com
									</Link>
								</li>
								<li>
									<Link href="mailto:soj@firstkatalystmarketing.com">
										soj@firstkatalystmarketing.com
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div>
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".7s"
						>
							<div className="contact-icon">
								<i className="tji-phone"></i>
							</div>
							<h3 className="contact-title">Call us</h3>
							<ul className="contact-list">
								<li>
									<Link href="tel:+2348092900214">+234 809 290 0214</Link>
								</li>
							</ul>
						</div>
					</div>
					<div>
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".9s"
						>
							<div className="contact-icon">
								<i className="tji-chat"></i>
							</div>
							<h3 className="contact-title">Send a brief</h3>
							<ul className="contact-list">
								<li>
									<Link href="mailto:outsourcing@firstkatalystmarketing.com">
										outsourcing@firstkatalystmarketing.com
									</Link>
								</li>
								<li className="active">
									<Link href="/contact">Need help?</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactTop;
