import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import FkGroupDetails from "@/components/sections/fk-group/FkGroupDetails";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/lib/site-seo";
import getFkGroup from "@/libs/getFkGroup";
import getFkGroupBySlug from "@/libs/getFkGroupBySlug";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const entity = await getFkGroupBySlug(slug);
	if (!entity) return { title: "FKM Group Entity Not Found" };
	return pageMetadata({
		title: entity.name,
		description: `${entity.name} — part of FKM Group. ${entity.shortDesc}`,
	});
}

export async function generateStaticParams() {
	const entities = await getFkGroup();
	return entities.map(({ slug }) => ({ slug }));
}

export default async function FkGroupEntityPage({ params }) {
	const { slug } = await params;
	const entity = await getFkGroupBySlug(slug);
	if (!entity) notFound();

	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title={entity.name}
							text={entity.name}
							breadcrums={[
								{ name: "FKM Group", path: "/fk-group" },
								...(entity.parent
									? [
											{
												name: entity.parent.name,
												path: `/fk-group/${entity.parent.slug}`,
											},
										]
									: []),
							]}
						/>
						<FkGroupDetails entity={entity} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
