"use client";
import FaqItem from "@/components/shared/faq/FaqItem";
import WordPressContent from "@/components/shared/content/WordPressContent";
import { Accordion } from "@/components/ui/accordion";
import faqs from "../../../../public/fakedata/faqs.json";
import Image from "next/image";
import Link from "next/link";
import CtaSidebar from "../cta/CtaSidebar";

const serviceFaqItems = faqs;

const ServicesDetailsPrimary = ({ option }) => {
	const {
		currentItem,
		items,
		isPrevItem,
		isNextItem,
		prevSlug,
		nextSlug,
	} = option || {};
	const {
		title,
		titleLarge,
		slug,
		iconName,
		img,
		contentHtml,
		desc,
		desc1,
		desc2,
		shortDesc,
		subServices = [],
		process = null,
	} = currentItem || {};
	const sidebarItems = items?.slice(0, 7);
	const hasSubServices = Array.isArray(subServices) && subServices.length > 0;
	const processStages =
		Array.isArray(process?.stages) && process.stages.length > 0
			? process.stages
			: null;
	const processItemsFallback =
		!processStages &&
		Array.isArray(process?.processItems) &&
		process.processItems.length > 0
			? process.processItems
			: null;
	const bodyLead =
		desc1 ||
		desc ||
		shortDesc ||
		"TODO: Add service description from FKM.";
	return (
		<section className="tj-service-area section-gap">
			<div className="tj-container">
				<div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src={img || "/images/service/service-details.webp"}
									alt={title || "Service image"}
									width={870}
									height={450}
									style={{ height: "auto" }}
								/>
							</div>
							<h2 className="title title-anim">
								{titleLarge || title || "Service Details"}
							</h2>
							<div className="blog-text">
								{contentHtml ? (
									<WordPressContent
										html={contentHtml}
										className="wow fadeInUp"
										data-wow-delay=".3s"
									/>
								) : (
									<>
										<p className="wow fadeInUp" data-wow-delay=".3s">
											{bodyLead}
										</p>
										{desc2 ? (
											<p className="wow fadeInUp" data-wow-delay=".3s">
												{desc2}
											</p>
										) : null}
										{hasSubServices ? (
											<>
												<h3 className="wow fadeInUp" data-wow-delay=".3s">
													What&apos;s included under {title}
												</h3>
												<ul className="wow fadeInUp" data-wow-delay=".3s">
													{subServices.map(item => (
														<li key={item}>
															<span>
																<i className="tji-check"></i>
															</span>
															{item}
														</li>
													))}
												</ul>
											</>
										) : (
											<>
												<h3 className="wow fadeInUp" data-wow-delay=".3s">
													What&apos;s included under {title}
												</h3>
												<p className="wow fadeInUp" data-wow-delay=".3s">
													TODO: Sub-services not listed on the PDF “What We Do”
													slide — confirm checklist with FKM.
												</p>
											</>
										)}
										<div className="images-wrap">
											<div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
												<div>
													<div
														className="image-box wow fadeInUp"
														data-wow-delay=".3s"
													>
														<Image
															src="/images/service/service-3.webp"
															alt="Image"
															width={420}
															height={420}
															style={{ height: "auto" }}
														/>
													</div>
												</div>
												<div>
													<div
														className="image-box wow fadeInUp"
														data-wow-delay=".5s"
													>
														<Image
															src="/images/service/service-4.webp"
															alt="Image"
															width={420}
															height={420}
															style={{ height: "auto" }}
														/>
													</div>
												</div>
											</div>
										</div>
										{hasSubServices ? null : (
											<>
												<h3 className="wow fadeInUp" data-wow-delay=".3s">
													Our Range of Services
												</h3>
												<p className="wow fadeInUp" data-wow-delay=".3s">
													At First Katalyst Marketing, we deliver Experiential,
													Activations, Sales and Distribution, Merchandising
													Management, Field Force Management, Procurement and
													Production, and Creative Development.
												</p>
											</>
										)}
									</>
								)}
								{hasSubServices && contentHtml ? (
									<>
										<h3 className="wow fadeInUp" data-wow-delay=".3s">
											What&apos;s included under {title}
										</h3>
										<ul className="wow fadeInUp" data-wow-delay=".3s">
											{subServices.map(item => (
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
								{processStages || processItemsFallback ? (
									<>
										<h3 className="wow fadeInUp" data-wow-delay=".3s">
											{process?.title || "Process"}
										</h3>
										{process?.desc ? (
											<p className="wow fadeInUp" data-wow-delay=".3s">
												{process.desc}
											</p>
										) : null}
										{processStages ? (
											<div className="details-content-box">
												{processStages.map((stage, stageIdx) => (
													<div
														key={stage.name}
														className="service-details-item wow fadeInUp"
														data-wow-delay={`${0.2 + stageIdx * 0.1}s`}
													>
														<span className="number">
															{String(stageIdx + 1).padStart(2, "0")}.
														</span>
														<h6 className="title">{stage.name}</h6>
														<div className="desc">
															<ul>
																{(stage.steps || []).map(step => (
																	<li key={step.name}>
																		<span>
																			<i className="tji-check"></i>
																		</span>
																		<strong>{step.name}</strong>
																		{step.by ? ` — ${step.by}` : ""}
																		{step.timing ? (
																			<em> ({step.timing})</em>
																		) : null}
																	</li>
																))}
															</ul>
														</div>
													</div>
												))}
											</div>
										) : (
											<ul className="wow fadeInUp" data-wow-delay=".3s">
												{processItemsFallback.map(item => (
													<li key={item}>
														<span>
															<i className="tji-check"></i>
														</span>
														{item}
													</li>
												))}
											</ul>
										)}
										{process?.diagramTodo ? (
											<p className="wow fadeInUp" data-wow-delay=".3s">
												Visual flowchart: TODO — design asset pending (do not
												hotlink).
											</p>
										) : null}
									</>
								) : null}
								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Frequently asked questions
								</h3>
								<Accordion
									type="single"
									collapsible
									defaultValue="faq-1"
									className="accordion tj-faq style-2"
								>
									{serviceFaqItems.map((item, idx) => (
										<FaqItem
											key={idx}
											item={item}
											idx={idx}
											className="active wow fadeInUp"
											data-wow-delay=".3s"
										/>
									))}
								</Accordion>
							</div>
							<div
								className="tj-post__navigation mb-0 wow fadeInUp"
								data-wow-delay="0.3s"
							>
								{/* <!-- previous post --> */}
								<div
									className="tj-nav__post previous"
									style={{ visibility: isPrevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link href={isPrevItem ? `/services/${prevSlug}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/services"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								{/* <!-- next post --> */}
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={isNextItem ? `/services/${nextSlug}` : "#"}>
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
							{/* <!-- Service List --> */}
							<div
								className="tj-sidebar-widget service-categories wow fadeInUp"
								data-wow-delay=".1s"
							>
								<h4 className="widget-title">More Services</h4>
								<ul>
									{sidebarItems?.length
										? sidebarItems?.map(({ shortTitle, slug: itemSlug }, idx) => (
												<li key={idx}>
													<Link
														className={`${slug === itemSlug ? "active" : ""}`}
														href={`/services/${itemSlug}`}
													>
														{shortTitle}
														<span className="icon">
															<i className="tji-arrow-right"></i>
														</span>
													</Link>
												</li>
										  ))
										: ""}
								</ul>
							</div>

							{/* <!-- cta --> */}
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

export default ServicesDetailsPrimary;
