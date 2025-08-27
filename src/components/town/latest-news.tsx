import { desc, eq } from "drizzle-orm";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { news } from "@/server/db/schema-town";

async function getLatestNews() {
	if (!db) return [];

	const articles = await db
		.select()
		.from(news)
		.where(eq(news.status, "published"))
		.orderBy(desc(news.publishedAt))
		.limit(3);

	return articles;
}

export async function LatestNews() {
	const articles = await getLatestNews();

	if (articles.length === 0) {
		return (
			<Card>
				<CardContent className="py-8 text-center text-gray-500">
					No news articles available at this time.
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{articles.map((article) => (
				<Card key={article.id} className="hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<CardTitle className="text-lg">
									<Link
										href={`/news/${article.slug}`}
										className="hover:text-blue-600 transition-colors"
									>
										{article.title}
									</Link>
								</CardTitle>
								<div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
									<Calendar className="h-4 w-4" />
									{article.publishedAt &&
										new Date(article.publishedAt).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 line-clamp-2">
							{article.excerpt || article.content.substring(0, 150) + "..."}
						</p>
						<Link
							href={`/news/${article.slug}`}
							className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-3 text-sm font-medium"
						>
							Read more
							<ArrowRight className="h-4 w-4" />
						</Link>
					</CardContent>
				</Card>
			))}

			<div className="text-center pt-4">
				<Button asChild variant="outline">
					<Link href="/news">View All News</Link>
				</Button>
			</div>
		</div>
	);
}
