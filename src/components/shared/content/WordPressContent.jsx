"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { sanitizeHtmlServer } from "@/lib/sanitize-html";
import { cn } from "@/libs/utils";

const ALLOWED_CONFIG = {
	ALLOWED_TAGS: [
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"p",
		"br",
		"hr",
		"ul",
		"ol",
		"li",
		"blockquote",
		"pre",
		"code",
		"em",
		"strong",
		"sub",
		"sup",
		"a",
		"img",
		"figure",
		"figcaption",
		"table",
		"thead",
		"tbody",
		"tr",
		"th",
		"td",
		"div",
		"span",
		"iframe",
	],
	ALLOWED_ATTR: [
		"href",
		"target",
		"rel",
		"src",
		"alt",
		"title",
		"width",
		"height",
		"class",
		"id",
		"loading",
		"allow",
		"allowfullscreen",
		"frameborder",
	],
	ALLOW_DATA_ATTR: false,
};

const WordPressContent = ({ html, className }) => {
	const [clean, setClean] = useState(() => sanitizeHtmlServer(html));

	useEffect(() => {
		setClean(DOMPurify.sanitize(html || "", ALLOWED_CONFIG));
	}, [html]);

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
