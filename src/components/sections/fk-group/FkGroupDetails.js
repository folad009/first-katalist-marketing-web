import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";

const colorBar = {
	blue: "bg-[#13297D]",
	green: "bg-[#2F6B3A]",
	orange: "bg-[#E67E22]",
	purple: "bg-[#6C3483]",
	teal: "bg-[#148F8A]",
};

const FkGroupDetails = ({ entity }) => {
	if (!entity) return null;

	const {
		name,
		shortDesc,
		color,
		logoTodo,
		parent,
		children = [],
		relatedLinks = [],
	} = entity;

	return (
		<section className="section-gap">
			<div className="tj-container">
				<div className="mx-auto max-w-3xl">
					<div
						className={`mb-6 h-2 w-24 rounded-full ${colorBar[color] || colorBar.blue}`}
					/>
					<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
						<i className="tji-box"></i>FKM Group
					</span>
					<h2 className="sec-title title-anim mt-3">{name}</h2>

					{/* TODO: Replace with logo asset when available */}
					<p className="mt-2 text-sm text-brand-dark-3">{logoTodo}</p>

					<p className="desc mt-6 wow fadeInUp" data-wow-delay=".2s">
						{shortDesc}
					</p>

					{parent ? (
						<p className="mt-4 wow fadeInUp" data-wow-delay=".25s">
							Part of{" "}
							<Link
								href={`/fk-group/${parent.slug}`}
								className="font-semibold text-brand hover:opacity-70"
							>
								{parent.name}
							</Link>
						</p>
					) : null}

					{relatedLinks.length ? (
						<div className="mt-8 wow fadeInUp" data-wow-delay=".3s">
							<h4 className="mb-4 font-semibold">Explore First Katalyst</h4>
							<ul className="m-0 flex list-none flex-wrap gap-3">
								{relatedLinks.map(link => (
									<li key={link.path}>
										<ButtonPrimary text={link.label} url={link.path} />
									</li>
								))}
							</ul>
						</div>
					) : null}

					{children.length ? (
						<div className="mt-10 wow fadeInUp" data-wow-delay=".35s">
							<h4 className="mb-4 font-semibold">Related entities</h4>
							<ul className="m-0 list-none">
								{children.map(child => (
									<li
										key={child.slug}
										className="border-b border-[#c9d1d1] py-3 first:pt-0"
									>
										<Link
											href={`/fk-group/${child.slug}`}
											className="inline-flex items-center gap-2 font-medium text-brand-dark hover:text-brand"
										>
											<i className="tji-arrow-right"></i>
											{child.name}
										</Link>
										<p className="m-0 mt-1 text-sm text-brand-dark-3">
											{child.shortDesc}
										</p>
									</li>
								))}
							</ul>
						</div>
					) : null}

					<div className="mt-10 wow fadeInUp" data-wow-delay=".4s">
						<ButtonPrimary text="Back to FKM Group" url="/fk-group" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default FkGroupDetails;
