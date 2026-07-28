import getBlogs from "@/libs/getBlogs";
import { isDraftModeEnabled } from "@/lib/wordpress-preview";
import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapPosts } from "@/lib/wordpress-mappers";
import { GET_POST_BY_SLUG } from "@/lib/wordpress-queries";
import { cache } from "react";

const getBlogBySlug = cache(async slug => {
	if (!slug) return null;

	const isPreview = await isDraftModeEnabled();

	if (!isPreview) {
		const blogs = await getBlogs();
		const fromList = blogs.find(blog => blog.slug === slug);
		if (fromList) return fromList;
	}

	return withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_POST_BY_SLUG, {
			variables: { slug, preview: isPreview },
			tags: [REVALIDATE_TAGS.posts],
			preview: isPreview,
		});
		if (!data?.post) return null;
		return mapPosts([data.post])[0] ?? null;
	}, null);
});

export default getBlogBySlug;
