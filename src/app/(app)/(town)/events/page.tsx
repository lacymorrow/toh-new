import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/data/town/events";

export const metadata: Metadata = {
	title: "Events | Town of Harmony",
	description: "Upcoming community events in Harmony, NC.",
};

export default function EventsPage() {
	const upcoming = [...events]
		.filter((e) => e.status !== "cancelled")
		.sort(
			(a, b) =>
				new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
		);

	return (
		<section className="py-12 bg-cream">
			<div className="container mx-auto px-4">
				<header className="mb-8">
					<h1 className="text-3xl md:text-4xl font-serif font-bold text-sage-dark">
						Upcoming Events
					</h1>
				</header>

				{upcoming.length === 0 ? (
					<p className="text-[#4A4640]">No upcoming events scheduled.</p>
				) : (
					<ul className="space-y-4">
						{upcoming.map((e) => {
							const date = new Date(e.eventDate);
							const dateStr = date.toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric",
								year: "numeric",
							});
							return (
								<li
									key={e.id}
									className="bg-white rounded-lg border border-stone p-5"
								>
									<Link
										href={`/events/${e.slug}`}
										className="text-xl font-semibold text-sage-dark hover:underline"
									>
										{e.title}
									</Link>
									<p className="text-sm text-[#4A4640] mt-1">
										{dateStr} · {e.eventTime}
										{e.endTime && e.endTime !== e.eventTime && ` – ${e.endTime}`}
									</p>
									<p className="text-sm text-[#4A4640]">
										{e.location} · {e.locationAddress}
									</p>
									<p className="text-[#4A4640] mt-2">{e.description}</p>
									{e.contactPhone && (
										<p className="text-sm text-[#635E56] mt-2">
											Contact:{" "}
											<a
												href={`tel:${e.contactPhone.replace(/[^0-9+]/g, "")}`}
												className="hover:underline"
											>
												{e.contactPhone}
											</a>
										</p>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</section>
	);
}
