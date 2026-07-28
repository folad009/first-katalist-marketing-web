import countDataLength from "@/libs/countDataLength";
import filterItems from "@/libs/filterItems";
import makePath from "@/libs/makePath";
import modifyNumber from "@/libs/modifyNumber";
import Link from "next/link";

const BlogCategoriesWidget = ({ blogs = [], categories = [] }) => {
	return (
		<div className="tj-sidebar-widget widget-categories">
			<h4 className="widget-title">Categories</h4>
			<ul>
				{categories?.length
					? categories?.map((category, idx) => (
							<li key={idx}>
								<Link href={`/blogs?category=${makePath(category)}`}>
									{category}{" "}
									<span className="number">
										(
										{modifyNumber(
											countDataLength(
												filterItems(blogs, "category", makePath(category))
											)
										)}
										)
									</span>
								</Link>{" "}
							</li>
					  ))
					: ""}
			</ul>
		</div>
	);
};

export default BlogCategoriesWidget;
