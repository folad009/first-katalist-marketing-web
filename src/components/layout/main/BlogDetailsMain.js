import BlogDetailsPrimary from "@/components/sections/blogs/BlogDetailsPrimary";
import HeroInner from "@/components/sections/hero/HeroInner";
import getBlogCategories from "@/libs/getBlogCategories";
import getBlogs from "@/libs/getBlogs";
import getBlogTags from "@/libs/getBlogTags";
import getPreviousNextItem from "@/libs/getPreviousNextItem";

const BlogDetailsMain = async ({ currentSlug }) => {
	const [items, categories, tags] = await Promise.all([
		getBlogs(),
		getBlogCategories(),
		getBlogTags(),
	]);
	const option = getPreviousNextItem(items, currentSlug);
	const { title } = option?.currentItem || {};
	return (
		<div>
			<HeroInner
				title={"Blog Details"}
				text={title ? title : "Blog Details"}
				breadcrums={[{ name: "Blogs", path: "/blogs" }]}
			/>
			<BlogDetailsPrimary
				option={option}
				blogs={items}
				categories={categories}
				tags={tags}
			/>
		</div>
	);
};

export default BlogDetailsMain;
