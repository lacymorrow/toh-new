import type { Metadata } from "next";
import { Suspense } from "react";
import { ElectionsFilters } from "@/components/town/elections/elections-filters";
import { ElectionsList } from "@/components/town/elections/elections-list";

export const metadata: Metadata = {
	title: "Elections & Voting",
	description:
		"View upcoming elections, candidates, polling information, and voting resources for the Town of Harmony.",
};

interface ElectionsPageProps {
	searchParams: {
		page?: string;
		status?: string;
		search?: string;
	};
}

export default function ElectionsPage({ searchParams }: ElectionsPageProps) {
	const page = Number.parseInt(searchParams.page || "1", 10);
	const status = searchParams.status || "all";
	const search = searchParams.search || "";

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Page Header */}
			<div className="bg-blue-900 text-white py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-4">Elections & Voting</h1>
					<p className="text-xl text-blue-100">
						Stay informed about elections, candidates, and voting in Harmony
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-4 gap-8">
					{/* Sidebar with Filters */}
					<div className="lg:col-span-1">
						<ElectionsFilters currentStatus={status} currentSearch={search} />
					</div>

					{/* Elections List */}
					<div className="lg:col-span-3">
						<Suspense fallback={<div>Loading elections...</div>}>
							<ElectionsList page={page} status={status} search={search} />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
