import sliceText from "@/libs/sliceText";
import Link from "next/link";
import React from "react";

// Banners are set in WordPress → Pages → Site Images. `banner` picks this
// page's slot from "Page Banners" (keys in src/lib/page-banners.js), exposed by
// the root layout as --fkm-banner-<key>. Empty slots fall back to the shared
// "Contact / page header banner" (--fkm-page-header-bg), then the local file.
const pageHeaderBg = banner => {
	const shared = "var(--fkm-page-header-bg, url('/images/bg/FMK-contact-banner.webp'))";
	return banner ? `var(--fkm-banner-${banner}, ${shared})` : shared;
};

const HeroInner = ({ title, text, breadcrums = [], banner }) => {
	return (
		<section
			className="tj-page-header section-gap-x"
			style={{ backgroundImage: pageHeaderBg(banner) }}
		>
			<div className="tj-container">
				<div className="tj-page-header-content text-center">
					<h1 className={`tj-page-title`}>{title}</h1>
					<div className="tj-page-link">
						<span>
							<i className="tji-home"></i>
						</span>
						<span>
							<Link href="/">Home</Link>
						</span>
						<span>
							<i className="tji-arrow-right"></i>
						</span>
						{breadcrums?.length
							? breadcrums?.map(({ name, path }, idx) => (
									<React.Fragment key={idx}>
										<span>
											<Link href={path ? path : "/"}>{name}</Link>
										</span>
										<span>
											<i className="tji-arrow-right"></i>
										</span>
									</React.Fragment>
							  ))
							: ""}
						<span>
							<span>{sliceText(text, 28, true)}</span>
						</span>
					</div>
				</div>
			</div>
			<div
				className="page-header-overlay"
				style={{ backgroundImage: `url('/images/shape/pheader-overlay.webp')` }}
			></div>
		</section>
	);
};

export default HeroInner;
