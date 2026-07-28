import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { withSlugs } from "@/lib/slugify";
import { mapPosts } from "@/lib/wordpress-mappers";
import { GET_POSTS } from "@/lib/wordpress-queries";
import { cache } from "react";
import blogs from "../../public/fakedata/blogs";

const getBlogs = cache(async () => {
	const items = await withWordPressFallback(async () => {
		const data = await fetchGraphQL(GET_POSTS, {
			tags: [REVALIDATE_TAGS.posts],
		});
		return mapPosts(data?.posts?.nodes ?? []);
	}, blogs);

	return withSlugs(items, "title");
});

export default getBlogs;
