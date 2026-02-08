"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const categories = [
	{ value: "government", label: "Government" },
	{ value: "community", label: "Community" },
	{ value: "recreation", label: "Recreation" },
	{ value: "education", label: "Education" },
	{ value: "arts", label: "Arts & Culture" },
	{ value: "sports", label: "Sports" },
	{ value: "volunteer", label: "Volunteer" },
	{ value: "meetings", label: "Meetings" },
	{ value: "market", label: "Markets" },
];

const months = [
	{ value: "2024-08", label: "August 2024" },
	{ value: "2024-09", label: "September 2024" },
	{ value: "2024-10", label: "October 2024" },
	{ value: "2024-11", label: "November 2024" },
	{ value: "2024-12", label: "December 2024" },
	{ value: "2025-01", label: "January 2025" },
	{ value: "2025-02", label: "February 2025" },
	{ value: "2025-03", label: "March 2025" },
];

export function EventsFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentCategory = searchParams?.get("category") || "";
	const currentMonth = searchParams?.get("month") || "";

	const updateFilters = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams?.toString() ?? "");
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		params.delete("page"); // Reset to page 1 when filters change
		router.push(`/events?${params.toString()}`);
	};

	const clearFilters = () => {
		router.push("/events");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Filter Events</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="category">Category</Label>
					<Select
						value={currentCategory}
						onValueChange={(value) => updateFilters("category", value)}
					>
						<SelectTrigger id="category">
							<SelectValue placeholder="All categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All categories</SelectItem>
							{categories.map((cat) => (
								<SelectItem key={cat.value} value={cat.value}>
									{cat.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="month">Month</Label>
					<Select value={currentMonth} onValueChange={(value) => updateFilters("month", value)}>
						<SelectTrigger id="month">
							<SelectValue placeholder="All months" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All months</SelectItem>
							{months.map((month) => (
								<SelectItem key={month.value} value={month.value}>
									{month.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{(currentCategory || currentMonth) && (
					<Button variant="outline" onClick={clearFilters} className="w-full">
						Clear filters
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
