import { and, desc, eq, sql } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { candidates, elections } from "@/server/db/schema-town";
import { ElectionCard } from "./election-card";

const ITEMS_PER_PAGE = 6;

interface ElectionsListProps {
	page: number;
	status?: string;
	search?: string;
}

async function getElections(page: number, status?: string, search?: string) {
	if (!db) return { elections: [], total: 0 };

	const conditions = [eq(elections.isActive, true)];

	// Filter by status
	if (status && status !== "all") {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		switch (status) {
			case "upcoming":
				conditions.push(sql`${elections.electionDate} > ${today.toISOString().split("T")[0]}`);
				break;
			case "today":
				conditions.push(sql`${elections.electionDate} = ${today.toISOString().split("T")[0]}`);
				break;
			case "past":
				conditions.push(sql`${elections.electionDate} < ${today.toISOString().split("T")[0]}`);
				break;
		}
	}

	// Search filter
	if (search) {
		conditions.push(
			sql`${elections.title} ILIKE ${`%${search}%`} OR ${elections.description} ILIKE ${`%${search}%`}`
		);
	}

	const offset = (page - 1) * ITEMS_PER_PAGE;

	// Get elections with candidate counts
	const [electionsResult, countResult] = await Promise.all([
		db
			.select({
				id: elections.id,
				title: elections.title,
				slug: elections.slug,
				description: elections.description,
				electionDate: elections.electionDate,
				registrationDeadline: elections.registrationDeadline,
				earlyVotingStart: elections.earlyVotingStart,
				earlyVotingEnd: elections.earlyVotingEnd,
				pollingLocations: elections.pollingLocations,
				sampleBallot: elections.sampleBallot,
				resultsUrl: elections.resultsUrl,
				isActive: elections.isActive,
				createdAt: elections.createdAt,
				updatedAt: elections.updatedAt,
				candidateCount: sql<number>`(
					SELECT COUNT(*)::int 
					FROM ${candidates} 
					WHERE ${candidates.electionId} = ${elections.id}
				)`,
			})
			.from(elections)
			.where(and(...conditions))
			.orderBy(desc(elections.electionDate))
			.limit(ITEMS_PER_PAGE)
			.offset(offset),
		db
			.select({ count: sql<number>`count(*)` })
			.from(elections)
			.where(and(...conditions)),
	]);

	return {
		elections: electionsResult,
		total: Number(countResult[0]?.count || 0),
	};
}

export async function ElectionsList({ page, status, search }: ElectionsListProps) {
	const { elections: electionsData, total } = await getElections(page, status, search);

	if (electionsData.length === 0) {
		return (
			<Card>
				<CardContent className="py-12 text-center">
					<p className="text-gray-500">
						{search ? "No elections found matching your search criteria." : "No elections found."}
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm text-gray-600">
					Showing {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, total)} of{" "}
					{total} elections
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{electionsData.map((election) => (
					<ElectionCard
						key={election.id}
						election={election}
						candidateCount={election.candidateCount || 0}
					/>
				))}
			</div>
		</>
	);
}
