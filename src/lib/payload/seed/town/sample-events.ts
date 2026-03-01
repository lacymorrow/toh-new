import type { Payload } from "payload";
import { createRichText } from "../../seed-utils";
import type { MediaMap } from "./seed-media";

export const seedSampleEvents = async (payload: Payload, media?: Partial<MediaMap>) => {
	try {
		console.info("📅 Seeding sample events...");

		// Clear existing data
		await payload.delete({
			collection: "events",
			where: {
				id: {
					exists: true,
				},
			},
		});

		// Helper to get the next occurrence of a specific month/day
		const getNextDate = (month: number, day: number) => {
			const now = new Date();
			const year = now.getMonth() >= month ? now.getFullYear() + 1 : now.getFullYear();
			return new Date(year, month, day).toISOString();
		};

		// Get the next Saturday for recurring market
		const getNextSaturday = () => {
			const now = new Date();
			const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
			const nextSaturday = new Date(now);
			nextSaturday.setDate(now.getDate() + daysUntilSaturday);
			return nextSaturday.toISOString();
		};

		const events = [
			{
				title: "Harmony Farmers Market",
				slug: "harmony-farmers-market",
				description:
					"Shop local at the Harmony Farmers Market featuring fresh produce, baked goods, crafts, and live music every Saturday morning.",
				content: createRichText(
					"The Harmony Farmers Market returns every Saturday morning from 8:00 AM to 12:00 PM at the Town Hall parking lot. Browse fresh, locally grown produce, homemade baked goods, local honey, handmade crafts, and more from over 20 local vendors. Live music is featured each week, and there are special activities for children. The Farmers Market is a beloved Harmony tradition that connects residents with local growers and artisans. Come out and support your neighbors while enjoying the best of what our community has to offer!",
				),
				featuredImage: media?.["event-farmers-market"] ?? null,
				eventDate: getNextSaturday(),
				eventTime: "8:00 AM",
				endTime: "12:00 PM",
				location: "Town Hall Parking Lot",
				locationAddress: "3389 Harmony Hwy, Harmony, NC 28634",
				organizer: "Parks & Recreation Department",
				contactEmail: "recreation@townofharmony.org",
				contactPhone: "(704) 546-2342",
				status: "upcoming" as const,
				isRecurring: true,
				categories: ["community", "recreation"],
				tags: ["farmers-market", "local", "weekly"],
			},
			{
				title: "Fall Festival",
				slug: "fall-festival-2025",
				description:
					"Celebrate autumn at Harmony's annual Fall Festival with hayrides, pumpkin carving, live entertainment, and delicious food.",
				content: createRichText(
					"The annual Harmony Fall Festival is one of the most anticipated events of the year! Join us for a day of fall fun including hayrides, pumpkin carving contests, live music, a craft fair, food vendors, and activities for the whole family. The festival also features a pie baking contest, scarecrow building competition, and a corn maze. Local businesses and organizations set up booths throughout the grounds. Admission is free, and there is ample parking available. Don't miss this wonderful celebration of the autumn season in Harmony!",
				),
				featuredImage: media?.["event-fall-festival"] ?? null,
				eventDate: getNextDate(9, 18),
				eventTime: "10:00 AM",
				endTime: "6:00 PM",
				location: "Harmony Park",
				locationAddress: "100 Park Drive, Harmony, NC 28634",
				organizer: "Town of Harmony",
				contactEmail: "info@townofharmony.org",
				contactPhone: "(704) 546-2339",
				status: "upcoming" as const,
				isRecurring: false,
				categories: ["community", "festival"],
				tags: ["fall", "festival", "family"],
			},
			{
				title: "Christmas Parade",
				slug: "christmas-parade-2025",
				description:
					"Ring in the holiday season at the annual Harmony Christmas Parade featuring floats, bands, and a visit from Santa Claus.",
				content: createRichText(
					"The Harmony Christmas Parade is a beloved holiday tradition that brings the entire community together to celebrate the season. The parade route runs along Harmony Highway, featuring decorated floats, marching bands, local organizations, classic cars, and of course, Santa Claus! Following the parade, enjoy hot chocolate and cookies at the Community Center, along with caroling and a tree lighting ceremony. Businesses and organizations interested in entering a float should contact Town Hall. The parade begins promptly at 2:00 PM — arrive early for the best viewing spots along the route!",
				),
				featuredImage: media?.["event-christmas-parade"] ?? null,
				eventDate: getNextDate(11, 6),
				eventTime: "2:00 PM",
				endTime: "4:00 PM",
				location: "Harmony Highway",
				locationAddress: "Harmony Hwy, Harmony, NC 28634",
				organizer: "Town of Harmony",
				contactEmail: "info@townofharmony.org",
				contactPhone: "(704) 546-2339",
				status: "upcoming" as const,
				isRecurring: false,
				categories: ["community", "holiday"],
				tags: ["christmas", "parade", "holiday"],
			},
			{
				title: "Spring Cleanup Day",
				slug: "spring-cleanup-day-2025",
				description:
					"Volunteer to help beautify our community during the annual Spring Cleanup Day. Supplies and refreshments provided.",
				content: createRichText(
					"Join your neighbors for the annual Spring Cleanup Day! Volunteers will meet at Town Hall at 8:00 AM where supplies, refreshments, and area assignments will be provided. Together, we'll clean up our parks, roadsides, and public spaces to keep Harmony beautiful. Trash bags, gloves, and safety vests will be provided. This is a great opportunity to get outside, meet your neighbors, and make a visible difference in our community. Last year, over 100 volunteers participated and collected more than 200 bags of litter. Bring the whole family — there are tasks for all ages and abilities!",
				),
				featuredImage: media?.["event-spring-cleanup"] ?? null,
				eventDate: getNextDate(3, 19),
				eventTime: "8:00 AM",
				endTime: "12:00 PM",
				location: "Town Hall",
				locationAddress: "3389 Harmony Hwy, Harmony, NC 28634",
				organizer: "Public Works Department",
				contactEmail: "publicworks@townofharmony.org",
				contactPhone: "(704) 546-2341",
				status: "upcoming" as const,
				isRecurring: false,
				categories: ["community"],
				tags: ["cleanup", "volunteer", "spring"],
			},
		];

		const created = await Promise.all(
			events.map(async (event) => {
				try {
					const result = await payload.create({
						collection: "events",
						data: event as any,
					});
					return result;
				} catch (error) {
					console.error(`Error creating event: ${event.title}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} events`);
		return valid;
	} catch (error) {
		console.error("Error seeding sample events:", error);
		throw error;
	}
};
