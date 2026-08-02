import BrandSlider1 from "@/components/shared/brands/BrandSlider1";

const Brands1 = ({ type = 1 }) => {
	return (
		<section
			className={`tj-client-section ${
				type === 2 ? "client-section-gap-2" : "client-section-gap"
			} wow fadeInUp`}
			data-wow-delay=".4s"
		>
			<div className="w-full overflow-hidden">
				<div className="client-content">
					<h5 className="sec-title">
						Our Clientele — Brands That Trust
						<span className="client-text"> First Katalyst Marketing</span>
					</h5>
				</div>
				<BrandSlider1 />
			</div>
		</section>
	);
};

export default Brands1;
