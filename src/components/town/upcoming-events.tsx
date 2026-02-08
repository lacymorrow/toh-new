import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getEvents } from "@/lib/payload/town-data";

export async function UpcomingEvents() {
	const { docs: upcomingEvents } = await getEvents({ limit: 5, status: "upcoming" });

	if (upcomingEvents.length === 0) {
		return (
			<Card>
				<CardContent className="py-8 text-center text-gray-500">
					No upcoming events scheduled.
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-3">
			{upcomingEvents.map((event) => (
				<Card key={event.id} className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<Link href={`/events/${event.slug}`}>
							<div className="space-y-2">
								{/* Date Badge */}
								<div className="flex items-start gap-3">
									<div className="bg-blue-100 text-blue-900 rounded-lg p-2 text-center min-w-[60px]">
										<div className="text-xs font-semibold">
											{new Date(event.eventDate)
												.toLocaleDateString("en-US", { month: "short" })
												.toUpperCase()}
										</div>
										<div className="text-xl font-bold">{new Date(event.eventDate).getDate()}</div>
									</div>

									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
											{event.title}
										</h3>

										{event.eventTime && (
											<div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
												<Clock className="h-3 w-3" />
												{event.eventTime}
											</div>
										)}

										{event.location && (
											<div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
												<MapPin className="h-3 w-3" />
												<span className="line-clamp-1">{event.location}</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</Link>
					</CardContent>
				</Card>
			))}

			<div className="pt-4">
				<Button asChild variant="outline" className="w-full">
					<Link href="/events">
						<Calendar className="h-4 w-4 mr-2" />
						View Full Calendar
					</Link>
				</Button>
			</div>
		</div>
	);
}
