import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsFilters } from "@/components/town/news/news-filters";
import { NewsGrid } from "@/components/town/news/news-grid";
import { NewsPagination } from "@/components/town/news/news-pagination";

export const metadata: Metadata = {
	title: "News & Announcements",
	description:
		"Stay updated with the latest news, announcements, and updates from the Town of Harmony.",
};

interface NewsPageProps {
	searchParams: {
		page?: string;
		category?: string;
		search?: string;
	};
}

export default function NewsPage({ searchParams }: NewsPageProps) {
	const page = Number.parseInt(searchParams.page || "1", 10);
	const category = searchParams.category || "";
	const search = searchParams.search || "";

	return (
		<div className="min-h-screen bg-cream">
			{/* Page Header */}
			<div className="bg-sage-dark text-white py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-4">News & Announcements</h1>
					<p className="text-xl text-cream">Stay informed about what's happening in Harmony</p>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-4 gap-8">
					{/* Sidebar with Filters */}
					<div className="lg:col-span-1">
						<NewsFilters currentCategory={category} currentSearch={search} />
					</div>

					{/* News Grid */}
					<div className="lg:col-span-3">
						<Suspense fallback={<div>Loading news...</div>}>
							<NewsGrid page={page} category={category} search={search} />
						</Suspense>

						<div className="mt-8">
							<NewsPagination currentPage={page} category={category} search={search} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
