"use client";

import { Calendar, Filter, X } from "lucide-react";
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

const MEETING_TYPES = [
	"Town Council",
	"Planning Commission",
	"Zoning Board",
	"Parks & Recreation",
	"Public Works",
	"Budget Committee",
	"Emergency Meeting",
];

const MONTHS = [
	{ value: "1", label: "January" },
	{ value: "2", label: "February" },
	{ value: "3", label: "March" },
	{ value: "4", label: "April" },
	{ value: "5", label: "May" },
	{ value: "6", label: "June" },
	{ value: "7", label: "July" },
	{ value: "8", label: "August" },
	{ value: "9", label: "September" },
	{ value: "10", label: "October" },
	{ value: "11", label: "November" },
	{ value: "12", label: "December" },
];

const YEARS = (() => {
	const currentYear = new Date().getFullYear();
	return Array.from({ length: 5 }, (_, i) => currentYear - i);
})();

export function MeetingsFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentType = searchParams?.get("type") ?? null;
	const currentMonth = searchParams?.get("month") ?? null;
	const currentYear = searchParams?.get("year") ?? null;
	const currentStatus = searchParams?.get("status") ?? null;

	const updateFilter = (key: string, value: string | null) => {
		const params = new URLSearchParams(searchParams?.toString() ?? "");
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		// Reset to first page when filtering
		params.delete("page");
		router.push(`/meetings?${params.toString()}`);
	};

	const clearAllFilters = () => {
		router.push("/meetings");
	};

	const hasActiveFilters = currentType || currentMonth || currentYear || currentStatus;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Filter className="h-5 w-5" />
					Filter Meetings
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label htmlFor="type-select">Meeting Type</Label>
					<Select
						value={currentType || "all"}
						onValueChange={(value) => updateFilter("type", value === "all" ? null : value)}
					>
						<SelectTrigger id="type-select" aria-label="Filter by meeting type">
							<SelectValue placeholder="All types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All types</SelectItem>
							{MEETING_TYPES.map((type) => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor="status-select">Status</Label>
					<Select
						value={currentStatus || "all"}
						onValueChange={(value) => updateFilter("status", value === "all" ? null : value)}
					>
						<SelectTrigger id="status-select" aria-label="Filter by status">
							<SelectValue placeholder="All meetings" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All meetings</SelectItem>
							<SelectItem value="upcoming">Upcoming</SelectItem>
							<SelectItem value="past">Past</SelectItem>
							<SelectItem value="has-recordings">With Recordings</SelectItem>
							<SelectItem value="has-minutes">With Minutes</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div>
						<Label htmlFor="month-select">Month</Label>
						<Select
							value={currentMonth || "all"}
							onValueChange={(value) => updateFilter("month", value === "all" ? null : value)}
						>
							<SelectTrigger id="month-select" aria-label="Filter by month">
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								{MONTHS.map((month) => (
									<SelectItem key={month.value} value={month.value}>
										{month.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="year-select">Year</Label>
						<Select
							value={currentYear || "all"}
							onValueChange={(value) => updateFilter("year", value === "all" ? null : value)}
						>
							<SelectTrigger id="year-select" aria-label="Filter by year">
								<SelectValue placeholder="Year" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								{YEARS.map((year) => (
									<SelectItem key={year} value={year.toString()}>
										{year}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{hasActiveFilters && (
					<Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full">
						<X className="h-4 w-4 mr-2" />
						Clear All Filters
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
