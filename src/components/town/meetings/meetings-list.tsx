import { and, desc, eq, gte, like, lte, or, sql } from "drizzle-orm";
import { db, safeDbExecute } from "@/server/db";
import { meetings } from "@/server/db/schema-town";
import { MeetingCard } from "./meeting-card";
import { MeetingsPagination } from "./meetings-pagination";

interface MeetingsListProps {
	type?: string;
	month?: string;
	year?: string;
	status?: string;
	page?: string;
	limit?: number;
}

const ITEMS_PER_PAGE = 10;

export async function MeetingsList({
	type,
	month,
	year,
	status,
	page = "1",
	limit = ITEMS_PER_PAGE,
}: MeetingsListProps) {
	const currentPage = Number.parseInt(page) || 1;
	const offset = (currentPage - 1) * limit;

	// Build where conditions
	const conditions = [];

	// Only show public meetings by default
	conditions.push(eq(meetings.isPublic, true));

	if (type) {
		conditions.push(eq(meetings.type, type));
	}

	if (month && year) {
		const startDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1);
		const endDate = new Date(Number.parseInt(year), Number.parseInt(month), 0);
		conditions.push(
			and(
				gte(meetings.meetingDate, startDate.toISOString().split("T")[0]),
				lte(meetings.meetingDate, endDate.toISOString().split("T")[0])
			)
		);
	} else if (year) {
		const startDate = new Date(Number.parseInt(year), 0, 1);
		const endDate = new Date(Number.parseInt(year), 11, 31);
		conditions.push(
			and(
				gte(meetings.meetingDate, startDate.toISOString().split("T")[0]),
				lte(meetings.meetingDate, endDate.toISOString().split("T")[0])
			)
		);
	}

	if (status) {
		const today = new Date().toISOString().split("T")[0];
		switch (status) {
			case "upcoming":
				conditions.push(gte(meetings.meetingDate, today));
				break;
			case "past":
				conditions.push(lte(meetings.meetingDate, today));
				break;
			case "has-recordings":
				conditions.push(
					or(sql`${meetings.videoUrl} IS NOT NULL`, sql`${meetings.audioUrl} IS NOT NULL`)
				);
				break;
			case "has-minutes":
				conditions.push(
					or(sql`${meetings.minutes} IS NOT NULL`, sql`${meetings.minutesUrl} IS NOT NULL`)
				);
				break;
		}
	}

	const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

	// Get meetings and total count
	const [meetingsData, totalCountResult] = await Promise.all([
		safeDbExecute(async (database) => {
			return database
				.select()
				.from(meetings)
				.where(whereClause)
				.orderBy(desc(meetings.meetingDate))
				.limit(limit)
				.offset(offset);
		}, []),
		safeDbExecute(async (database) => {
			const result = await database
				.select({ count: sql<number>`count(*)` })
				.from(meetings)
				.where(whereClause);
			return result[0]?.count || 0;
		}, 0),
	]);

	const totalCount = totalCountResult;
	const totalPages = Math.ceil(totalCount / limit);
	const hasNextPage = currentPage < totalPages;
	const hasPrevPage = currentPage > 1;

	if (meetingsData.length === 0) {
		return (
			<div className="text-center py-12">
				<h3 className="text-lg font-semibold mb-2">No meetings found</h3>
				<p className="text-muted-foreground">Try adjusting your filters to see more meetings.</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<p className="text-sm text-muted-foreground">
					Showing {meetingsData.length} of {totalCount} meetings
				</p>
			</div>

			<div className="grid gap-6">
				{meetingsData.map((meeting) => (
					<MeetingCard key={meeting.id} meeting={meeting} />
				))}
			</div>

			{totalPages > 1 && (
				<MeetingsPagination
					currentPage={currentPage}
					totalPages={totalPages}
					hasNextPage={hasNextPage}
					hasPrevPage={hasPrevPage}
				/>
			)}
		</div>
	);
}
