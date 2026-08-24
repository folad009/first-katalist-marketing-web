"use client";
import WordPressContent from "@/components/shared/content/WordPressContent";
import Image from "next/image";
import Link from "next/link";
import CtaSidebar from "../cta/CtaSidebar";

const PortfolioDetailsPrimary = ({ option }) => {
	const { prevSlug, nextSlug, currentItem, isPrevItem, isNextItem } =
		option || {};
	const {
		title,
		titleLarge,
		imgLarge,
		img,
		contentHtml,
		objectives = [],
		activity = [],
		results = [],
		statusItem = [],
		client,
		category,
	} = currentItem || {};

	const hasStructured =
		(Array.isArray(objectives) && objectives.length > 0) ||
		(Array.isArray(results) && results.length > 0);

	const sidebarInfo =
		Array.isArray(statusItem) && statusItem.length > 0
			? statusItem.filter(item => item.title !== "Images")
			: [
					{ title: "Category", desc: category || "TODO" },
					{ title: "Client", desc: client || "TODO" },
					{ title: "Agency", desc: "First Katalyst Marketing" },
				];

	const sidebarIcons = [
		"tji-chart",
		"tji-user",
		"tji-budget",
		"tji-location-2",
		"tji-calendar",
	];

	return (
		<section className="tj-blog-section section-gap">
			<div className="tj-container">
				<div className="grid grid-cols-1 rg-50 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								{/* TODO: Replace with FKM case-study hero — do not hotlink */}
								<Image
									src={imgLarge || img || "/images/project/project-details.webp"}
									alt={title || "Portfolio image"}
									width={868}
									height={450}
									style={{ height: "auto" }}
								/>
							</div>
							<h2 className="title title-anim">
								{titleLarge || title || "Portfolio Details"}
							</h2>
							<div className="blog-text">
								{contentHtml ? (
									<WordPressContent
										html={contentHtml}
										className="wow fadeInUp"
										data-wow-delay=".3s"
									/>
								) : hasStructured ? (
									<>
										{objectives.length > 0 ? (
											<>
												<h3 className="wow fadeInUp" data-wow-delay=".3s">
													Objectives
												</h3>
												<ul className="wow fadeInUp" data-wow-delay=".3s">
													{objectives.map(item => (
														<li key={item}>
															<span>
																<i className="tji-check"></i>
															</span>
															{item}
														</li>
													))}
												</ul>
											</>
										) : null}
										{activity.length > 0 ? (
											<>
												<h3 className="wow fadeInUp" data-wow-delay=".3s">
													Activity
												</h3>
												<ul className="wow fadeInUp" data-wow-delay=".3s">
													{activity.map(item => (
														<li key={item}>
															<span>
																<i className="tji-check"></i>
															</span>
															{item}
														</li>
													))}
												</ul>
											</>
										) : null}
										{results.length > 0 ? (
											<>
												<h3 className="wow fadeInUp" data-wow-delay=".3s">
													Results
												</h3>
												<ul className="wow fadeInUp" data-wow-delay=".3s">
													{results.map(item => (
														<li key={item}>
															<span>
																<i className="tji-check"></i>
															</span>
															{item}
														</li>
													))}
												</ul>
											</>
										) : null}
										<p className="wow fadeInUp" data-wow-delay=".3s">
											<em>
												TODO: Replace temporary /images/project/* with FKM
												activity photos from profile PDF — do not hotlink.
											</em>
										</p>
									</>
								) : (
									<p className="wow fadeInUp" data-wow-delay=".3s">
										TODO: Add case study objectives and results from FKM.
									</p>
								)}
							</div>
							<div
								className="tj-post__navigation mb-0 wow fadeInUp"
								data-wow-delay="0.3s"
							>
								<div
									className="tj-nav__post previous"
									style={{ visibility: isPrevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link href={isPrevItem ? `/portfolios/${prevSlug}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/portfolios"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={isNextItem ? `/portfolios/${nextSlug}` : "#"}>
											Next
											<span>
												<i className="tji-arrow-right"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:col-span-4">
						<aside className="tj-main-sidebar">
							<div
								className="tj-sidebar-widget widget-categories wow fadeInUp"
								data-wow-delay=".1s"
							>
								<h4 className="widget-title">Project Info</h4>
								{sidebarInfo.map((item, idx) => (
									<div className="infos-item" key={`${item.title}-${idx}`}>
										<div className="project-icons">
											<i
												className={
													sidebarIcons[idx % sidebarIcons.length]
												}
											></i>
										</div>
										<div className="project-text">
											<span>{item.title}</span>
											<h6 className="title">{item.desc}</h6>
										</div>
									</div>
								))}
							</div>
							<div
								className="tj-sidebar-widget widget-feature-item wow fadeInUp"
								data-wow-delay=".3s"
							>
								<CtaSidebar />
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PortfolioDetailsPrimary;
