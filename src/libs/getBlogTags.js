import { fetchGraphQL, REVALIDATE_TAGS } from "@/lib/wordpress";
import { withWordPressFallback } from "@/lib/wordpress-fallback";
import { mapPosts, mapTagNames } from "@/lib/wordpress-mappers";
import { GET_POSTS, GET_TAGS } from "@/lib/wordpress-queries";
import { cache } from "react";
import blogTags from "../../public/fakedata/blog-tags";

const getBlogTags = cache(async () => {
	return withWordPressFallback(async () => {
		try {
			const data = await fetchGraphQL(GET_TAGS, {
				tags: [REVALIDATE_TAGS.posts],
			});
			const names = mapTagNames(data?.tags?.nodes ?? []);
			if (names.length) return names;
		} catch {
			// fall through to derive from posts
		}

		const postsData = await fetchGraphQL(GET_POSTS, {
			tags: [REVALIDATE_TAGS.posts],
		});
		const posts = mapPosts(postsData?.posts?.nodes ?? []);
		return [...new Set(posts.flatMap(post => post.tags ?? []))];
	}, blogTags);
});

export default getBlogTags;
