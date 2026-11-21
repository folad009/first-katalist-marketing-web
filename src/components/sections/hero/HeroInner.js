import sliceText from "@/libs/sliceText";
import Link from "next/link";
import React from "react";

// The banner can be changed in WordPress → Pages → Site Images ("Contact / page
// header banner"). The root layout exposes it as --fkm-page-header-bg; the
// local file is used when that slot is empty.
const PAGE_HEADER_BG =
	"var(--fkm-page-header-bg, url('/images/bg/FMK-contact-banner.webp'))";

const HeroInner = ({ title, text, breadcrums = [] }) => {
	return (
		<section
			className="tj-page-header section-gap-x"
			style={{ backgroundImage: PAGE_HEADER_BG }}
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
