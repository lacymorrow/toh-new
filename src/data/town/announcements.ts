import type { TownAnnouncement } from "./types";

export const announcements: TownAnnouncement[] = [
	{
		id: 1,
		title: "Next Town Council Meeting: May 6",
		content:
			"The next regular meeting of the Harmony Town Council will be held Tuesday, May 6, 2025, at 7:00 PM at Town Hall. The agenda includes park summer hours, sewer inspection results, and election preparation. All residents are welcome to attend. Public comment period is available at each meeting.",
		level: "info",
		isActive: true,
		startsAt: "2025-04-20",
		endsAt: "2025-05-07",
		createdAt: "2025-04-20",
		contactInfo: "Town Clerk Wanda Edwards — 704-546-2339",
	},
	{
		id: 2,
		title: "Harmony Farmers Market Opens May 3",
		content:
			"The Harmony Farmers Market returns for the 2025 season beginning Saturday, May 3. The market operates every Saturday from 8:00 AM to 12:00 PM through October at the Town Hall grounds. Local produce, baked goods, crafts, and more. Contact Farmers Market Manager Doug Galliher for vendor information.",
		level: "info",
		isActive: true,
		startsAt: "2025-04-15",
		endsAt: "2025-05-10",
		createdAt: "2025-04-15",
		contactInfo: "Doug Galliher, Farmers Market Manager — 704-546-2339",
	},
	{
		id: 3,
		title: "Water Main Flushing: May 19–21",
		content:
			"The Town of Harmony will conduct routine water main flushing from Monday, May 19, through Wednesday, May 21, between 8:00 AM and 4:00 PM. Residents may experience temporary discoloration of water or brief drops in pressure. Water remains safe to drink. If discoloration occurs, run cold water for a few minutes until it clears. Avoid washing white laundry during flushing hours.",
		level: "warning",
		isActive: true,
		startsAt: "2025-05-12",
		endsAt: "2025-05-22",
		createdAt: "2025-05-10",
		affectedAreas: ["Harmony Hwy", "Farmington Rd", "Little Creek Rd"],
		contactInfo: "Town Hall — 704-546-2339",
		instructions: [
			"Run cold water for several minutes if discoloration occurs.",
			"Avoid washing white laundry during flushing hours.",
			"Water is safe to drink at all times.",
		],
	},
];
