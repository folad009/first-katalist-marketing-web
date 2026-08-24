import FunfactSingle from "@/components/shared/funfact/FunfactSingle";
import companyProfile from "../../../../public/fakedata/company-profile.json";

/** Homepage stats — PDF Facts + Regional Coverage only (no invented ROI). */
const Funfact1 = () => {
	const regionCount = companyProfile.regionalCoverage?.regions?.length || 5;

	const stats = [
		{
			value: 2012,
			symbol: "",
			label: "Year We Commenced Business",
		},
		{
			value: 45,
			symbol: "",
			label: "Skilled Employees",
		},
		{
			value: 2000,
			symbol: "+",
			label: "Field / Temporary Team Database",
		},
		{
			value: regionCount,
			symbol: "",
			label: "Coverage Regions — Pan Nigeria",
		},
	];

	return (
		<div className="tj-countup-section">
			<div className="tj-container">
				<div>
					<div>
						<div className="countup-wrap">
							{stats.map((stat, idx) => (
								<div className="countup-item" key={stat.label}>
									<FunfactSingle
										currentValue={stat.value}
										symbol={stat.symbol}
									/>
									<span className="count-text">{stat.label}</span>
									{idx < stats.length - 1 ? (
										<span
											className="count-separator"
											style={{
												backgroundImage:
													"url('/images/shape/separator.svg')",
											}}
										></span>
									) : null}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Funfact1;
