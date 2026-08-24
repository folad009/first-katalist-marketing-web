import companyProfile from "../../../../public/fakedata/company-profile.json";

const CoverageCapabilities = () => {
	const { regionalCoverage, fieldStructure } = companyProfile;

	return (
		<section className="tj-choose-section section-gap">
			<div className="tj-container">
				<div className="sec-heading text-center">
					<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
						<i className="tji-box"></i>
						{regionalCoverage.capabilitiesTitle}
					</span>
					<h2 className="sec-title title-anim">
						{regionalCoverage.sectionTitle.split(" ")[0]}{" "}
						<span>{regionalCoverage.sectionTitle.split(" ").slice(1).join(" ")}</span>
					</h2>
				</div>

				<ul className="list-none mb-10 grid grid-cols-1 gap-3 md:grid-cols-3">
					{regionalCoverage.intro.map(item => (
						<li
							key={item}
							className="wow fadeInUp choose-box"
							data-wow-delay=".3s"
						>
							<div className="choose-content">
								<p className="desc">{item}</p>
							</div>
						</li>
					))}
				</ul>

				<p className="mb-8 text-center desc wow fadeInUp" data-wow-delay=".35s">
					{regionalCoverage.fieldOperativesNote}
				</p>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{regionalCoverage.regions.map((region, idx) => (
						<div
							key={region.name}
							className="wow fadeInUp choose-box"
							data-wow-delay={`${0.2 + idx * 0.1}s`}
						>
							<div className="choose-content">
								<h4 className="title">{region.name}</h4>
								<p className="desc">{region.cities.join(", ")}</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-16">
					<div className="sec-heading text-center">
						<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
							<i className="tji-box"></i>Field Force
						</span>
						<h2 className="sec-title title-anim wow fadeInUp" data-wow-delay=".35s">
							{fieldStructure.sectionTitle}
						</h2>
						<p className="desc wow fadeInUp" data-wow-delay=".4s">
							{fieldStructure.summary}
						</p>
					</div>

					{/* Text hierarchy from PDF — visual org chart asset TODO */}
					<div
						className="mx-auto mt-10 max-w-4xl wow fadeInUp"
						data-wow-delay=".45s"
						aria-label="Regional field structure hierarchy"
					>
						<div className="choose-box mb-4 text-center">
							<div className="choose-content">
								<h4 className="title">{fieldStructure.topRole}</h4>
							</div>
						</div>
						<p className="mb-4 text-center text-sm opacity-60" aria-hidden="true">
							↓
						</p>
						<div className="choose-box mb-6 text-center">
							<div className="choose-content">
								<h4 className="title">{fieldStructure.supportRole}</h4>
							</div>
						</div>
						<p className="mb-6 text-center text-sm opacity-60" aria-hidden="true">
							↓
						</p>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{fieldStructure.regions.map(branch => (
								<div key={branch.name} className="choose-box">
									<div className="choose-content">
										<h4 className="title mb-3">{branch.name}</h4>
										<ul className="list-none space-y-2 text-left">
											{branch.levels.map((level, levelIdx) => (
												<li key={level} className="desc">
													{levelIdx > 0 ? (
														<span className="mr-1 opacity-50" aria-hidden="true">
															→
														</span>
													) : null}
													{level}
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
						{/* Visual org chart asset: fieldStructure.diagramTodo */}
						<p className="mt-6 text-center text-sm opacity-70">
							Visual org chart: TODO — design asset pending (do not hotlink).
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CoverageCapabilities;
