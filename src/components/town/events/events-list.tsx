import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { events } from "@/server/db/schema-town";
import { EventCard } from "./event-card";
import { EventsPagination } from "./events-pagination";

interface EventsListProps {
	category?: string;
	month?: string;
	page?: string;
}

async function getEvents(category?: string, month?: string, page = "1") {
	if (!db) return { items: [], total: 0 };

	const pageSize = 10;
	const offset = (Number.parseInt(page) - 1) * pageSize;

	const conditions = [eq(events.status, "upcoming"), gte(events.eventDate, sql`CURRENT_DATE`)];

	if (category) {
		conditions.push(sql`${events.categories} @> ARRAY[${category}]`);
	}

	if (month) {
		const [year, monthNum] = month.split("-");
		conditions.push(
			sql`EXTRACT(YEAR FROM ${events.eventDate}) = ${year}::int AND EXTRACT(MONTH FROM ${events.eventDate}) = ${monthNum}::int`
		);
	}

	const [items, totalResult] = await Promise.all([
		db
			.select()
			.from(events)
			.where(and(...conditions))
			.orderBy(events.eventDate, events.eventTime)
			.limit(pageSize)
			.offset(offset),
		db
			.select({ count: sql`count(*)::int` })
			.from(events)
			.where(and(...conditions)),
	]);

	return {
		items,
		total: totalResult[0]?.count || 0,
	};
}

export async function EventsList({ category, month, page = "1" }: EventsListProps) {
	const { items, total } = await getEvents(category, month, page);
	const pageSize = 10;
	const totalPages = Math.ceil(total / pageSize);

	if (items.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">No events found.</p>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-6">
				{items.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>

			{totalPages > 1 && (
				<EventsPagination
					currentPage={Number.parseInt(page)}
					totalPages={totalPages}
					baseUrl="/events"
					searchParams={{ category, month }}
				/>
			)}
		</>
	);
}
