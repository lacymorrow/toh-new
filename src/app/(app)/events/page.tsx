import { CalendarDays } from "lucide-react";
import { Suspense } from "react";
import { EventsFilters } from "@/components/town/events/events-filters";
import { EventsList } from "@/components/town/events/events-list";

export const metadata = {
	title: "Events | Town of Harmony",
	description: "Upcoming events and activities in the Town of Harmony",
};

export default function EventsPage({
	searchParams,
}: {
	searchParams: { category?: string; month?: string; page?: string };
}) {
	return (
		<div className="container py-8">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-4">
					<CalendarDays className="h-8 w-8 text-blue-600" />
					<h1 className="text-4xl font-bold">Community Events</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Stay connected with what's happening in Harmony
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-[1fr_300px]">
				<div>
					<Suspense fallback={<div>Loading events...</div>}>
						<EventsList
							category={searchParams.category}
							month={searchParams.month}
							page={searchParams.page}
						/>
					</Suspense>
				</div>
				<aside>
					<EventsFilters />
				</aside>
			</div>
		</div>
	);
}
