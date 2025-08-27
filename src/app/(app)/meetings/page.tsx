import { desc, eq } from "drizzle-orm";
import { Users } from "lucide-react";
import { Suspense } from "react";
import { MeetingsCalendar } from "@/components/town/meetings/meetings-calendar";
import { MeetingsFilters } from "@/components/town/meetings/meetings-filters";
import { MeetingsList } from "@/components/town/meetings/meetings-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db, safeDbExecute } from "@/server/db";
import { meetings } from "@/server/db/schema-town";

export const metadata = {
	title: "Town Meetings | Town of Harmony",
	description: "Town meetings, agendas, minutes, and recordings for the Town of Harmony",
};

async function getRecentMeetings() {
	return safeDbExecute(async (database) => {
		return database
			.select({
				id: meetings.id,
				title: meetings.title,
				slug: meetings.slug,
				type: meetings.type,
				meetingDate: meetings.meetingDate,
				meetingTime: meetings.meetingTime,
				location: meetings.location,
				isPublic: meetings.isPublic,
			})
			.from(meetings)
			.where(eq(meetings.isPublic, true))
			.orderBy(desc(meetings.meetingDate))
			.limit(50);
	}, []);
}

export default async function MeetingsPage({
	searchParams,
}: {
	searchParams: {
		type?: string;
		month?: string;
		year?: string;
		status?: string;
		page?: string;
		view?: string;
	};
}) {
	const recentMeetings = await getRecentMeetings();
	const view = searchParams.view || "list";

	return (
		<div className="container py-8">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-4">
					<Users className="h-8 w-8 text-blue-600" />
					<h1 className="text-4xl font-bold">Town Meetings</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Stay informed with town council meetings, agendas, minutes, and recordings
				</p>
			</div>

			<Tabs value={view} className="space-y-6">
				<TabsList>
					<TabsTrigger value="list" asChild>
						<a href="/meetings?view=list">List View</a>
					</TabsTrigger>
					<TabsTrigger value="calendar" asChild>
						<a href="/meetings?view=calendar">Calendar View</a>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="list">
					<div className="grid gap-8 lg:grid-cols-[1fr_300px]">
						<div>
							<Suspense fallback={<div>Loading meetings...</div>}>
								<MeetingsList
									type={searchParams.type}
									month={searchParams.month}
									year={searchParams.year}
									status={searchParams.status}
									page={searchParams.page}
								/>
							</Suspense>
						</div>
						<aside>
							<MeetingsFilters />
						</aside>
					</div>
				</TabsContent>

				<TabsContent value="calendar">
					<div className="grid gap-8 lg:grid-cols-[1fr_300px]">
						<div>
							<Suspense fallback={<div>Loading calendar...</div>}>
								<MeetingsCalendar
									meetings={recentMeetings}
									initialMonth={
										searchParams.month ? Number.parseInt(searchParams.month) - 1 : undefined
									}
									initialYear={searchParams.year ? Number.parseInt(searchParams.year) : undefined}
								/>
							</Suspense>
						</div>
						<aside>
							<MeetingsFilters />
						</aside>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
