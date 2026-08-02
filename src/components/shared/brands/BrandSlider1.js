"use client";

import getBrands from "@/libs/getBrands";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BrandSlider1 = ({ className }) => {
	const brands = getBrands();
	return (
		<Swiper
			slidesPerView="auto"
			spaceBetween={0}
			freeMode={true}
			centeredSlides={true}
			loop={true}
			speed={5000}
			allowTouchMove={false}
			autoplay={{
				delay: 1,
				disableOnInteraction: false,
			}}
			className={`client-slider ${className ? className : "client-slider-1"}`}
			modules={[Autoplay]}
		>
			{brands?.length
				? brands?.map(({ img, name }, idx) => (
						<SwiperSlide key={name ? `${name}-${idx}` : idx} className="client-item">
							<div className="client-logo">
								{/* TODO: imageTodo in brands.json — temporary local brand-* assets until FKM logos are licensed/added */}
								<img
									src={img ? img : "/images/brands/brand-1.webp"}
									alt={name ? name : "Client brand"}
								/>
							</div>
						</SwiperSlide>
				  ))
				: ""}
		</Swiper>
	);
};

export default BrandSlider1;
