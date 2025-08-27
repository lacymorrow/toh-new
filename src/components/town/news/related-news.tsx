import { and, eq, ne, sql } from "drizzle-orm";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { news } from "@/server/db/schema-town";

interface RelatedNewsProps {
	currentArticleId: number;
	categories?: string[] | null;
}

async function getRelatedNews(currentId: number, categories?: string[] | null) {
	if (!db) return [];

	const conditions = [eq(news.status, "published"), ne(news.id, currentId)];

	if (categories && categories.length > 0) {
		// Find articles with overlapping categories
		conditions.push(sql`${news.categories} && ${categories}`);
	}

	const related = await db
		.select()
		.from(news)
		.where(and(...conditions))
		.limit(5);

	return related;
}

export async function RelatedNews({ currentArticleId, categories }: RelatedNewsProps) {
	const related = await getRelatedNews(currentArticleId, categories);

	if (related.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Related Articles</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{related.map((article) => (
						<div key={article.id} className="pb-4 border-b last:border-0">
							<Link
								href={`/news/${article.slug}`}
								className="block hover:text-blue-600 transition-colors"
							>
								<h4 className="font-medium mb-1 line-clamp-2">{article.title}</h4>
								{article.publishedAt && (
									<div className="flex items-center gap-1 text-xs text-gray-500">
										<Calendar className="h-3 w-3" />
										{new Date(article.publishedAt).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</div>
								)}
							</Link>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
