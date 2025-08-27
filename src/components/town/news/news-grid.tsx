import { and, desc, eq, like, sql } from "drizzle-orm";
import { ArrowRight, Calendar, Eye, User } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { news } from "@/server/db/schema-town";

const ITEMS_PER_PAGE = 9;

interface NewsGridProps {
	page: number;
	category?: string;
	search?: string;
}

async function getNews(page: number, category?: string, search?: string) {
	if (!db) return { articles: [], total: 0 };

	const conditions = [eq(news.status, "published")];

	if (category) {
		conditions.push(sql`${news.categories} @> ${[category]}`);
	}

	if (search) {
		conditions.push(
			sql`${news.title} ILIKE ${`%${search}%`} OR ${news.content} ILIKE ${`%${search}%`}`
		);
	}

	const offset = (page - 1) * ITEMS_PER_PAGE;

	const [articles, countResult] = await Promise.all([
		db
			.select()
			.from(news)
			.where(and(...conditions))
			.orderBy(desc(news.publishedAt))
			.limit(ITEMS_PER_PAGE)
			.offset(offset),
		db
			.select({ count: sql<number>`count(*)` })
			.from(news)
			.where(and(...conditions)),
	]);

	return {
		articles,
		total: Number(countResult[0]?.count || 0),
	};
}

export async function NewsGrid({ page, category, search }: NewsGridProps) {
	const { articles, total } = await getNews(page, category, search);

	if (articles.length === 0) {
		return (
			<Card>
				<CardContent className="py-12 text-center">
					<p className="text-gray-500">No articles found matching your criteria.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm text-gray-600">
					Showing {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, total)} of{" "}
					{total} articles
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{articles.map((article) => (
					<Card key={article.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
						{article.featuredImage && (
							<div className="h-48 overflow-hidden rounded-t-lg">
								<img
									src={article.featuredImage}
									alt={article.title}
									className="w-full h-full object-cover"
								/>
							</div>
						)}

						<CardHeader className="flex-1">
							<CardTitle className="text-lg line-clamp-2">
								<Link
									href={`/news/${article.slug}`}
									className="hover:text-blue-600 transition-colors"
								>
									{article.title}
								</Link>
							</CardTitle>

							<div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
								{article.publishedAt && (
									<div className="flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										{new Date(article.publishedAt).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										})}
									</div>
								)}

								{article.author && (
									<div className="flex items-center gap-1">
										<User className="h-3 w-3" />
										{article.author}
									</div>
								)}

								{article.viewCount && article.viewCount > 0 && (
									<div className="flex items-center gap-1">
										<Eye className="h-3 w-3" />
										{article.viewCount}
									</div>
								)}
							</div>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-gray-600 line-clamp-3 mb-4">
								{article.excerpt || article.content.substring(0, 150) + "..."}
							</p>

							{article.categories && article.categories.length > 0 && (
								<div className="flex gap-1 mb-3">
									{article.categories.slice(0, 2).map((cat) => (
										<span key={cat} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
											{cat}
										</span>
									))}
								</div>
							)}

							<Link
								href={`/news/${article.slug}`}
								className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
							>
								Read more
								<ArrowRight className="h-3 w-3" />
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
