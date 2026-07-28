"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import useIsSticky from "@/hooks/useIsSticky";
import { cn } from "@/libs/utils";
import { useState } from "react";
import ContactMenu from "./ContactMenu";
import HeaderTop from "./HeaderTop";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

/* Hamburger trigger bars (SCSS: .menu_bar span) */
const MenuBars = ({ barClassName }) => (
	<>
		<span
			className={cn(
				"me-auto block h-0.5 w-6.25 rounded-[10px] bg-black transition-all duration-300",
				barClassName
			)}
		></span>
		<span
			className={cn(
				"me-auto block h-0.5 w-4.5 rounded-[10px] bg-black transition-all duration-300 group-hover:w-full",
				barClassName
			)}
		></span>
		<span
			className={cn(
				"me-auto block h-0.5 w-6.25 rounded-[10px] bg-black transition-all duration-300",
				barClassName
			)}
		></span>
	</>
);

const Header = ({
	isHeaderTop = false,
	topbarType = 1,
	isStickyHeader = false,
}) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isSticky = useIsSticky(isStickyHeader);

	return (
		<>
			{/* Offcanvas contact drawer (desktop) */}
			<ContactMenu
				isContactOpen={isContactOpen}
				setIsContactOpen={setIsContactOpen}
			/>

			{/* Offcanvas mobile menu */}
			<MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>

			{/* Search popup overlay */}
			<div
				className={cn(
					"fixed inset-s-0 top-0 z-99 h-full w-full bg-[rgba(12,30,33,0.01)] transition-all duration-300 delay-100",
					isSearchOpen ? "translate-y-0" : "-translate-y-[calc(100%+80px)]"
				)}
				onClick={() => setIsSearchOpen(false)}
			></div>

			<header
				className={cn(
					"z-99 rounded-b-[12px] bg-white",
					!isStickyHeader &&
						"absolute inset-s-0 top-0 mx-3.75 w-[calc(100%-30px)] max-md:mx-3 max-md:w-[calc(100%-24px)]",
					isStickyHeader &&
						(isSticky
							? "fixed inset-s-0 top-0 z-1002 mx-3.75 block w-[calc(100%-30px)] shadow-[0_0_15px_0_rgba(0,0,0,0.1)] animate-[sticky_0.9s] max-md:mx-0 max-md:w-full"
							: "hidden")
				)}
			>
				{isHeaderTop && <HeaderTop type={topbarType} />}
				<div className="w-full px-3">
					{/* header wrapper — static so mega menus span the header width */}
					<div className="static flex flex-wrap items-center justify-between px-4.5 xl:max-2xl:px-2 lg:max-xl:px-1 max-lg:px-0 max-lg:py-3.75">
						{/* site logo */}
						<Logo />

						{/* navigation */}
						<Navbar />

						{/* header right info (desktop) */}
						<div className="inline-flex items-center gap-5 max-lg:hidden lg:max-xl:gap-3 [&_.btn-icon]:size-9.5 lg:max-xl:[&_.btn-icon]:size-8.75">
							<div className="relative leading-none">
								<button
									type="button"
									aria-label="Open search"
									className={cn(
										"inline-flex size-12 items-center justify-center rounded-full bg-brand-grey text-h5 leading-none text-brand-dark transition-all duration-300 lg:max-xl:size-11 lg:max-xl:text-lg [&_i]:inline-flex [&_i]:leading-none hover:[&_i]:animate-[gelatine_0.6s]",
										isSearchOpen && "invisible scale-50 opacity-0"
									)}
									onClick={() => setIsSearchOpen(true)}
								>
									<i className="tji-search"></i>
								</button>
								<button
									type="button"
									aria-label="Close search"
									className={cn(
										"absolute inset-s-0 top-0 inline-flex size-12 items-center justify-center rounded-full bg-brand-grey text-h5 leading-none text-brand-dark transition-all duration-300 lg:max-xl:size-11 lg:max-xl:text-lg",
										isSearchOpen ? "visible opacity-100" : "invisible opacity-0"
									)}
									onClick={() => setIsSearchOpen(false)}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 18 18"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M17 1L1 17"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M1 1L17 17"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
							<div>
								<ButtonPrimary text={"Let's Talk"} url={"/contact"} />
							</div>
							<button
								type="button"
								aria-label="Open contact menu"
								className="group ms-1.25 inline-flex size-6.25 cursor-pointer flex-col items-center justify-center gap-1.5 lg:max-xl:ms-0"
								onClick={() => setIsContactOpen(true)}
							>
								<MenuBars />
							</button>
						</div>

						{/* mobile menu bar */}
						<button
							type="button"
							aria-label="Open mobile menu"
							className="group inline-flex size-12.5 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[7px] bg-brand p-3 lg:hidden"
							onClick={() => setIsMobileMenuOpen(true)}
						>
							<MenuBars barClassName="bg-white" />
						</button>
					</div>
				</div>

				{/* Search popup (desktop only) */}
				<div
					className={cn(
						"absolute inset-s-0 top-[101%] z-10 w-full rounded-[12px] bg-white py-20 transition-transform duration-300 ease-in-out max-lg:hidden",
						isSearchOpen
							? "translate-y-0"
							: "-translate-y-[calc(100%+200px)] delay-200"
					)}
				>
					<div className="tj-container">
						<div className="flex justify-center">
							<div className="w-2/3">
								<div className="flex min-h-section-lg items-center">
									<form className="w-full" action="#">
										<div className="relative z-1">
											<input
												className="peer h-16.25 w-full rounded-[10px] border border-[#c9d1d1] bg-transparent py-4 pe-22.5 ps-6 font-body text-h5 text-brand-dark-3 outline-none transition-all duration-300 placeholder:text-h5 placeholder:text-brand-dark-3 focus:border-brand"
												type="text"
												placeholder="Type Words and Hit Enter"
												required
											/>
											<button
												type="submit"
												className="absolute inset-e-0 top-1/2 flex h-full w-full max-w-15 -translate-y-1/2 items-center justify-center text-[25px] text-brand before:absolute before:inset-s-0 before:top-4.5 before:h-7.5 before:border-s before:border-[#c9d1d1] before:transition-all before:content-[''] peer-focus:before:border-brand"
											>
												<i className="tji-search"></i>
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
