"use client";
import BlogSingle from "@/components/shared/blogs/BlogSingle";
import Paginations from "@/components/shared/others/Paginations";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import usePagination from "@/hooks/usePagination";
import { useEffect } from "react";

const BlogsPrimary = ({
	filteredItems,
	blogs = [],
	categories = [],
	tags = [],
}) => {
	const items = [...filteredItems];
	const limit = 3;
	// get pagination details
	const {
		currentItems,
		currentpage,
		setCurrentpage,
		paginationItems,
		currentPaginationItems,
		totalPages,
		handleCurrentPage,
		firstItem,
		lastItem,
	} = usePagination(items, limit);
	const totalItems = items?.length;
	const totalItemsToShow = currentItems?.length;
	useEffect(() => {
		setCurrentpage(0);
	}, [totalItems, setCurrentpage]);
	return (
		<section className="tj-blog-section section-gap">
			<div className="tj-container">
				<div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<div className="blog-post-wrapper">
							{currentItems?.length
								? currentItems?.map((blog, idx) => (
										<BlogSingle key={idx} blog={blog} idx={idx} />
								  ))
								: ""}

							{/* <!-- pagination --> */}
							{totalItemsToShow < totalItems ? (
								<Paginations
									paginationDetails={{
										currentItems,
										currentpage,
										setCurrentpage,
										paginationItems,
										currentPaginationItems,
										totalPages,
										handleCurrentPage,
										firstItem,
										lastItem,
									}}
									type={2}
								/>
							) : (
								""
							)}
						</div>
					</div>
					<div className="lg:col-span-4">
						<BlogSidebar
							type={1}
							blogs={blogs}
							categories={categories}
							tags={tags}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BlogsPrimary;
