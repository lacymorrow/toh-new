import { and, eq, gte, ne, sql } from "drizzle-orm";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/utils";
import { db } from "@/server/db";
import { events } from "@/server/db/schema-town";

interface RelatedEventsProps {
	currentEventId: number;
	categories?: string[] | null;
}

async function getRelatedEvents(currentId: number, categories?: string[] | null) {
	if (!db) return [];

	const conditions = [
		eq(events.status, "upcoming"),
		ne(events.id, currentId),
		gte(events.eventDate, sql`CURRENT_DATE`),
	];

	if (categories && categories.length > 0) {
		conditions.push(sql`${events.categories} && ${categories}`);
	}

	const related = await db
		.select()
		.from(events)
		.where(and(...conditions))
		.orderBy(events.eventDate)
		.limit(5);

	return related;
}

export async function RelatedEvents({ currentEventId, categories }: RelatedEventsProps) {
	const related = await getRelatedEvents(currentEventId, categories);

	if (related.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Related Events</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{related.map((event) => (
						<div key={event.id} className="pb-4 border-b last:border-0">
							<Link
								href={`/events/${event.slug}`}
								className="block hover:text-blue-600 transition-colors"
							>
								<h4 className="font-medium mb-2 line-clamp-2">{event.title}</h4>
								<div className="space-y-1 text-xs text-muted-foreground">
									<div className="flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										{formatDate(new Date(event.eventDate))}
									</div>
									{event.eventTime && (
										<div className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											{formatTime(event.eventTime)}
										</div>
									)}
								</div>
							</Link>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
