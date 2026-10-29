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
		paragraphs = [],
		servicesTitle,
		services = [],
		closing,
		contact,
		color,
		logoTodo,
		parent,
		children = [],
		relatedLinks = [],
	} = entity;
	const phones = contact?.phones ?? [];
	const emails = contact?.emails ?? [];

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

					{logoTodo ? (
						<p className="mt-2 text-sm text-brand-dark-3">{logoTodo}</p>
					) : null}

					<p className="desc mt-6 wow fadeInUp" data-wow-delay=".2s">
						{shortDesc}
					</p>

					{paragraphs.map(paragraph => (
						<p key={paragraph} className="desc wow fadeInUp" data-wow-delay=".2s">
							{paragraph}
						</p>
					))}

					{services.length ? (
						<div className="mt-8 wow fadeInUp" data-wow-delay=".25s">
							<h3 className="mb-4 text-h5 font-semibold">{servicesTitle}</h3>
							<ul className="m-0 list-none">
								{services.map(service => (
									<li key={service.title} className="mb-3 flex gap-2">
										<span>
											<i className="tji-check"></i>
										</span>
										<span>
											<strong>{service.title}:</strong> {service.desc}
										</span>
									</li>
								))}
							</ul>
						</div>
					) : null}

					{closing ? (
						<p className="desc mt-6 wow fadeInUp" data-wow-delay=".3s">
							{closing}
						</p>
					) : null}

					{contact ? (
						<div className="mt-8 wow fadeInUp" data-wow-delay=".35s">
							<h3 className="mb-4 text-h5 font-semibold">Contact Us</h3>
							{contact.address ? <p className="m-0">{contact.address}</p> : null}
							{contact.locations ? (
								<p className="m-0">{contact.locations}</p>
							) : null}
							{phones.length ? (
								<p className="m-0 mt-2">
									{phones.map((phone, index) => (
										<span key={phone}>
											{index > 0 ? " | " : null}
											<a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
										</span>
									))}
								</p>
							) : null}
							{emails.length ? (
								<p className="m-0 mt-2">
									{emails.map((email, index) => (
										<span key={email}>
											{index > 0 ? " | " : null}
											<a href={`mailto:${email}`}>{email}</a>
										</span>
									))}
								</p>
							) : null}
						</div>
					) : null}

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
