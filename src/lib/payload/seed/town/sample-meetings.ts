import type { Payload } from "payload";
import { createRichText } from "../../seed-utils";

export const seedSampleMeetings = async (payload: Payload) => {
	try {
		console.info("🏛️ Seeding sample meetings...");

		// Clear existing data
		await payload.delete({
			collection: "meetings",
			where: {
				id: {
					exists: true,
				},
			},
		});

		// Helper to get a future date for a given number of days from now
		const getFutureDate = (daysFromNow: number) => {
			const date = new Date();
			date.setDate(date.getDate() + daysFromNow);
			return date.toISOString();
		};

		const meetings = [
			{
				title: "Town Council Regular Meeting",
				slug: "town-council-regular-meeting-2025",
				type: "Council" as const,
				meetingDate: getFutureDate(14),
				meetingTime: "7:00 PM",
				location: "Town Hall",
				agenda: createRichText(
					"1. Call to Order\n2. Invocation and Pledge of Allegiance\n3. Approval of Minutes from Previous Meeting\n4. Public Comment Period\n5. Old Business\n   a. Park Improvement Project Update\n   b. Budget Amendment Discussion\n6. New Business\n   a. Zoning Request - 100 Main Street\n   b. Public Works Equipment Purchase\n7. Department Reports\n   a. Police Department\n   b. Public Works\n   c. Parks & Recreation\n8. Financial Report\n9. Mayor's Report\n10. Adjournment",
				),
				attendees: [
					"Mayor Sean Turner",
					"Alderman Brandon Angell",
					"Alderman Jared Clark",
					"Alderman Scotty Harris",
					"Alderman Chris Pierce",
					"Town Clerk Wanda Edwards",
					"Town Manager Michael Thompson",
				],
				isPublic: true,
			},
			{
				title: "Planning Commission Meeting",
				slug: "planning-commission-meeting-2025",
				type: "Planning" as const,
				meetingDate: getFutureDate(21),
				meetingTime: "6:00 PM",
				location: "Town Hall",
				agenda: createRichText(
					"1. Call to Order\n2. Approval of Previous Meeting Minutes\n3. Public Comment Period\n4. Old Business\n   a. Comprehensive Plan Review Update\n5. New Business\n   a. Site Plan Review - Commercial Development on Harmony Hwy\n   b. Conditional Use Permit Application - Home Business\n   c. Subdivision Preliminary Plat Review\n6. Staff Reports\n7. Commissioner Comments\n8. Adjournment",
				),
				attendees: [
					"Planning Director Robert Anderson",
					"Planning Commission Members",
				],
				isPublic: true,
			},
			{
				title: "Public Hearing: Proposed Zoning Changes",
				slug: "public-hearing-zoning-changes-2025",
				type: "Public Hearing" as const,
				meetingDate: getFutureDate(28),
				meetingTime: "7:00 PM",
				location: "Town Hall",
				agenda: createRichText(
					"1. Call to Order\n2. Purpose and Procedures of Public Hearing\n3. Staff Presentation\n   a. Overview of Proposed Zoning Text Amendments\n   b. Affected Properties and Areas\n4. Public Comment Period\n   - Each speaker is allowed 3 minutes\n   - Written comments may be submitted\n5. Board Discussion\n6. Vote on Proposed Changes\n7. Adjournment\n\nNote: All interested citizens are encouraged to attend and share their views on the proposed zoning changes.",
				),
				attendees: [
					"Mayor Sean Turner",
					"Board of Aldermen",
					"Planning Director Robert Anderson",
					"Town Clerk Wanda Edwards",
				],
				isPublic: true,
			},
		];

		const created = await Promise.all(
			meetings.map(async (meeting) => {
				try {
					const result = await payload.create({
						collection: "meetings",
						data: meeting,
					});
					return result;
				} catch (error) {
					console.error(`Error creating meeting: ${meeting.title}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} meetings`);
		return valid;
	} catch (error) {
		console.error("Error seeding sample meetings:", error);
		throw error;
	}
};
