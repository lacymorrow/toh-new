"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
	{ value: "", label: "All Categories" },
	{ value: "announcements", label: "Announcements" },
	{ value: "public-safety", label: "Public Safety" },
	{ value: "community", label: "Community" },
	{ value: "government", label: "Government" },
	{ value: "events", label: "Events" },
	{ value: "public-works", label: "Public Works" },
];

interface NewsFiltersProps {
	currentCategory: string;
	currentSearch: string;
}

export function NewsFilters({ currentCategory, currentSearch }: NewsFiltersProps) {
	const router = useRouter();

	const handleCategoryChange = (category: string) => {
		const params = new URLSearchParams();
		if (category) params.set("category", category);
		if (currentSearch) params.set("search", currentSearch);
		router.push(`/news?${params.toString()}`);
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const search = formData.get("search") as string;

		const params = new URLSearchParams();
		if (currentCategory) params.set("category", currentCategory);
		if (search) params.set("search", search);
		router.push(`/news?${params.toString()}`);
	};

	return (
		<div className="space-y-6">
			{/* Search */}
			<Card>
				<CardHeader>
					<CardTitle>Search</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSearch}>
						<div className="flex gap-2">
							<Input
								name="search"
								placeholder="Search news..."
								defaultValue={currentSearch}
								className="flex-1"
							/>
							<Button type="submit" size="icon">
								<Search className="h-4 w-4" />
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			{/* Categories */}
			<Card>
				<CardHeader>
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{categories.map((category) => (
							<button
								key={category.value}
								onClick={() => handleCategoryChange(category.value)}
								className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
									currentCategory === category.value
										? "bg-blue-100 text-blue-900"
										: "hover:bg-gray-100"
								}`}
							>
								{category.label}
							</button>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Archive */}
			<Card>
				<CardHeader>
					<CardTitle>Archive</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2 text-sm">
						<li>
							<a href="/news?month=2024-08" className="text-blue-600 hover:underline">
								August 2024
							</a>
						</li>
						<li>
							<a href="/news?month=2024-07" className="text-blue-600 hover:underline">
								July 2024
							</a>
						</li>
						<li>
							<a href="/news?month=2024-06" className="text-blue-600 hover:underline">
								June 2024
							</a>
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
