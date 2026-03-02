import { Building2 } from "lucide-react";
import { Suspense } from "react";
import { BusinessFilters } from "@/components/town/business/business-filters";
import { BusinessList } from "@/components/town/business/business-list";
import { BusinessSearch } from "@/components/town/business/business-search";

export const metadata = {
	title: "Business Directory | Town of Harmony",
	description: "Local businesses and services in the Town of Harmony",
};

export default function BusinessDirectoryPage({
	searchParams,
}: {
	searchParams: {
		category?: string;
		search?: string;
		featured?: string;
		page?: string;
	};
}) {
	return (
		<div className="container py-8">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-4">
					<Building2 className="h-8 w-8 text-sage" />
					<h1 className="text-4xl font-bold">Business Directory</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Support local businesses and discover services in our community
				</p>
			</div>

			<div className="mb-6">
				<BusinessSearch />
			</div>

			<div className="grid gap-8 lg:grid-cols-[300px_1fr]">
				<aside>
					<BusinessFilters />
				</aside>
				<div>
					<Suspense fallback={<div>Loading businesses...</div>}>
						<BusinessList
							category={searchParams.category}
							search={searchParams.search}
							featured={searchParams.featured}
							page={searchParams.page}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
}
