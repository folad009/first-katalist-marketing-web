"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
	HamburgerContactInfo,
	HamburgerSocials,
	HamburgerTitle,
} from "./MobileMenu";

const ContactMenu = ({ isContactOpen, setIsContactOpen }) => {
	return (
		<Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
			<SheetContent
				side="right"
				showCloseButton={false}
				overlayClassName="z-9998 bg-transparent backdrop-blur-[10px]"
				className="inset-y-3.75 right-3.75 z-9999 h-auto w-117.5 max-w-none gap-0 overflow-y-auto rounded-[12px] border-0 bg-brand-dark p-0 shadow-[-5px_0_20px_-5px_rgba(0,0,0,0.5)] [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden sm:max-w-none max-lg:hidden"
			>
				<SheetTitle className="sr-only">Contact menu</SheetTitle>
				<SheetDescription className="sr-only">
					Search and contact information
				</SheetDescription>
				<div className="relative flex min-h-full flex-col justify-between p-10 before:absolute before:inset-e-[3%] before:top-[3%] before:z-[-1] before:size-50 before:rounded-full before:bg-brand before:opacity-25 before:blur-[50px] before:content-['']">
					<div>
						{/* top: logo + close */}
						<div className="mb-7.5 flex items-center justify-between">
							<Link
								href="/"
								className="inline-block w-full max-w-34"
								onClick={() => setIsContactOpen(false)}
							>
								<img src="/images/logos/logo-2.webp" alt="Logo" />
							</Link>
							<SheetClose
								aria-label="Close menu"
								className="inline-block text-[35px] leading-none text-white transition-all duration-300 hover:rotate-90 hover:text-brand-bg"
							>
								<i className="fa-thin fa-times"></i>
							</SheetClose>
						</div>

						<div className="mb-10">
							<p className="m-0 text-brand-grey-2">
								Developing personalize our customer journeys to increase
								satisfaction & loyalty of our expansion recognized by industry
								leaders.
							</p>
						</div>

						<div className="mb-11.25">
							<HamburgerTitle>Search Now!</HamburgerTitle>
							<div className="relative">
								<form method="get" action="/">
									<input
										type="search"
										autoComplete="off"
										name="s"
										placeholder="Search here..."
										className="h-15 w-full rounded-[10px] border border-[#c9d1d1] bg-white pe-10 ps-4 font-body text-lg leading-15 text-brand-dark-3 outline-none placeholder:text-brand-dark-3"
									/>
									<button
										type="submit"
										aria-label="Search"
										className="absolute inset-e-0 top-1/2 h-14.5 w-14.5 -translate-y-1/2 border-s border-[#c9d1d1] text-2xl text-brand-dark"
									>
										<i className="tji-search"></i>
									</button>
								</form>
							</div>
						</div>

						<HamburgerContactInfo
							phone="+1 (009) 544-7818"
							phoneHref="tel:10095447818"
						/>
					</div>
					<HamburgerSocials />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default ContactMenu;
