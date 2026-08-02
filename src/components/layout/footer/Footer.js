import Link from "next/link";

const navLink =
	"inline-flex items-center gap-1 text-brand-dark-3 transition-all duration-300 hover:translate-x-[5px] hover:text-brand";

// Live socials from firstkatalystmarketing.com
const socialItems = [
	{ href: "https://www.facebook.com/firstkatalystmarketing", icon: "fa-brands fa-facebook-f" },
	{ href: "https://www.instagram.com/firstkatalystmarketing/", icon: "fa-brands fa-instagram" },
	{ href: "https://twitter.com/FirstKatalyst", icon: "fa-brands fa-x-twitter" },
	{ href: "https://www.linkedin.com/company/first-katalyst-marketing-limited/", icon: "fa-brands fa-linkedin-in" },
];

// Slugs aligned with public/fakedata/services.json
const serviceLinks = [
	["/services/consumer-activation", "Consumer Activation"],
	["/services/trade-marketing-activation", "Trade Marketing Activation"],
	["/services/sales-and-distribution", "Sales and Distribution"],
	["/services/hr-outsourcing", "HR Outsourcing"],
	["/services/advertising", "Advertising"],
	["/services/digital-marketing", "Digital Marketing"],
	["/services/production-services", "Production Services"],
	["/services/events", "Events"],
];

const Footer = () => {
	return (
		<footer className="relative z-1 mx-3.75 overflow-hidden rounded-[12px] bg-brand-bg pt-48.75 xl:max-2xl:pt-37.5 lg:max-xl:pt-33.75 md:max-lg:pt-80 max-md:mx-3 max-md:rounded-b-none max-md:pt-67.5">
			<div className="relative pb-22.5 pt-section-lg max-md:py-section-sm">
				<div className="tj-container">
					<div className="-mx-3 flex flex-wrap justify-between">
						{/* Widget: brand */}
						<div className="w-full px-3 md:w-1/2 lg:w-1/3 xl:w-1/4">
							<div
								className="wow fadeInUp max-md:mb-2.5"
								data-wow-delay=".1s"
							>
								<div className="max-w-37.5">
									<Link href="/">
										<img src="/images/logos/fk-logo.png" alt="First Katalyst Marketing" />
									</Link>
								</div>
								<div className="w-full max-w-70 max-md:max-w-full">
									{/* Homepage slider positioning: “a first class ideas powerhouse” */}
									<p className="mb-8.5 mt-7 text-black max-lg:mb-5">
										First Katalyst Marketing — a first class ideas powerhouse.
										Marketing Communications 360: cost-effective, value-adding
										and result-oriented solutions that build lasting relationships
										between brands and their consumers.
									</p>
								</div>
								<div className="flex flex-wrap gap-4.5">
									<div className="max-w-24">
										<img src="/images/footer/award-logo-1.webp" alt="" />
									</div>
									<div className="max-w-24">
										<img src="/images/footer/award-logo-2.webp" alt="" />
									</div>
								</div>
							</div>
						</div>

						{/* Widget: services */}
						<div className="w-full px-3 md:w-1/2 lg:w-1/3 xl:w-1/4">
							<div
								className="wow fadeInUp ps-10 xl:max-2xl:ps-5 lg:max-xl:ps-20 max-lg:ps-0 max-md:mt-7.5"
								data-wow-delay=".3s"
							>
								<h5 className="mb-8.25 font-semibold max-lg:mb-4.5">
									Services
								</h5>
								<ul className="list-none">
									{serviceLinks.map(([href, label]) => (
										<li key={href} className="py-1.5 first:pt-0">
											<Link href={href} className={navLink}>
												{label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Widget: resources */}
						<div className="w-full px-3 md:w-1/2 lg:w-1/3 xl:w-[16.666667%]">
							<div
								className="wow fadeInUp ps-10 xl:max-2xl:ps-5 lg:max-xl:ps-20 max-lg:ps-0 max-md:mt-7.5"
								data-wow-delay=".5s"
							>
								<h5 className="mb-8.25 font-semibold max-lg:mb-4.5">
									Resources
								</h5>
								<ul className="list-none">
									<li className="py-1.5 first:pt-0">
										<Link href="/contact" className={navLink}>
											Contact us
										</Link>
									</li>
									<li className="py-1.5">
										<Link href="/team" className={navLink}>
											Our Team
										</Link>
									</li>
									<li className="py-1.5">
										<Link href="/portfolios" className={navLink}>
											Portfolio
										</Link>
									</li>
									<li className="py-1.5">
										<Link href="/blogs" className={navLink}>
											Insights
										</Link>
									</li>
									<li className="py-1.5">
										<Link href="/about" className={navLink}>
											About FKM
										</Link>
									</li>
									<li className="py-1.5">
										<Link href="/fk-group" className={navLink}>
											FKM Group
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* Widget: newsletter */}
						<div className="w-full px-3 md:w-1/2 lg:w-5/12 xl:w-1/3">
							<div
								className="wow fadeInUp w-full max-w-87.5 xl:ms-auto max-xl:mt-7.5 max-md:max-w-full"
								data-wow-delay=".7s"
							>
								<h3 className="mb-6.25 font-medium">
									Stay Close to the Ideas Powerhouse.
								</h3>
								<div className="relative max-md:mt-4.5">
									<form action="#">
										<input
											type="email"
											name="email"
											placeholder="Enter email"
											className="h-16 w-full rounded-lg border-0 bg-white py-3.75 pe-15 ps-6.25 text-brand-dark-3 outline outline-transparent transition-all duration-300 focus:outline-brand"
										/>
										<button
											type="submit"
											aria-label="Subscribe"
											className="absolute inset-e-0 top-0 flex size-16 items-center justify-center text-[26px] leading-none text-brand before:absolute before:inset-s-0 before:top-5 before:h-6 before:border-s before:border-[#c9d1d1] before:content-[''] [&_i]:inline-flex [&_i]:leading-none [&_i]:transition-all hover:[&_i]:scale-[0.8]"
										>
											<i className="tji-plane"></i>
										</button>
										<label
											htmlFor="agree"
											className="mt-5 inline-flex items-center text-brand-dark-3"
										>
											<input
												id="agree"
												type="checkbox"
												className="relative me-2 size-4.5 cursor-pointer appearance-none rounded-[3px] border border-brand-dark transition-all duration-300 before:absolute before:w-full before:scale-50 before:text-center before:text-[10px] before:leading-4 before:text-white before:opacity-0 before:transition-all before:content-['\e911'] before:font-[bexon-icons] checked:bg-brand-dark checked:before:scale-100 checked:before:opacity-100"
											/>
											Agree to our{" "}
											<Link
												href="#"
												className="ms-1 font-semibold text-brand-dark transition-all duration-300 hover:text-brand"
											>
												Terms & Condition?
											</Link>
										</label>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="pb-7.5">
				<div className="tj-container">
					<div className="flex flex-wrap items-center justify-between gap-7.5 border-y border-[#c9d1d1] py-5 max-lg:gap-4.5">
						<div className="max-md:w-full">
							<ul className="flex list-none flex-wrap justify-center gap-5.5 leading-none">
								<li>
									<Link
										href="tel:+2348092900214"
										className="group inline-flex items-center gap-1.75 text-brand-dark-3"
									>
										<span className="inline-flex size-7 items-center justify-center rounded-full bg-red-700 text-[28px] leading-none [&_i]:text-white">
											<i className="tji-phone-2"></i>
										</span>
										<span className="relative before:absolute before:-bottom-0.5 before:inset-e-0 before:h-px before:w-0 before:bg-brand-dark-3 before:transition-all before:duration-300 before:content-[''] group-hover:before:inset-e-auto group-hover:before:inset-s-0 group-hover:before:w-full">
											+234 809 290 0214
										</span>
									</Link>
								</li>
								<li>
									<Link
										href="mailto:outsourcing@firstkatalystmarketing.com"
										className="group inline-flex items-center gap-1.75 text-brand-dark-3"
									>
										<span className="inline-flex size-7 items-center justify-center rounded-full bg-red-700 text-[28px] leading-none [&_i]:text-white">
											<i className="tji-envelop-2"></i>
										</span>
										<span className="relative before:absolute before:-bottom-0.5 before:inset-e-0 before:h-px before:w-0 before:bg-brand-dark-3 before:transition-all before:duration-300 before:content-[''] group-hover:before:inset-e-auto group-hover:before:inset-s-0 group-hover:before:w-full">
											outsourcing@firstkatalystmarketing.com
										</span>
									</Link>
								</li>
								<li>
									<span className="group inline-flex items-center gap-1.75 text-brand-dark-3">
										<span className="inline-flex size-7 items-center justify-center rounded-full bg-red-700 text-[28px] leading-none [&_i]:text-white">
											<i className="tji-location"></i>
										</span>
										{/* Live contact.html Find Us (cleaned “Ikeja Jones” → Ikeja, Lagos) */}
										<span>
											19b Alhaji Bankole Crescent, Off Adeniyi Jones, Ikeja,
											Lagos
										</span>
									</span>
								</li>
							</ul>
						</div>
						<div className="max-md:w-full">
							<ul className="flex list-none flex-wrap gap-2 max-md:justify-center">
								{socialItems.map(({ href, icon }) => (
									<li key={href}>
										<Link
											href={href}
											target="_blank"
											className="inline-flex size-7 items-center justify-center rounded-full bg-blue-400 text-base leading-none transition-all duration-300 hover:-translate-y-0.75 hover:bg-red-700 [&_i]:text-brand-bg hover:[&_i]:text-white"
										>
											<i className={icon}></i>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="max-md:w-full max-md:text-center">
							<p className="m-0">
								&copy; 2026{" "}
								<Link
									href="/"
									className="text-black transition-all duration-300 hover:text-brand"
								>
									First Katalyst Marketing Limited
								</Link>{" "}
								All rights reserved
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* background pattern shapes */}
			<div className="pointer-events-none absolute inset-s-0 top-0 z-[-1] w-full max-w-92.5 mix-blend-difference max-lg:max-w-65">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="pointer-events-none absolute bottom-0 inset-e-0 z-[-1] w-full max-w-92.5 mix-blend-difference max-lg:max-w-65">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</footer>
	);
};

export default Footer;
