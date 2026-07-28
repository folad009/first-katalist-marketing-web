"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	return (
		<div>
			<Link className="inline-block w-full max-w-34" href="/">
				<Image
					src="/images/logos/fk-logo.png"
					alt=""
					width={100}
					height={100}
					style={{ height: "auto" }}
				/>
			</Link>
		</div>
	);
};

export default Logo;
