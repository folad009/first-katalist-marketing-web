"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

/** Site logo; `compact` shrinks it for the slimmer sticky header. */
const Logo = ({ compact = false }) => {
	return (
		<div>
			<Link className="inline-block w-full max-w-40" href="/">
				<Image
					src="/images/logos/fkmarketing-logo.png"
					alt="First Katalyst Marketing"
					width={100}
					height={69}
					className={cn("transition-all duration-300", compact ? "w-18" : "w-25")}
					style={{ height: "auto" }}
				/>
			</Link>
		</div>
	);
};

export default Logo;
