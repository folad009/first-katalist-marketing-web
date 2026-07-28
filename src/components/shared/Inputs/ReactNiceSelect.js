"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

const ReactNiceSelect = ({
	options = [],
	selectedIndex = 0,
	getSelectedOption = () => {},
	className,
	name,
}) => {
	const [value, setValue] = useState(options[selectedIndex]?.value ?? "");

	useEffect(() => {
		const next = options[selectedIndex];
		if (next) {
			setValue(next.value);
		}
	}, [options, selectedIndex]);

	const handleChange = nextValue => {
		setValue(nextValue);
		const option = options.find(item => item.value === nextValue);
		if (option) {
			getSelectedOption(option);
		}
	};

	return (
		<Select value={value} onValueChange={handleChange} name={name}>
			<SelectTrigger
				className={cn(
					"tj-select-trigger nice-select orderby h-auto w-full min-w-0 rounded-none border-0 border-b border-dashed border-[#c9d1d1] bg-transparent px-0 py-2.75 text-base text-brand-dark-4 shadow-none focus-visible:border-brand-dark focus-visible:ring-0 data-[size=default]:h-auto [&>svg]:size-4 [&>svg]:opacity-100",
					className
				)}
			>
				<SelectValue placeholder={options[0]?.optionName ?? "Select"} />
			</SelectTrigger>
			<SelectContent className="rounded-lg border-[#c9d1d1] bg-white text-brand-dark">
				{options.map(option => (
					<SelectItem
						key={option.value}
						value={option.value}
						className="cursor-pointer px-5 py-2 text-brand-dark focus:bg-brand-bg focus:text-brand-dark"
					>
						{option.optionName}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default ReactNiceSelect;
