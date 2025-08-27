import { eq } from "drizzle-orm";
import { ArrowLeft, Calendar, Share2, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/town/mdx-content";
import { RelatedNews } from "@/components/town/news/related-news";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { news } from "@/server/db/schema-town";

interface NewsArticlePageProps {
	params: {
		slug: string;
	};
}

async function getArticle(slug: string) {
	if (!db) return null;

	const articles = await db.select().from(news).where(eq(news.slug, slug)).limit(1);

	return articles[0] || null;
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
	const article = await getArticle(params.slug);

	if (!article) {
		return {
			title: "Article Not Found",
		};
	}

	return {
		title: article.title,
		description: article.excerpt || article.content.substring(0, 160),
		openGraph: {
			title: article.title,
			description: article.excerpt || article.content.substring(0, 160),
			type: "article",
			publishedTime: article.publishedAt?.toISOString(),
			authors: article.author ? [article.author] : undefined,
		},
	};
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
	const article = await getArticle(params.slug);

	if (!article) {
		notFound();
	}

	// Increment view count
	if (db) {
		await db
			.update(news)
			.set({ viewCount: (article.viewCount || 0) + 1 })
			.where(eq(news.id, article.id));
	}

	return (
		<article className="min-h-screen bg-white">
			{/* Article Header */}
			<div className="bg-gray-50 border-b">
				<div className="container mx-auto px-4 py-8">
					{/* Breadcrumb */}
					<nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
						<Link href="/" className="hover:text-blue-600">
							Home
						</Link>
						<span>/</span>
						<Link href="/news" className="hover:text-blue-600">
							News
						</Link>
						<span>/</span>
						<span className="text-gray-900">{article.title}</span>
					</nav>

					{/* Title and Meta */}
					<h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

					<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
								{article.author}
							</div>
						)}

						{article.categories && article.categories.length > 0 && (
							<div className="flex gap-2">
								{article.categories.map((category) => (
									<span
										key={category}
										className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
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
						{article.featuredImage && (
							<div className="mb-8">
								<img
									src={article.featuredImage}
									alt={article.title}
									className="w-full rounded-lg"
								/>
							</div>
						)}

						{/* Article Body */}
						<div className="prose prose-lg max-w-none">
							<MDXContent content={article.content} />
						</div>

						{/* Tags */}
						{article.tags && article.tags.length > 0 && (
							<div className="mt-8 pt-8 border-t">
								<h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
								<div className="flex flex-wrap gap-2">
									{article.tags.map((tag) => (
										<Link
											key={tag}
											href={`/news?tag=${encodeURIComponent(tag)}`}
											className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 transition-colors"
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
						<RelatedNews currentArticleId={article.id} categories={article.categories} />
					</div>
				</div>
			</div>
		</article>
	);
}
