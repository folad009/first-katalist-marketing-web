import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import { cn } from "@/libs/utils";
import Link from "next/link";

/* Top-level menu link (SCSS: .mainmenu ul > li > a) */
const topLink = isActive =>
	cn(
		"relative block py-[37px] text-[16px] font-medium leading-none transition-all duration-300 group-hover/nav:text-brand",
		isActive ? "text-brand" : "text-brand-dark"
	);

/* Caret for items with a dropdown (SCSS ::after with \e929) */
const Caret = () => (
	<i
		aria-hidden="true"
		className="tji-arrow-down absolute inset-e-0 top-10 text-[12px] transition-transform duration-300 group-hover/nav:-rotate-180"
	></i>
);

/* Shared dropdown panel behavior (SCSS: .mainmenu ul > li > .sub-menu) */
const dropdownPanel =
	"invisible absolute top-full start-0 z-[99] m-0 origin-top scale-y-0 list-none rounded-[10px] bg-white p-0 text-start opacity-0 shadow-[0_0_15px_0_rgba(0,0,0,0.1)] transition-all duration-500 pointer-events-none group-hover/nav:visible group-hover/nav:pointer-events-auto group-hover/nav:scale-y-100 group-hover/nav:opacity-100";

const subLink = isActive =>
	cn(
		"block px-5 py-[10px] leading-normal transition-all duration-300 hover:text-brand",
		isActive ? "text-brand" : "text-brand-dark-3"
	);

const Navbar = () => {
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems();
	const homeNav = makeActiveLink(navItems[0]);
	const aboutNav = makeActiveLink(navItems[1]);
	const serviceNav = makeActiveLink(navItems[2]);
	const portfolioNav = makeActiveLink(navItems[3]);
	const insightsNav = makeActiveLink(navItems[4]);
	const contactNav = makeActiveLink(navItems[5]);

	return (
		<nav className="max-lg:hidden">
			<ul className="m-0 flex list-none flex-wrap items-center gap-x-7.5 p-0 xl:max-2xl:gap-x-5.5 lg:max-xl:gap-x-4">
				<li className="group/nav relative z-1">
					<Link
						href={homeNav?.path ? homeNav?.path : "#"}
						className={topLink(homeNav?.isActive)}
					>
						{homeNav?.name}
					</Link>
				</li>

				{/* About FKM — simple dropdown */}
				<li className="group/nav relative z-1">
					<Link
						href={aboutNav?.path ? aboutNav?.path : "#"}
						className={cn(topLink(aboutNav?.isActive), "pe-5")}
					>
						{aboutNav?.name}
						<Caret />
					</Link>
					<ul className={cn(dropdownPanel, "w-55 py-2.5")}>
						{aboutNav?.submenu?.length
							? aboutNav.submenu.map((item, idx) => (
									<li key={idx} className="block w-full">
										<Link
											href={item?.path ? item.path : "/about"}
											className={subLink(item?.isActive)}
										>
											{item?.name}
										</Link>
									</li>
							  ))
							: null}
					</ul>
				</li>

				{/* Services — icon dropdown */}
				<li className="group/nav relative z-1">
					<Link
						href={serviceNav?.path ? serviceNav?.path : "#"}
						className={cn(topLink(serviceNav?.isActive), "pe-5")}
					>
						{serviceNav?.name}
						<Caret />
					</Link>
					<ul className={cn(dropdownPanel, "-ms-6.25 w-86.5 py-3.75")}>
						{serviceNav?.submenu?.length
							? serviceNav.submenu.map((item, idx) => (
									<li key={idx} className="group/item block w-full">
										<Link
											className="flex items-center gap-3 border-b border-[#c9d1d1] px-6.25 py-3.75 font-medium tracking-[-0.03em] text-brand-dark-3 transition-all duration-300 group-last/item:border-b-0 hover:text-brand"
											href={item?.path ? item.path : "/"}
										>
											<span className="inline-flex size-13.5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(-45deg,rgba(30,138,138,0.3)_0%,rgba(30,138,138,0)_50%,rgba(30,138,138,0.3)_100%)] text-[40px] leading-none text-brand transition-all duration-400 group-hover/item:bg-brand group-hover/item:bg-none group-hover/item:text-white">
												<i
													className={item?.icon ? item.icon : "tji-service-1"}
												></i>
											</span>
											<span className="inline-block max-w-42.75 leading-snug">
												{item?.name
													? item.name
													: "Business process optimization"}
											</span>
											<span className="group/arrow relative -inset-e-4 ms-auto inline-flex h-full min-w-11.25 -rotate-45 items-center justify-center overflow-hidden text-[1.6em] leading-none text-brand opacity-0 transition-all duration-300 group-hover/item:opacity-100">
												<i className="tji-arrow-right-long transition-transform duration-400 group-hover/arrow:translate-x-[150%]"></i>
												<i className="tji-arrow-right-long absolute translate-x-[-150%] transition-transform duration-400 group-hover/arrow:translate-x-0"></i>
											</span>
										</Link>
									</li>
							  ))
							: null}
					</ul>
				</li>

				<li className="group/nav relative z-1">
					<Link
						href={portfolioNav?.path ? portfolioNav.path : "/portfolios"}
						className={topLink(portfolioNav?.isActive)}
					>
						{portfolioNav?.name}
					</Link>
				</li>

				<li className="group/nav relative z-1">
					<Link
						href={insightsNav?.path ? insightsNav.path : "/blogs"}
						className={topLink(insightsNav?.isActive)}
					>
						{insightsNav?.name}
					</Link>
				</li>

				<li className="group/nav relative z-1">
					<Link
						href={contactNav?.path ? contactNav.path : "#"}
						className={topLink(contactNav?.isActive)}
					>
						{contactNav?.name ? contactNav.name : "Contact"}
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
