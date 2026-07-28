"use client";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/libs/utils";

const FaqItem2 = ({ item = {}, idx, className }) => {
	const { title, desc } = item;

	return (
		<AccordionItem
			value={`faq-1-${idx + 1}`}
			className={cn(
				"accordion-item active border-0 wow fadeInUp",
				className
			)}
			data-wow-delay=".3s"
		>
			<AccordionTrigger
				showIcon={false}
				className="faq-title rounded-none py-0 text-left text-h6 font-semibold hover:no-underline focus-visible:ring-0"
			>
				{title}
			</AccordionTrigger>
			<AccordionContent className="accordion-body faq-text mt-3.75 p-0 pb-6.25 text-base">
				<p>{desc}</p>
			</AccordionContent>
		</AccordionItem>
	);
};

export default FaqItem2;
