import { sanitizeHtml } from "@/lib/sanitize-html";
import { cn } from "@/libs/utils";

const WordPressContent = ({ html, className }) => {
	const clean = sanitizeHtml(html);
	if (!clean) return null;

	return (
		<div
			className={cn(
				"prose prose-lg max-w-none",
				"prose-headings:font-heading prose-headings:text-brand-dark prose-headings:font-semibold",
				"prose-p:text-brand-dark-3 prose-p:leading-relaxed",
				"prose-a:text-brand prose-a:no-underline hover:prose-a:underline",
				"prose-strong:text-brand-dark",
				"prose-blockquote:border-brand prose-blockquote:text-brand-dark-4",
				"prose-li:text-brand-dark-3",
				"prose-img:rounded-lg",
				className
			)}
			dangerouslySetInnerHTML={{ __html: clean }}
		/>
	);
};

export default WordPressContent;
