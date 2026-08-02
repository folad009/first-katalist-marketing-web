"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ReactNiceSelect from "@/components/shared/Inputs/ReactNiceSelect";
import { notify } from "@/libs/notify";
import Link from "next/link";

const Contact2 = () => {
	const handleSubmit = event => {
		event.preventDefault();
		notify.success(
			"Message sent successfully!",
			"Thanks for reaching out — we’ll get back to you soon."
		);
		event.currentTarget.reset();
	};

	return (
		<section className="tj-contact-section section-gap section-gap-x">
			<div className="tj-container">
				<div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
					<div>
						<div className="global-map wow fadeInUp" data-wow-delay=".3s">
							<div className="global-map-img">
								<img src="/images/bg/map.svg" alt="Image" />
								<div className="location-indicator loc-1">
									<div className="location-tooltip">
										<span>Head office:</span>
										<p>
											19b Alhaji Bankole Street, Off Adeniyi Jones, Ikeja,
											Lagos.
										</p>
										<Link href="tel:+2348092900214">
											P: +234 809 290 0214
										</Link>
										<Link href="mailto:outsourcing@firstkatalystmarketing.com">
											M: outsourcing@firstkatalystmarketing.com
										</Link>
									</div>
								</div>
								<div className="location-indicator loc-2">
									<div className="location-tooltip">
										<span>Subsidiary:</span>
										<p>FK Ghana — TODO: Confirm local address with FKM.</p>
										<Link href="tel:+2348092900214">
											P: +234 809 290 0214
										</Link>
										<Link href="mailto:outsourcing@firstkatalystmarketing.com">
											M: outsourcing@firstkatalystmarketing.com
										</Link>
									</div>
								</div>
								<div className="location-indicator loc-3">
									<div className="location-tooltip">
										<span>Subsidiary:</span>
										<p>
											FK Benin Republic — TODO: Confirm local address with FKM.
										</p>
										<Link href="tel:+2348092900214">
											P: +234 809 290 0214
										</Link>
										<Link href="mailto:outsourcing@firstkatalystmarketing.com">
											M: outsourcing@firstkatalystmarketing.com
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div
							className="contact-form style-2 wow fadeInUp"
							data-wow-delay=".4s"
						>
							<div className="sec-heading">
								<span className="sub-title text-white">
									<i className="tji-box"></i>Get in Touch
								</span>
								<h2 className="sec-title title-anim">
									Drop Us a <span>Line.</span>
								</h2>
							</div>
							<form id="contact-form-2" onSubmit={handleSubmit}>
								<div
									className="wow fadeInUp grid grid-cols-1 gap-x-6 sm:grid-cols-2"
									data-wow-delay=".5s"
								>
									<div>
										<div className="form-input">
											<input
												type="text"
												name="cfName2"
												placeholder="Full Name *"
												required
											/>
										</div>
									</div>
									<div>
										<div className="form-input">
											<input
												type="email"
												name="cfEmail2"
												placeholder="Email Address *"
												required
											/>
										</div>
									</div>
									<div>
										<div className="form-input">
											<input
												type="tel"
												name="cfPhone2"
												placeholder="Phone number *"
												required
											/>
										</div>
									</div>
									<div>
										<div className="form-input">
											<div className="tj-nice-select-box">
												<div className="tj-select">
													<ReactNiceSelect
														selectedIndex={0}
														options={[
															{ value: "0", optionName: "Chose a option" },
															{ value: "1", optionName: "Business Strategy" },
															{ value: "2", optionName: "Customer Experience" },
															{
																value: "3",
																optionName: "Sustainability and ESG",
															},
															{
																value: "4",
																optionName: "Training and Development",
															},
															{
																value: "5",
																optionName: "IT Support & Maintenance",
															},
															{
																value: "6",
																optionName: "Marketing Strategy",
															},
														]}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="sm:col-span-2">
										<div className="form-input message-input">
											<textarea
												name="cfMessage2"
												id="message"
												placeholder="Type message *"
												required
											></textarea>
										</div>
									</div>
									<div className="submit-btn sm:col-span-2">
										<ButtonPrimary text={"Send Message"} type={"submit"} />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</section>
	);
};

export default Contact2;
