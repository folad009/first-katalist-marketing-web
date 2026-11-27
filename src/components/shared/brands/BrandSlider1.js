"use client";

import getBrands from "@/libs/getBrands";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// `brands` comes from WordPress → Clients (see Brands1); the local list is
// used when it isn't passed.
const BrandSlider1 = ({ className, brands = getBrands() }) => {
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