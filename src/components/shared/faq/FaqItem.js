"use client";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/libs/utils";

const FaqItem = ({ item = {}, idx, className, ...props }) => {
	const { title, desc } = item;

	return (
		<AccordionItem
			value={`faq-${idx + 1}`}
			className={cn("accordion-item border-0", className)}
			{...props}
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

export default FaqItem;
