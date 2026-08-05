"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import { cn } from "@/libs/utils";
import Link from "next/link";

/* Plain menu row (SCSS: .hamburger_menu .mean-nav ul li a) */
const mobileLink =
	"block w-full border-b border-white/10 py-[18px] text-base font-medium capitalize leading-none tracking-[0.5px] text-white transition-all duration-[400ms] hover:text-brand";

const accordionTrigger =
	"items-center rounded-none py-[18px] text-left text-base font-medium capitalize leading-none tracking-[0.5px] text-white transition-all duration-[400ms] hover:no-underline hover:text-brand [&>svg]:text-white [&[data-state=open]]:text-brand [&[data-state=open]>svg]:text-brand";

// Live socials from firstkatalystmarketing.com
const socialItems = [
	{ href: "https://www.facebook.com/firstkatalystmarketing", icon: "fa-brands fa-facebook-f" },
	{ href: "https://www.instagram.com/firstkatalystmarketing/", icon: "fa-brands fa-instagram" },
	{ href: "https://twitter.com/FirstKatalyst", icon: "fa-brands fa-x-twitter" },
	{ href: "https://www.linkedin.com/company/first-katalyst-marketing-limited/", icon: "fa-brands fa-linkedin-in" },
];

const FKM_PHONE = "+234 809 290 0214";
const FKM_PHONE_HREF = "tel:+2348092900214";
const FKM_EMAIL = "outsourcing@firstkatalystmarketing.com";
// Live contact.html Find Us (cleaned garbled “Ikeja Jones” → Ikeja, Lagos)
const FKM_LOCATION =
	"27, Akinola Cole Crescent, off Adeniyi Jones, Ikeja, Lagos, Nigeria.";

export const HamburgerTitle = ({ children }) => (
	<h5 className="relative z-1 mb-6.25 text-[22px] leading-none text-white">
		{children}
	</h5>
);

export const HamburgerContactInfo = ({
	phone = FKM_PHONE,
	phoneHref = FKM_PHONE_HREF,
	email = FKM_EMAIL,
	location = FKM_LOCATION,
}) => (
	<div className="mb-11.25">
		<HamburgerTitle>Contact Info</HamburgerTitle>
		<div>
			<div className="pb-2.5">
				<span className="mb-1.75 block text-[14px] leading-none text-brand-grey-2">
					Phone
				</span>
				<Link
					className="inline-block text-white transition-all duration-300 hover:text-brand"
					href={phoneHref}
				>
					{phone}
				</Link>
			</div>
			<div className="pb-2.5 pt-3.75">
				<span className="mb-1.75 block text-[14px] leading-none text-brand-grey-2">
					Email
				</span>
				<Link
					className="inline-block text-white transition-all duration-300 hover:text-brand"
					href={`mailto:${email}`}
				>
					{email}
				</Link>
			</div>
			<div className="pb-2.5 pt-3.75">
				<span className="mb-1.75 block text-[14px] leading-none text-brand-grey-2">
					Location
				</span>
				<span className="inline-block text-white">{location}</span>
			</div>
		</div>
	</div>
);

export const HamburgerSocials = () => (
	<div>
		<HamburgerTitle>Follow Us</HamburgerTitle>
		<ul className="flex list-none flex-wrap gap-2">
			{socialItems.map(({ href, icon }) => (
				<li key={href}>
					<Link
						href={href}
						target="_blank"
						className="inline-flex size-7 items-center justify-center rounded-full bg-white text-base leading-none opacity-30 transition-all duration-300 hover:-translate-y-0.75 hover:bg-brand hover:opacity-100 [&_i]:text-brand-dark hover:[&_i]:text-white"
					>
						<i className={icon}></i>
					</Link>
				</li>
			))}
		</ul>
	</div>
);

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems();
	const findNav = path =>
		makeActiveLink(navItems.find(item => item.path === path));
	const homeNav = findNav("/");
	const aboutNav = findNav("/about");
	const groupNav = findNav("/fk-group");
	const serviceNav = findNav("/services");
	const portfolioNav = findNav("/portfolios");
	const insightsNav = findNav("/blogs");
	const contactNav = findNav("/contact");

	/* Close the sheet whenever a navigation link is clicked */
	const handleNavClick = event => {
		if (event.target.closest("a")) {
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
			<SheetContent
				side="right"
				showCloseButton={false}
				overlayClassName="z-9998 bg-transparent backdrop-blur-[10px]"
				className="inset-y-3.75 right-3.75 z-9999 h-auto w-112.5 max-w-none gap-0 overflow-y-auto rounded-[12px] border-0 bg-brand-dark p-0 shadow-[-5px_0_20px_-5px_rgba(0,0,0,0.5)] [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden sm:max-w-none max-md:inset-y-0 max-md:right-0 max-md:rounded-e-none max-sm:w-[320px] lg:hidden"
			>
				<SheetTitle className="sr-only">Mobile menu</SheetTitle>
				<SheetDescription className="sr-only">
					Site navigation and contact information
				</SheetDescription>
				<div className="relative flex min-h-full flex-col justify-between p-10 before:absolute before:inset-e-[3%] before:top-[3%] before:z-[-1] before:size-50 before:rounded-full before:bg-brand before:opacity-25 before:blur-[50px] before:content-[''] max-sm:px-5">
					<div>
						{/* top: logo + close */}
						<div className="mb-7.5 flex items-center justify-between">
							<Link
								href="/"
								className="inline-block w-full max-w-34"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<img src="/images/logos/logo-2.webp" alt="Logo" />
							</Link>
							<SheetClose
								aria-label="Close menu"
								className="inline-block text-[35px] leading-none text-white transition-all duration-300 hover:rotate-90 hover:text-brand-bg max-sm:text-[30px]"
							>
								<i className="fa-thin fa-times"></i>
							</SheetClose>
						</div>

						{/* navigation */}
						<nav className="mb-7.5" onClick={handleNavClick}>
							<Link
								href={homeNav?.path ? homeNav?.path : "#"}
								className={cn(
									mobileLink,
									homeNav?.isActive && "text-brand"
								)}
							>
								{homeNav?.name}
							</Link>
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="about-fkm" className="border-white/10">
									<AccordionTrigger
										className={cn(
											accordionTrigger,
											aboutNav?.isActive && "text-brand"
										)}
									>
										{aboutNav?.name ? aboutNav.name : "About FKM"}
									</AccordionTrigger>
									<AccordionContent className="pb-0 ps-6.25">
										{aboutNav?.submenu?.map((item, idx) => (
											<Link
												key={idx}
												href={item?.path ? item.path : "/about"}
												className={cn(
													mobileLink,
													"font-normal",
													item?.isActive && "text-brand"
												)}
											>
												{item?.name}
											</Link>
										))}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="fkm-group" className="border-white/10">
									<AccordionTrigger
										className={cn(
											accordionTrigger,
											groupNav?.isActive && "text-brand"
										)}
									>
										{groupNav?.name ? groupNav.name : "FKM Group"}
									</AccordionTrigger>
									<AccordionContent className="pb-0 ps-6.25">
										{groupNav?.submenu?.map((item, idx) => (
											<Link
												key={idx}
												href={item?.path ? item.path : "/fk-group"}
												className={cn(
													mobileLink,
													"font-normal",
													item?.isActive && "text-brand"
												)}
											>
												{item?.name}
											</Link>
										))}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="services" className="border-white/10">
									<AccordionTrigger
										className={cn(
											accordionTrigger,
											serviceNav?.isActive && "text-brand"
										)}
									>
										{serviceNav?.name}
									</AccordionTrigger>
									<AccordionContent className="pb-0">
										{serviceNav?.submenu?.map((item, idx) => (
											<Link
												key={idx}
												href={item?.path ? item?.path : "/"}
												className="flex items-center gap-3 border-b border-white/10 py-3 font-medium tracking-[-0.03em] text-white transition-all duration-300 hover:text-brand"
											>
												<span className="inline-flex size-13.5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(-45deg,rgba(30,138,138,0.3)_0%,rgba(30,138,138,0)_50%,rgba(30,138,138,0.3)_100%)] text-[40px] leading-none text-brand">
													<i
														className={item?.icon ? item?.icon : "tji-service-1"}
													></i>
												</span>
												<span className="inline-block max-w-39 leading-snug">
													{item?.name}
												</span>
											</Link>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
							<Link
								href={portfolioNav?.path ? portfolioNav.path : "/portfolios"}
								className={cn(
									mobileLink,
									portfolioNav?.isActive && "text-brand"
								)}
							>
								{portfolioNav?.name ? portfolioNav.name : "Portfolio"}
							</Link>
							<Link
								href={insightsNav?.path ? insightsNav.path : "/blogs"}
								className={cn(
									mobileLink,
									insightsNav?.isActive && "text-brand"
								)}
							>
								{insightsNav?.name ? insightsNav.name : "Insights"}
							</Link>
							<Link
								href={contactNav?.path ? contactNav?.path : "#"}
								className={cn(
									mobileLink,
									contactNav?.isActive && "text-brand"
								)}
							>
								{contactNav?.name ? contactNav?.name : "Contact"}
							</Link>
						</nav>

						<HamburgerContactInfo />
					</div>
					<HamburgerSocials />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileMenu;
