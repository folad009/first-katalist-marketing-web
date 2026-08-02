"use client";

import FaqItem2 from "@/components/shared/faq/FaqItem2";
import { Accordion } from "@/components/ui/accordion";
import faqs from "../../../../public/fakedata/faqs.json";

const Faq3 = () => {
	const items = faqs;

	const defaultOpen = items.findIndex(item => item.initActive);
	const defaultValue =
		defaultOpen >= 0 ? `faq-1-${defaultOpen + 1}` : undefined;

	return (
		<section className="tj-faq-section section-gap section-separator">
			<div className="tj-container">
				<div className="sec-heading text-center">
					<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
						<i className="tji-box"></i>Common Questions
					</span>
					<h2 className="sec-title title-anim">
						Need <span>Help?</span> Start Here...
					</h2>
				</div>
				<div className="flex justify-center">
					<div className="w-full lg:w-2/3">
						<Accordion
							type="single"
							collapsible
							defaultValue={defaultValue}
							className="tj-faq pt-0"
						>
							{items?.length
								? items?.map((item, idx) => (
										<FaqItem2 key={idx} item={item} idx={idx} />
								  ))
								: ""}
						</Accordion>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq3;
