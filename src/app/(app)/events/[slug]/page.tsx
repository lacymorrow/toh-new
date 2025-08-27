import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/town/events/event-detail";
import { RelatedEvents } from "@/components/town/events/related-events";
import { db } from "@/server/db";
import { events } from "@/server/db/schema-town";

interface EventPageProps {
	params: { slug: string };
}

async function getEvent(slug: string) {
	if (!db) return null;

	const event = await db.select().from(events).where(eq(events.slug, slug)).limit(1);

	return event[0] || null;
}

export async function generateMetadata({ params }: EventPageProps) {
	const event = await getEvent(params.slug);

	if (!event) {
		return {
			title: "Event Not Found | Town of Harmony",
		};
	}

	return {
		title: `${event.title} | Town of Harmony`,
		description: event.description || `Join us for ${event.title} in the Town of Harmony`,
	};
}

export default async function EventPage({ params }: EventPageProps) {
	const event = await getEvent(params.slug);

	if (!event) {
		notFound();
	}

	return (
		<div className="container py-8">
			<div className="grid gap-8 lg:grid-cols-[1fr_300px]">
				<div>
					<EventDetail event={event} />
				</div>
				<aside className="space-y-6">
					<RelatedEvents currentEventId={event.id} categories={event.categories} />
				</aside>
			</div>
		</div>
	);
}
