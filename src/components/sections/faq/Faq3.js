"use client";

import FaqItem2 from "@/components/shared/faq/FaqItem2";
import { Accordion } from "@/components/ui/accordion";

const Faq3 = () => {
	const items = [
		{
			title: "What services does Bexon offer to clients?",
			desc: "	Getting started is easy! Simply reach out to us through our contact form or give us a call, and we’ll schedule a consultation to discuss your project and how we can best assist you. Our team keeps you informed throughout the process, ensuring quality control and timely delivery.",
			initActive: true,
		},
		{
			title: "How do I get started with Corporate Business?",
			desc: "	Getting started is easy! Simply reach out to us through our contact form or give us a call, and we’ll schedule a consultation to discuss your project and how we can best assist you. Our team keeps you informed throughout the process, ensuring quality control and timely delivery.",
			initActive: false,
		},
		{
			title: "How do you ensure the success of a project?",
			desc: "	Getting started is easy! Simply reach out to us through our contact form or give us a call, and we’ll schedule a consultation to discuss your project and how we can best assist you. Our team keeps you informed throughout the process, ensuring quality control and timely delivery.",
			initActive: false,
		},
		{
			title: "How long will it take to complete my project?",
			desc: "	Getting started is easy! Simply reach out to us through our contact form or give us a call, and we’ll schedule a consultation to discuss your project and how we can best assist you. Our team keeps you informed throughout the process, ensuring quality control and timely delivery.",
			initActive: false,
		},
		{
			title: "Can I track the progress of my project?",
			desc: "	Getting started is easy! Simply reach out to us through our contact form or give us a call, and we’ll schedule a consultation to discuss your project and how we can best assist you. Our team keeps you informed throughout the process, ensuring quality control and timely delivery.",
			initActive: false,
		},
	];

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
