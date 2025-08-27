import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { permits } from "@/server/db/schema-town";
import { PermitCard } from "./permit-card";

interface PermitsListProps {
	search?: string;
	status?: string;
	type?: string;
	page?: string;
	applicantId?: string; // For user-specific permits
}

const PERMITS_PER_PAGE = 12;

export async function PermitsList({
	search,
	status,
	type,
	page = "1",
	applicantId,
}: PermitsListProps) {
	const currentPage = Number.parseInt(page);
	const offset = (currentPage - 1) * PERMITS_PER_PAGE;

	// Build where conditions
	const conditions = [];

	if (search) {
		conditions.push(
			sql`(${permits.applicantName} ILIKE ${"%" + search + "%"} OR 
				${permits.type} ILIKE ${"%" + search + "%"} OR 
				${permits.permitNumber} ILIKE ${"%" + search + "%"} OR
				${permits.propertyAddress} ILIKE ${"%" + search + "%"})`
		);
	}

	if (status && status !== "all") {
		conditions.push(eq(permits.status, status as any));
	}

	if (type && type !== "all") {
		conditions.push(eq(permits.type, type));
	}

	if (applicantId) {
		conditions.push(eq(permits.applicantId, applicantId));
	}

	const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

	try {
		if (!db) {
			throw new Error("Database not available");
		}

		// Get permits with pagination
		const permitsList = await db
			.select()
			.from(permits)
			.where(whereClause)
			.orderBy(desc(permits.submittedAt))
			.limit(PERMITS_PER_PAGE)
			.offset(offset);

		// Get total count for pagination
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(permits)
			.where(whereClause);

		const totalPages = Math.ceil(count / PERMITS_PER_PAGE);
		const hasMore = currentPage < totalPages;

		if (permitsList.length === 0) {
			return (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FileText className="h-12 w-12 text-muted-foreground mb-4" />
						<h3 className="text-lg font-semibold mb-2">No permits found</h3>
						<p className="text-muted-foreground text-center">
							{search || status || type
								? "Try adjusting your search criteria or filters"
								: "No permits have been submitted yet"}
						</p>
					</CardContent>
				</Card>
			);
		}

		return (
			<div className="space-y-6">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{permitsList.map((permit) => (
						<PermitCard key={permit.id} permit={permit} />
					))}
				</div>

				{/* Simple pagination info */}
				<div className="flex justify-between items-center pt-4 border-t">
					<p className="text-sm text-muted-foreground">
						Showing {(currentPage - 1) * PERMITS_PER_PAGE + 1} to{" "}
						{Math.min(currentPage * PERMITS_PER_PAGE, count)} of {count} permits
					</p>
					{hasMore && (
						<p className="text-sm text-muted-foreground">
							Page {currentPage} of {totalPages}
						</p>
					)}
				</div>
			</div>
		);
	} catch (error) {
		console.error("Error fetching permits:", error);
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<FileText className="h-12 w-12 text-muted-foreground mb-4" />
					<h3 className="text-lg font-semibold mb-2">Error loading permits</h3>
					<p className="text-muted-foreground text-center">
						There was an error loading the permits. Please try again.
					</p>
				</CardContent>
			</Card>
		);
	}
}
