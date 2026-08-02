"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FaqItem from "@/components/shared/faq/FaqItem";
import { Accordion } from "@/components/ui/accordion";
import faqs from "../../../../public/fakedata/faqs.json";
import Image from "next/image";
import Link from "next/link";

const Faq2 = ({ type = 1 }) => {
	const items = faqs;

	const defaultOpen = items.findIndex(item => item.initActive);
	const defaultValue =
		defaultOpen >= 0 ? `faq-${defaultOpen + 1}` : undefined;

	return (
		<section
			className={`tj-faq-section section-gap  ${
				type === 3 || type === 4 ? "" : "tj-arrange-container-2"
			}`}
		>
			<div className="tj-container">
				<div className="grid grid-cols-12 gap-x-6">
					{type === 3 ? (
						<div className="col-span-12 lg:col-span-4">
							<div className="content-wrap">
								<div className="sec-heading">
									<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
										<i className="tji-box"></i>Common Questions
									</span>
									<h2 className="sec-title title-anim">
										Need <span>Help?</span> Start Here...
									</h2>
								</div>
								<p className="desc wow fadeInUp" data-wow-delay=".6s">
									Answers about First Katalyst Marketing —
									activations, trade, HR outsourcing, digital,
									events, and more.
								</p>
								<div className="wow fadeInUp" data-wow-delay=".8s">
									<ButtonPrimary text={"Send Us a Brief"} url={"/contact"} />
								</div>
							</div>
						</div>
					) : (
						<div className="col-span-12 lg:col-span-6">
							<div
								className={`faq-img-area ${
									type === 3 ? "" : "tj-arrange-item-2"
								}`}
							>
								<div className="faq-img overflow-hidden">
									<Image
										src="/images/faq/faq.webp"
										alt="First Katalyst Marketing FAQ"
										width={585}
										height={629}
									/>
									<h2 className={`title ${type === 4 ? "title-anim" : ""}`}>
										Need Help? Start Here...
									</h2>
								</div>
								<div className="box-area ">
									<div className="call-box">
										<h4 className="title">Prefer to talk?</h4>
										<span className="call-icon">
											<i className="tji-phone"></i>
										</span>
										<Link className="number" href="tel:+2348092900214">
											<span>+234 809 290 0214</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					)}

					<div
						className={`col-span-12 ${
							type === 3 ? "lg:col-span-8" : "lg:col-span-6"
						}`}
					>
						<Accordion
							type="single"
							collapsible
							defaultValue={defaultValue}
							className={`tj-faq ${
								type === 2 || type === 4 ? "style-2" : ""
							} ${type === 3 || type === 4 ? "" : "tj-arrange-item-2"}`}
						>
							{items?.length
								? items?.map((item, idx) => (
										<FaqItem key={idx} item={item} idx={idx} />
								  ))
								: ""}
						</Accordion>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq2;
