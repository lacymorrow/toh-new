import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MeetingDetail } from "@/components/town/meetings/meeting-detail";
import { db, safeDbExecute } from "@/server/db";
import { meetings } from "@/server/db/schema-town";

interface MeetingPageProps {
	params: {
		slug: string;
	};
}

async function getMeeting(slug: string) {
	return safeDbExecute(async (database) => {
		const result = await database.select().from(meetings).where(eq(meetings.slug, slug)).limit(1);

		return result[0] || null;
	}, null);
}

export async function generateMetadata({ params }: MeetingPageProps): Promise<Metadata> {
	const meeting = await getMeeting(params.slug);

	if (!meeting) {
		return {
			title: "Meeting Not Found | Town of Harmony",
		};
	}

	const meetingDate = new Date(meeting.meetingDate).toLocaleDateString();

	return {
		title: `${meeting.title} - ${meetingDate} | Town of Harmony`,
		description: meeting.agenda
			? `Town meeting: ${meeting.title} on ${meetingDate}. View agenda, minutes, and recordings.`
			: `Town meeting: ${meeting.title} scheduled for ${meetingDate}`,
		openGraph: {
			title: meeting.title,
			description: `Town meeting on ${meetingDate}`,
			type: "article",
		},
	};
}

export default async function MeetingPage({ params }: MeetingPageProps) {
	const meeting = await getMeeting(params.slug);

	if (!meeting) {
		notFound();
	}

	// Check if meeting is public or user has access
	if (!meeting.isPublic) {
		// In a real app, you would check user permissions here
		// For now, we'll show a message for private meetings
		return (
			<div className="container py-16 text-center">
				<h1 className="text-2xl font-bold mb-4">Private Meeting</h1>
				<p className="text-muted-foreground">
					This meeting is not public. Please contact the town office for access.
				</p>
			</div>
		);
	}

	return <MeetingDetail meeting={meeting} />;
}

// Generate static paths for popular meetings
export async function generateStaticParams() {
	const recentMeetings = await safeDbExecute(async (database) => {
		return database
			.select({ slug: meetings.slug })
			.from(meetings)
			.where(eq(meetings.isPublic, true))
			.limit(10);
	}, []);

	return recentMeetings.map((meeting) => ({
		slug: meeting.slug,
	}));
}
