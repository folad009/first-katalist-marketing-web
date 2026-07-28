import BlogCard1 from "@/components/shared/cards/BlogCard1";
import getBlogs from "@/libs/getBlogs";

const Blogs1 = async () => {
	const blogs = (await getBlogs()).slice(0, 3);
	return (
		<section className="tj-blog-section section-gap">
			<div className="tj-container">
				<div className="sec-heading text-center">
					<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
						<i className="tji-box"></i>Insights & Ideas
					</span>
					<h2 className="sec-title title-anim">
						The Ultimate <span>Resource.</span>
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
					{blogs?.length
						? blogs?.map((blog, idx) => (
								<div key={idx}>
									<BlogCard1 blog={blog} idx={idx} />
								</div>
						  ))
						: ""}
				</div>
			</div>
		</section>
	);
};

export default Blogs1;
