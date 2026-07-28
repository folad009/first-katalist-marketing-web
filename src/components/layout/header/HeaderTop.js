import Link from "next/link";

const socialItems = [
	{ href: "https://www.facebook.com/", icon: "fa-brands fa-facebook-f" },
	{ href: "https://www.instagram.com/", icon: "fa-brands fa-instagram" },
	{ href: "https://x.com/", icon: "fa-brands fa-x-twitter" },
	{ href: "https://www.linkedin.com/", icon: "fa-brands fa-linkedin-in" },
];

const HeaderTop = () => {
	return (
		<div className="mb-3.75 rounded-b-[12px] bg-brand px-3 xl:max-2xl:px-2 lg:max-xl:px-2 max-lg:px-0">
			<div className="w-full px-3">
				<div className="flex flex-wrap items-center justify-between max-md:justify-center">
					<p className="m-0 inline-flex items-center gap-1.25 py-3.25 text-white max-lg:text-[15px] max-md:w-full max-md:justify-center max-md:py-2.5">
						<i className="tji-excellence text-h5 text-white max-lg:text-h6"></i>
						Recognized for Excellence{" "}
						<Link
							href="/contact"
							className="inline-flex font-semibold text-white transition-all duration-300 hover:opacity-70"
						>
							Join us Now
							<i className="tji-arrow-right inline-flex text-[21px] font-normal leading-[1.2] text-white"></i>
						</Link>
					</p>
					<div className="flex flex-wrap items-center justify-center">
						<div className="relative inline-flex items-center gap-2 border-s border-dashed border-white/15 px-3.75 max-md:border-0 max-md:px-2.5 max-md:pb-2.5">
							<span className="inline-flex leading-none text-white">
								<i className="tji-location"></i>
							</span>
							<Link className="text-white" href="#">
								Find a Location!
							</Link>
						</div>
						<div className="relative inline-flex items-center gap-2 border-s border-dashed border-white/15 px-3.75 max-md:border-0 max-md:px-2.5 max-md:pb-2.5">
							<span className="inline-flex leading-none text-white">
								<i className="tji-phone-3"></i>
							</span>
							<Link className="text-white" href="tel:8089091313">
								808-909-1313
							</Link>
						</div>
						<div className="relative inline-flex items-center gap-2 border-s border-dashed border-white/15 ps-3.75 max-lg:hidden">
							<ul className="flex list-none flex-wrap gap-2">
								{socialItems.map(({ href, icon }) => (
									<li key={href}>
										<Link
											href={href}
											target="_blank"
											className="inline-flex size-5.5 items-center justify-center rounded-full bg-white text-[14px] leading-none opacity-40 transition-all duration-300 [&_i]:text-brand hover:opacity-100"
										>
											<i className={icon}></i>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderTop;
