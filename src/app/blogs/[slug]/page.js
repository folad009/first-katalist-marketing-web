import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getBlogBySlug from "@/libs/getBlogBySlug";
import getBlogs from "@/libs/getBlogs";
import { DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { buildMetadataFromItem } from "@/lib/wordpress-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const post = await getBlogBySlug(slug);
	if (!post) return { title: "Blog Not Found" };
	return buildMetadataFromItem(post, {
		title: post.title,
		description: post.shortDesc || post.desc || DEFAULT_DESCRIPTION,
	});
}

export async function generateStaticParams() {
	const items = await getBlogs();
	return items.map(({ slug }) => ({ slug }));
}

export default async function BlogDetails({ params }) {
	const { slug } = await params;
	const post = await getBlogBySlug(slug);
	if (!post) {
		notFound();
	}
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<BlogDetailsMain currentSlug={slug} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
