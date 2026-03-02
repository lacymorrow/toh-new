import { ArrowLeft, Calendar, Share2, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PayloadRichText, extractTextFromRichText } from "@/components/town/payload-rich-text";
import { RelatedNews } from "@/components/town/news/related-news";
import { Button } from "@/components/ui/button";
import { getNewsBySlug, incrementNewsViewCount } from "@/lib/payload/town-data";

interface NewsArticlePageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
	const article = await getNewsBySlug(params.slug);

	if (!article) {
		return {
			title: "Article Not Found",
		};
	}

	const description =
		(article.excerpt as string) ||
		extractTextFromRichText(article.content as any)?.substring(0, 160) ||
		"";

	return {
		title: article.title,
		description,
		openGraph: {
			title: article.title,
			description,
			type: "article",
			publishedTime: article.publishedAt
				? new Date(article.publishedAt).toISOString()
				: undefined,
			authors: article.author
				? [typeof article.author === "object" ? ((article.author as { name?: string }).name ?? String(article.author)) : String(article.author)]
				: undefined,
		},
	};
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
	const article = await getNewsBySlug(params.slug);

	if (!article) {
		notFound();
	}

	// Increment view count
	await incrementNewsViewCount(article.id as number, (article.viewCount as number) || 0);

	const featuredImage =
		typeof article.featuredImage === "string"
			? article.featuredImage
			: (article.featuredImage as any)?.url ?? null;

	return (
		<article className="min-h-screen bg-white">
			{/* Article Header */}
			<div className="bg-cream border-b">
				<div className="container mx-auto px-4 py-8">
					{/* Breadcrumb */}
					<nav className="flex items-center gap-2 text-sm text-[#4A4640] mb-6">
						<Link href="/" className="hover:text-sage-dark">
							Home
						</Link>
						<span>/</span>
						<Link href="/news" className="hover:text-sage-dark">
							News
						</Link>
						<span>/</span>
						<span className="text-[#2D2A24]">{article.title}</span>
					</nav>

					{/* Title and Meta */}
					<h1 className="text-4xl font-bold text-[#2D2A24] mb-4">{article.title}</h1>

					<div className="flex flex-wrap items-center gap-4 text-sm text-[#4A4640]">
						{article.publishedAt && (
							<div className="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								{new Date(article.publishedAt).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</div>
						)}

						{article.author && (
							<div className="flex items-center gap-1">
								<User className="h-4 w-4" />
								{typeof article.author === "object"
									? ((article.author as { name?: string }).name ?? "Unknown")
									: String(article.author)}
							</div>
						)}

						{article.categories && (article.categories as string[]).length > 0 && (
							<div className="flex gap-2">
								{(article.categories as string[]).map((category) => (
									<span
										key={category}
										className="bg-stone text-sage-dark px-2 py-1 rounded-full text-xs"
									>
										{category}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Article Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Featured Image */}
						{featuredImage && (
							<div className="mb-8">
								<img
									src={featuredImage}
									alt={article.title}
									className="w-full rounded-lg"
								/>
							</div>
						)}

						{/* Article Body */}
						<PayloadRichText
							content={article.content as any}
							className="prose prose-lg max-w-none"
						/>

						{/* Tags */}
						{article.tags && (article.tags as string[]).length > 0 && (
							<div className="mt-8 pt-8 border-t">
								<h3 className="text-sm font-semibold text-[#2D2A24] mb-3">Tags</h3>
								<div className="flex flex-wrap gap-2">
									{(article.tags as string[]).map((tag) => (
										<Link
											key={tag}
											href={`/news?tag=${encodeURIComponent(tag)}`}
											className="bg-stone hover:bg-stone px-3 py-1 rounded-full text-sm text-[#4A4640] transition-colors"
										>
											#{tag}
										</Link>
									))}
								</div>
							</div>
						)}

						{/* Share Section */}
						<div className="mt-8 pt-8 border-t">
							<div className="flex items-center justify-between">
								<Button asChild variant="outline">
									<Link href="/news">
										<ArrowLeft className="h-4 w-4 mr-2" />
										Back to News
									</Link>
								</Button>

								<Button variant="outline">
									<Share2 className="h-4 w-4 mr-2" />
									Share
								</Button>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<RelatedNews currentArticleId={article.id as number} categories={article.categories as string[]} />
					</div>
				</div>
			</div>
		</article>
	);
}
