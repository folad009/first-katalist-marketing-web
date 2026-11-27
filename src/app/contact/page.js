import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Contact3 from "@/components/sections/contacts/Contact3";
import ContactTop from "@/components/sections/contacts/ContactTop";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";

export const metadata = pageMetadata({
	title: "Contact Us",
	description:
		"Contact First Katalyst Marketing Limited — 19b Alhaji Bankole Crescent, Off Adeniyi Jones, Ikeja, Lagos. Call +234 809 290 0214 or email outsourcing@firstkatalystmarketing.com.",
});

export default function Contact() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner banner="contact" title={"Contact Us"} text={"Contact Us"} />
						<ContactTop />
						<Contact3 />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
