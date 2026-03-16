import type { TownElection } from "./types";

export const elections: TownElection[] = [
	{
		id: 1,
		title: "2025 Harmony Municipal Election",
		slug: "2025-municipal-election",
		description:
			"Municipal election for the Town of Harmony, including Mayor and Town Council seats. All registered voters within Harmony town limits are eligible to vote.",
		electionDate: "2025-11-04",
		registrationDeadline: "2025-10-10",
		earlyVotingStart: "2025-10-23",
		earlyVotingEnd: "2025-11-01",
		pollingLocations: [
			{
				name: "Harmony Volunteer Fire Department",
				address: "3330 Harmony Hwy, Harmony, NC 28634",
				hours: "6:30 AM – 7:30 PM",
			},
		],
		isActive: true,
		candidates: [
			{
				name: "Sean Turner",
				position: "Mayor",
				party: "Nonpartisan",
				bio: "Incumbent mayor since December 2023. Lifelong Harmony resident committed to maintaining the town's character while improving infrastructure.",
				sortOrder: 1,
			},
			{
				name: "Scotty Harris",
				position: "Town Council",
				party: "Nonpartisan",
				bio: "Incumbent council member. Focused on responsible budgeting and community park improvements.",
				sortOrder: 2,
			},
			{
				name: "Chris Pierce",
				position: "Town Council",
				party: "Nonpartisan",
				bio: "Incumbent council member. Advocates for road maintenance and sewer system reliability.",
				sortOrder: 3,
			},
			{
				name: "Brandon Angell",
				position: "Town Council",
				party: "Nonpartisan",
				bio: "Incumbent council member. Supports community events and the Harmony Farmers Market.",
				sortOrder: 4,
			},
			{
				name: "Jared Clark",
				position: "Town Council",
				party: "Nonpartisan",
				bio: "Incumbent council member. Interested in land use planning and preserving Harmony's rural character.",
				sortOrder: 5,
			},
		],
		sampleBallot: null,
	},
];
