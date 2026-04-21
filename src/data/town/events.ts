import type { TownEvent } from "./types";
import { mediaUrls } from "./media";

const getNextDate = (month: number, day: number) => {
	const now = new Date();
	const year = now.getMonth() >= month ? now.getFullYear() + 1 : now.getFullYear();
	return new Date(year, month, day).toISOString();
};

const getNextSaturday = () => {
	const now = new Date();
	const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
	const nextSaturday = new Date(now);
	nextSaturday.setDate(now.getDate() + daysUntilSaturday);
	return nextSaturday.toISOString();
};

export const events: TownEvent[] = [
	{
		id: 1,
		title: "Harmony Farmers Market",
		slug: "harmony-farmers-market",
		description:
			"Shop local at the Harmony Farmers Market featuring fresh produce, baked goods, crafts, and live music every Saturday morning.",
		content:
			"The Harmony Farmers Market is held every Saturday morning from 8:00 AM to 12:00 PM at the Town Hall parking lot. Local produce, baked goods, honey, crafts, and more from local vendors.",
		featuredImage: mediaUrls["event-farmers-market"],
		eventDate: getNextSaturday(),
		eventTime: "8:00 AM",
		endTime: "12:00 PM",
		location: "Town Hall Parking Lot",
		locationAddress: "3389 Harmony Hwy, Harmony, NC 28634",
		organizer: "Parks & Recreation Department",
		contactEmail: "recreation@townofharmony.org",
		contactPhone: "(704) 546-2342",
		status: "upcoming",
		isRecurring: true,
		categories: ["community", "recreation"],
		tags: ["farmers-market", "local", "weekly"],
	},
	{
		id: 2,
		title: "Fall Festival",
		slug: "fall-festival-2025",
		description:
			"Celebrate autumn at Harmony's annual Fall Festival with hayrides, pumpkin carving, live entertainment, and delicious food.",
		content:
			"The annual Harmony Fall Festival features fall activities, food, and entertainment for the whole family.",
		featuredImage: mediaUrls["event-fall-festival"],
		eventDate: getNextDate(9, 18),
		eventTime: "10:00 AM",
		endTime: "6:00 PM",
		location: "Tomlinson-Moore Family Park",
		locationAddress: "Harmony, NC 28634",
		organizer: "Town of Harmony",
		contactEmail: "info@townofharmony.org",
		contactPhone: "(704) 546-2339",
		status: "upcoming",
		isRecurring: false,
		categories: ["community", "festival"],
		tags: ["fall", "festival", "family"],
	},
	{
		id: 3,
		title: "Christmas Parade",
		slug: "christmas-parade-2025",
		description:
			"Ring in the holiday season at the annual Harmony Christmas Parade featuring floats, bands, and a visit from Santa Claus.",
		content:
			"The annual Harmony Christmas Parade along Harmony Highway features floats, local organizations, and holiday celebrations. Contact Town Hall for details.",
		featuredImage: mediaUrls["event-christmas-parade"],
		eventDate: getNextDate(11, 6),
		eventTime: "2:00 PM",
		endTime: "4:00 PM",
		location: "Harmony Highway",
		locationAddress: "Harmony Hwy, Harmony, NC 28634",
		organizer: "Town of Harmony",
		contactEmail: "info@townofharmony.org",
		contactPhone: "(704) 546-2339",
		status: "upcoming",
		isRecurring: false,
		categories: ["community", "holiday"],
		tags: ["christmas", "parade", "holiday"],
	},
	{
		id: 4,
		title: "Spring Cleanup Day",
		slug: "spring-cleanup-day-2025",
		description:
			"Volunteer to help beautify our community during the annual Spring Cleanup Day. Supplies and refreshments provided.",
		content:
			"Annual Spring Cleanup Day. Volunteers meet at Town Hall. Supplies provided. Help keep Harmony's parks, roadsides, and public spaces clean.",
		featuredImage: mediaUrls["event-spring-cleanup"],
		eventDate: getNextDate(3, 19),
		eventTime: "8:00 AM",
		endTime: "12:00 PM",
		location: "Town Hall",
		locationAddress: "3389 Harmony Hwy, Harmony, NC 28634",
		organizer: "Public Works Department",
		contactEmail: "publicworks@townofharmony.org",
		contactPhone: "(704) 546-2341",
		status: "upcoming",
		isRecurring: false,
		categories: ["community"],
		tags: ["cleanup", "volunteer", "spring"],
	},
];
