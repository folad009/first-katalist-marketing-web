import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import {
	mapCategoryNames,
	mapPosts,
} from "@/lib/wordpress-mappers";
import { GET_CATEGORIES, GET_POSTS } from "@/lib/wordpress-queries";
import { cache } from "react";
import blogCategories from "../../public/fakedata/blog-categories";

const getBlogCategories = cache(async () => {
	return withWordPressFallback(async () => {
		try {
			const data = await fetchGraphQL(GET_CATEGORIES, {
				tags: [REVALIDATE_TAGS.posts],
			});
			const names = mapCategoryNames(data?.categories?.nodes ?? []);
			if (names.length) return names;
		} catch {
			// fall through to derive from posts
		}

		const postsData = await fetchGraphQL(GET_POSTS, {
			tags: [REVALIDATE_TAGS.posts],
		});
		const posts = mapPosts(postsData?.posts?.nodes ?? []);
		return [...new Set(posts.map(post => post.category).filter(Boolean))];
	}, blogCategories);
});

export default getBlogCategories;
