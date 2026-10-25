import getSiteImages from "@/libs/getSiteImages";
import CtaBanner from "@/components/sections/cta/CtaBanner";

const Cta = async () => {
	const { ctaImage } = await getSiteImages();

	return <CtaBanner image={ctaImage} />;
};

export default Cta;
