import type { Metadata } from "next";
import Link from "next/link";
import { news } from "@/data/town/news";

export const metadata: Metadata = {
	title: "News | Town of Harmony",
	description: "Latest news and updates from the Town of Harmony, NC.",
};

export default function NewsPage() {
	const published = news
		.filter((n) => n.status === "published")
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);

	return (
		<section className="py-12 bg-cream">
			<div className="container mx-auto px-4">
				<header className="mb-8">
					<h1 className="text-3xl md:text-4xl font-serif font-bold text-sage-dark">
						News
					</h1>
				</header>

				{published.length === 0 ? (
					<div className="bg-white rounded-lg border border-stone p-8 text-center">
						<p className="text-[#4A4640]">
							No news articles have been posted yet. Please check back later or
							follow us on{" "}
							<Link
								href="https://www.facebook.com/profile.php?id=100088187771930"
								className="text-sage-dark hover:underline"
							>
								Facebook
							</Link>{" "}
							for updates.
						</p>
					</div>
				) : (
					<ul className="space-y-4">
						{published.map((n) => (
							<li
								key={n.id}
								className="bg-white rounded-lg border border-stone p-5"
							>
								<Link
									href={`/news/${n.slug}`}
									className="text-xl font-semibold text-sage-dark hover:underline"
								>
									{n.title}
								</Link>
								<p className="text-sm text-[#635E56] mt-1">
									{new Date(n.publishedAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</p>
								<p className="text-[#4A4640] mt-2">{n.excerpt}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
