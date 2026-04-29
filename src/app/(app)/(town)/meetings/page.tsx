import type { Metadata } from "next";
import Link from "next/link";
import { meetings } from "@/data/town/meetings";

export const metadata: Metadata = {
	title: "Meetings | Town of Harmony",
	description: "Board of Aldermen meeting schedule and minutes for Harmony, NC.",
};

export default function MeetingsPage() {
	const sorted = [...meetings].sort(
		(a, b) =>
			new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime(),
	);

	return (
		<section className="py-12 bg-cream">
			<div className="container mx-auto px-4">
				<header className="mb-8">
					<h1 className="text-3xl md:text-4xl font-serif font-bold text-sage-dark">
						Town Meetings
					</h1>
					<p className="text-[#4A4640] mt-2">
						Council meetings are held at Town Hall (3389 Harmony Hwy). Past
						meeting minutes are linked below.
					</p>
				</header>

				{sorted.length === 0 ? (
					<p className="text-[#4A4640]">No meetings to display.</p>
				) : (
					<ul className="space-y-4">
						{sorted.map((m) => {
							const date = new Date(m.meetingDate);
							const dateStr = date.toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric",
								year: "numeric",
								timeZone: "UTC",
							});
							return (
								<li
									key={m.id}
									className="bg-white rounded-lg border border-stone p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
								>
									<div>
										<Link
											href={`/meetings/${m.slug}`}
											className="text-lg font-semibold text-sage-dark hover:underline"
										>
											{m.title}
										</Link>
										<p className="text-sm text-[#4A4640]">
											{dateStr} · {m.meetingTime} · {m.location}
										</p>
									</div>
									{m.minutesUrl && (
										<a
											href={m.minutesUrl}
											className="px-4 py-2 rounded border border-sage text-sage-dark text-sm font-semibold hover:bg-sage/10"
										>
											Download Minutes
										</a>
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
