import type { Metadata } from "next";
import { MeetingsList } from "@/components/town/meetings/meetings-list";
import { MeetingsFilters } from "@/components/town/meetings/meetings-filters";

export const metadata: Metadata = {
	title: "Agendas & Minutes | Town of Harmony, NC",
	description:
		"Access agendas and meeting minutes from Town Council, Planning Board, and Public Hearing meetings in Harmony, North Carolina.",
};

export default async function AgendaMinutesPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const type = typeof params.type === "string" ? params.type : undefined;
	const month = typeof params.month === "string" ? params.month : undefined;
	const year = typeof params.year === "string" ? params.year : undefined;
	const page = typeof params.page === "string" ? params.page : "1";

	return (
		<div className="container mx-auto max-w-6xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Agendas & Minutes</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Browse past meeting agendas and approved minutes for all town meetings.
				</p>
			</div>

			<MeetingsFilters />
			<MeetingsList type={type} month={month} year={year} status="has-minutes" page={page} />
		</div>
	);
}
