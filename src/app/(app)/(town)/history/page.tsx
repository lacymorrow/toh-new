import type { Metadata } from "next";
import Image from "next/image";
import { getHistoryArticles } from "@/lib/town-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Town History | Town of Harmony, NC",
	description:
		"Explore the rich history of the Town of Harmony, North Carolina, from its founding through today.",
};

export default async function HistoryPage() {
	const periods = await getHistoryArticles("period");
	const landmarks = await getHistoryArticles("landmark");

	return (
		<div className="container mx-auto max-w-4xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Town History</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Explore the rich history of the Town of Harmony, from its founding through today.
				</p>
			</div>

			<section className="mb-12">
				<h2 className="mb-6 text-2xl font-semibold">Historical Periods</h2>
				<div className="space-y-6">
					{periods.map((article) => (
						<Card key={article.id}>
							<div className="md:flex">
								{article.image && (
									<div className="relative h-48 w-full shrink-0 md:h-auto md:w-48">
										<Image
											src={article.image}
											alt={article.title}
											fill
											className="rounded-t-lg object-cover md:rounded-l-lg md:rounded-t-none"
										/>
									</div>
								)}
								<div className="flex-1">
									<CardHeader>
										<div className="flex items-center gap-2">
											{article.era && (
												<Badge variant="outline">{article.era}</Badge>
											)}
										</div>
										<CardTitle className="text-xl">{article.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">{article.description}</p>
										{article.highlights && article.highlights.length > 0 && (
											<ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
												{article.highlights.map((h) => (
													<li key={h}>{h}</li>
												))}
											</ul>
										)}
									</CardContent>
								</div>
							</div>
						</Card>
					))}
				</div>
			</section>

			{landmarks.length > 0 && (
				<section>
					<h2 className="mb-6 text-2xl font-semibold">Historic Landmarks</h2>
					<div className="grid gap-6 sm:grid-cols-2">
						{landmarks.map((landmark) => (
							<Card key={landmark.id}>
								{landmark.image && (
									<div className="relative h-40 w-full">
										<Image
											src={landmark.image}
											alt={landmark.title}
											fill
											className="rounded-t-lg object-cover"
										/>
									</div>
								)}
								<CardHeader>
									<div className="flex items-center gap-2">
										{landmark.year && (
											<Badge variant="outline">{landmark.year}</Badge>
										)}
										{landmark.era && (
											<Badge variant="secondary">{landmark.era}</Badge>
										)}
									</div>
									<CardTitle className="text-lg">{landmark.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										{landmark.description}
									</p>
									{landmark.address && (
										<p className="mt-2 text-sm font-medium">{landmark.address}</p>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
