import {
	type SerializedEditorState,
	type SerializedLexicalNode,
} from "lexical";

interface PayloadRichTextProps {
	content: SerializedEditorState | null | undefined;
	className?: string;
}

/**
 * Renders Payload CMS Lexical rich text content as HTML.
 * This is a server component — no "use client" needed.
 */
export function PayloadRichText({ content, className }: PayloadRichTextProps) {
	if (!content?.root?.children) {
		return null;
	}

	return (
		<div className={className ?? "prose prose-lg max-w-none"}>
			{content.root.children.map((node, index) => (
				<RichTextNode key={index} node={node} />
			))}
		</div>
	);
}

function RichTextNode({ node }: { node: SerializedLexicalNode }) {
	const n = node as any;

	if (n.type === "paragraph") {
		return (
			<p>
				{n.children?.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</p>
		);
	}

	if (n.type === "heading") {
		const level = n.tag as number;
		const HeadingTag = level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : level === 4 ? "h4" : level === 5 ? "h5" : "h6";
		return (
			<HeadingTag>
				{n.children?.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</HeadingTag>
		);
	}

	if (n.type === "list") {
		const Tag = n.listType === "number" ? "ol" : "ul";
		return (
			<Tag>
				{n.children?.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</Tag>
		);
	}

	if (n.type === "listitem") {
		return (
			<li>
				{n.children?.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</li>
		);
	}

	if (n.type === "link") {
		const url = n.fields?.url || n.url || "#";
		const target = n.fields?.newTab ? "_blank" : undefined;
		return (
			<a href={url} target={target} rel={target ? "noopener noreferrer" : undefined}>
				{n.children?.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</a>
		);
	}

	if (n.type === "quote") {
		return (
			<blockquote>
				{n.children?.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</blockquote>
		);
	}

	if (n.type === "text") {
		let text: React.ReactNode = n.text ?? "";

		if (n.format & 1) text = <strong>{text}</strong>;
		if (n.format & 2) text = <em>{text}</em>;
		if (n.format & 8) text = <u>{text}</u>;
		if (n.format & 4) text = <s>{text}</s>;
		if (n.format & 16) text = <code>{text}</code>;

		return <>{text}</>;
	}

	if (n.type === "linebreak") {
		return <br />;
	}

	// Fallback: render children if present
	if (n.children) {
		return (
			<>
				{n.children.map((child: any, i: number) => (
					<RichTextNode key={i} node={child} />
				))}
			</>
		);
	}

	return null;
}

/**
 * Extracts plain text from Payload rich text content for use in excerpts.
 */
export function extractTextFromRichText(content: SerializedEditorState | null | undefined): string {
	if (!content?.root?.children) return "";

	const extractFromNode = (node: any): string => {
		if (node.type === "text") return node.text ?? "";
		if (node.children) return node.children.map(extractFromNode).join("");
		return "";
	};

	return content.root.children.map(extractFromNode).join(" ").trim();
}
