import Link from "next/link";
import { getFkGroupChildren, getFkGroupTopLevel } from "@/libs/getFkGroup";

const colorClasses = {
	blue: "border-[#13297D] bg-[#13297D]",
	green: "border-[#2F6B3A] bg-[#2F6B3A]",
	orange: "border-[#E67E22] bg-[#E67E22]",
	purple: "border-[#6C3483] bg-[#6C3483]",
	teal: "border-[#148F8A] bg-[#148F8A]",
};

const FkGroupOverview = ({ entities = [] }) => {
	const topLevel = getFkGroupTopLevel(entities);

	return (
		<section className="section-gap">
			<div className="tj-container">
				<div className="sec-heading text-center">
					<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
						<i className="tji-box"></i>FKM Group
					</span>
					<h2 className="sec-title title-anim">
						Our Family of <span>Brands.</span>
					</h2>
					<p className="desc mx-auto max-w-2xl wow fadeInUp" data-wow-delay=".2s">
						{/* Chart lists names only — no marketing blurbs inventing scope */}
						Structure from the FKM Group org chart. Entity descriptions and logos
						are TODO until FKM provides them.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{topLevel.map(entity => {
						const children = getFkGroupChildren(entities, entity.slug);
						const tone = colorClasses[entity.color] || colorClasses.blue;

						return (
							<div
								key={entity.slug}
								className="wow fadeInUp flex flex-col overflow-hidden rounded-[12px] border border-[#c9d1d1] bg-white"
								data-wow-delay=".2s"
							>
								<div className={`px-6 py-5 text-white ${tone}`}>
									{/* TODO: logoTodo — placeholder mark until assets land */}
									<span className="mb-2 block text-xs uppercase tracking-wide opacity-80">
										{entity.logoTodo ? "Logo TODO" : "Brand"}
									</span>
									<h3 className="m-0 text-h5 font-semibold text-white">
										<Link
											href={`/fk-group/${entity.slug}`}
											className="text-white transition-opacity hover:opacity-80"
										>
											{entity.name}
										</Link>
									</h3>
								</div>
								<div className="flex flex-1 flex-col gap-4 p-6">
									<p className="m-0 text-brand-dark-3">{entity.shortDesc}</p>
									{children.length ? (
										<ul className="m-0 list-none border-t border-[#c9d1d1] pt-4">
											{children.map(child => (
												<li key={child.slug} className="py-1.5">
													<Link
														href={`/fk-group/${child.slug}`}
														className="inline-flex items-center gap-2 font-medium text-brand-dark transition-colors hover:text-brand"
													>
														<i className="tji-arrow-right text-sm"></i>
														{child.name}
													</Link>
												</li>
											))}
										</ul>
									) : null}
									<div className="mt-auto pt-2">
										<Link
											href={`/fk-group/${entity.slug}`}
											className="font-semibold text-brand transition-opacity hover:opacity-70"
										>
											View entity
											<i className="tji-arrow-right ms-1 inline-flex text-h6"></i>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FkGroupOverview;
