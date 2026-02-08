import type { Payload } from "payload";
import { createRichText } from "../../seed-utils";

export const seedSampleElections = async (payload: Payload) => {
	try {
		console.info("🗳️ Seeding sample elections...");

		// Clear existing data
		await payload.delete({
			collection: "elections",
			where: {
				id: {
					exists: true,
				},
			},
		});

		const getNextDate = (month: number, day: number) => {
			const now = new Date();
			const year = now.getMonth() >= month ? now.getFullYear() + 1 : now.getFullYear();
			return new Date(year, month, day).toISOString();
		};

		const elections = [
			{
				title: "2025 Municipal Election",
				slug: "2025-municipal-election",
				description: createRichText(
					"The 2025 Town of Harmony Municipal Election for Mayor and Town Council seats. All registered voters within town limits are eligible to participate.",
				),
				electionDate: getNextDate(10, 4),
				registrationDeadline: getNextDate(9, 10),
				earlyVotingStart: getNextDate(9, 18),
				earlyVotingEnd: getNextDate(10, 1),
				pollingLocations: [
					{
						name: "Harmony Community Center",
						address: "3389 Harmony Hwy, Harmony, NC 28634",
						hours: "6:30 AM - 7:30 PM",
					},
					{
						name: "Harmony Volunteer Fire Department",
						address: "3500 Harmony Hwy, Harmony, NC 28634",
						hours: "6:30 AM - 7:30 PM",
					},
				],
				isActive: true,
				candidates: [
					{
						name: "Patricia Williams",
						position: "Mayor",
						party: "Nonpartisan",
						bio: "Lifelong Harmony resident and retired educator. Served 8 years on the Town Council and 4 years as Planning Board chair. Committed to sustainable growth while preserving Harmony's small-town character.",
						sortOrder: 1,
					},
					{
						name: "Robert Chen",
						position: "Mayor",
						party: "Nonpartisan",
						bio: "Local business owner and community volunteer. Founded the Harmony Business Association and spearheaded the downtown revitalization initiative. Focused on economic development and fiscal responsibility.",
						sortOrder: 2,
					},
					{
						name: "Angela Foster",
						position: "Town Council - Seat 1",
						party: "Nonpartisan",
						bio: "Community organizer and parent advocate. Active in the PTA and Harmony Youth Sports League. Wants to expand recreational programs and improve infrastructure for families.",
						sortOrder: 3,
					},
					{
						name: "James Mitchell",
						position: "Town Council - Seat 1",
						party: "Nonpartisan",
						bio: "Third-generation Harmony farmer and current volunteer fire department member. Supports protecting agricultural land while investing in public safety resources.",
						sortOrder: 4,
					},
					{
						name: "Diana Perez",
						position: "Town Council - Seat 2",
						party: "Nonpartisan",
						bio: "Director of the Harmony Food Bank and nonprofit leader. Focused on affordable housing, community health initiatives, and senior services.",
						sortOrder: 5,
					},
					{
						name: "William Turner",
						position: "Town Council - Seat 2",
						party: "Nonpartisan",
						bio: "Retired Army veteran and current code enforcement officer. Advocates for improved road maintenance, better broadband access, and enhanced public safety.",
						sortOrder: 6,
					},
				],
			},
			{
				title: "2024 General Election",
				slug: "2024-general-election",
				description: createRichText(
					"The 2024 General Election for local, state, and federal offices. Iredell County results and polling information for Harmony precinct.",
				),
				electionDate: "2024-11-05T00:00:00.000Z",
				registrationDeadline: "2024-10-11T00:00:00.000Z",
				earlyVotingStart: "2024-10-17T00:00:00.000Z",
				earlyVotingEnd: "2024-11-02T00:00:00.000Z",
				pollingLocations: [
					{
						name: "Harmony Community Center",
						address: "3389 Harmony Hwy, Harmony, NC 28634",
						hours: "6:30 AM - 7:30 PM",
					},
				],
				resultsUrl: "https://www.co.iredell.nc.us/462/Election-Results",
				isActive: false,
				candidates: [],
			},
		];

		const created = await Promise.all(
			elections.map(async (election) => {
				try {
					const result = await payload.create({
						collection: "elections",
						data: election,
					});
					return result;
				} catch (error) {
					console.error(`Error creating election: ${election.title}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} elections`);
		return valid;
	} catch (error) {
		console.error("Error seeding sample elections:", error);
		throw error;
	}
};
