import FunfactSingle from "@/components/shared/funfact/FunfactSingle";
const Funfact1 = () => {
	return (
		<div className="tj-countup-section">
			<div className="tj-container">
				<div>
					<div>
						<div className="countup-wrap">
							<div className="countup-item">
								<FunfactSingle currentValue={2012} symbol={""} />

								<span className="count-text">Year We Commenced Business</span>
								<span
									className="count-separator"
									style={{
										backgroundImage: "url('/images/shape/separator.svg')",
									}}
								></span>
							</div>
							<div className="countup-item">
								<FunfactSingle currentValue={8} symbol={"B"} />
								<span className="count-text">Naira Revenue in 6 Months*</span>
								<span
									className="count-separator"
									style={{
										backgroundImage: "url('/images/shape/separator.svg')",
									}}
								></span>
							</div>
							<div className="countup-item">
								<FunfactSingle currentValue={70} symbol={"%"} />
								<span className="count-text">Shopping Decisions at POP*</span>
								<span
									className="count-separator"
									style={{
										backgroundImage: "url('/images/shape/separator.svg')",
									}}
								></span>
							</div>
							<div className="countup-item">
								<FunfactSingle currentValue={4} symbol={""} />
								<span className="count-text">Regional Subsidiaries</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Funfact1;
