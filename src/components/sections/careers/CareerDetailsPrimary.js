import WordPressContent from "@/components/shared/content/WordPressContent";
import Link from "next/link";

const CareerDetailsPrimary = ({ option }) => {
	const { prevSlug, nextSlug, currentItem, isPrevItem, isNextItem } =
		option || {};
	const {
		title,
		iconName,
		price,
		duration,
		location,
		category,
		need,
		contentHtml,
		desc,
	} = currentItem || {};

	return (
		<section className="tj-career-details section-gap">
			<div className="tj-container">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<div className="post-details-wrapper">
							<div className="career-meta wow fadeInUp" data-wow-delay=".1s">
								{iconName ? (
									<span className="career-icon">
										<i className={iconName}></i>
									</span>
								) : null}
								<h2 className="title title-anim">{title}</h2>
								<ul className="career-info-list">
									{price ? <li>{price}</li> : null}
									{duration ? <li>{duration}</li> : null}
									{location ? <li>{location}</li> : null}
									{category ? <li>{category}</li> : null}
									{need ? <li>{need}</li> : null}
								</ul>
							</div>
							<div className="blog-text">
								{contentHtml ? (
									<WordPressContent
										html={contentHtml}
										className="wow fadeInUp"
										data-wow-delay=".3s"
									/>
								) : desc ? (
									<p className="wow fadeInUp" data-wow-delay=".3s">
										{desc}
									</p>
								) : null}
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
										<Link href={isPrevItem ? `/careers/${prevSlug}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={isNextItem ? `/careers/${nextSlug}` : "#"}>
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
				</div>
			</div>
		</section>
	);
};

export default CareerDetailsPrimary;
