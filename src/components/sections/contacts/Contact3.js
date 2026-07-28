"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ReactNiceSelect from "@/components/shared/Inputs/ReactNiceSelect";
import { notify } from "@/libs/notify";

const Contact3 = () => {
	const handleSubmit = event => {
		event.preventDefault();
		notify.success(
			"Message sent successfully!",
			"Thanks for reaching out — we'll get back to you soon."
		);
		event.currentTarget.reset();
	};

	return (
		<section className="tj-contact-section-2 section-bottom-gap">
			<div className="tj-container">
				<div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
					<div>
						<div className="contact-form wow fadeInUp" data-wow-delay=".1s">
							<h3 className="title">
								Feel Free to Get in Touch or Visit our Location.
							</h3>
							<form id="contact-form" onSubmit={handleSubmit}>
								<div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
									<div>
										<div className="form-input">
											<input
												type="text"
												name="cfName"
												placeholder="Full Name*"
												required
											/>
										</div>
									</div>
									<div>
										<div className="form-input">
											<input
												type="email"
												name="cfEmail"
												placeholder="Email Address*"
												required
											/>
										</div>
									</div>
									<div>
										<div className="form-input">
											<input
												type="tel"
												name="cfPhone"
												placeholder="Phone number*"
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
												name="cfMessage"
												id="message"
												placeholder="Type message*"
												required
											></textarea>
										</div>
									</div>
									<div className="submit-btn sm:col-span-2">
										<ButtonPrimary type={"submit"} text={"Submit Now"} />
									</div>
								</div>
							</form>
						</div>
					</div>
					<div>
						<div className="map-area wow fadeInUp" data-wow-delay=".3s">
							<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d316440.5712687838!2d-74.01091796224334!3d40.67186885683901!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1745918398047!5m2!1sen!2sbd"></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact3;
