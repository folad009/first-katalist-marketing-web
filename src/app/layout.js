import DraftModeBanner from "@/components/shared/preview/DraftModeBanner";
import { Toaster } from "@/components/ui/sonner";
import { rootMetadata } from "@/lib/site-seo";
import getSiteImages from "@/libs/getSiteImages";
import { Mona_Sans } from "next/font/google";
import "react-range-slider-input/dist/style.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./tailwind.css";
import "./assets/css/animate.min.css";
import "./assets/css/bexon-icons.css";
import "./assets/css/font-awesome-pro.min.css";
import "./assets/css/glightbox.min.css";
import "./assets/css/odometer-theme-default.css";
import "./globals.scss";

const bodyFont = Mona_Sans({
	variable: "--tj-ff-body",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	display: "swap",
});
const headingFont = Mona_Sans({
	variable: "--tj-ff-heading",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	display: "swap",
});

export const metadata = rootMetadata;

export default async function RootLayout({ children }) {
	// Page header banner from WordPress → Pages → Site Images (falls back to the local file).
	const { contactBanner } = await getSiteImages();

	return (
		<html lang="en" data-scroll-behavior="smooth" dir="ltr">
			<body
				className={`${bodyFont.variable} ${headingFont.variable}`}
				style={{ "--fkm-page-header-bg": `url(${JSON.stringify(contactBanner)})` }}
			>
				<DraftModeBanner />
				{children}
				<Toaster />
			</body>
		</html>
	);
}
