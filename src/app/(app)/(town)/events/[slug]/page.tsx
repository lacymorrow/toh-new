import { notFound } from "next/navigation";
import { EventDetail } from "@/components/town/events/event-detail";
import { RelatedEvents } from "@/components/town/events/related-events";
import { getEventBySlug } from "@/lib/payload/town-data";

interface EventPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps) {
	const { slug } = await params;
	const event = await getEventBySlug(slug);

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
	const { slug } = await params;
	const event = await getEventBySlug(slug);

	if (!event) {
		notFound();
	}

	return (
		<div className="container py-8">
			<div className="grid gap-8 lg:grid-cols-[1fr_300px]">
				<div>
					<EventDetail event={event as any} />
				</div>
				<aside className="space-y-6">
					<RelatedEvents currentEventId={event.id} categories={event.categories as any} />
				</aside>
			</div>
		</div>
	);
}
