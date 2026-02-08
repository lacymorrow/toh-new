import type { Payload } from "payload";
import { createRichText } from "../../seed-utils";

export const seedPointsOfInterest = async (payload: Payload) => {
	try {
		console.info("📍 Seeding points of interest...");

		// Clear existing data
		await payload.delete({
			collection: "points-of-interest",
			where: {
				id: {
					exists: true,
				},
			},
		});

		const pointsOfInterest = [
			{
				name: "Harmony Park",
				slug: "harmony-park",
				category: "Parks" as const,
				description: createRichText(
					"A beautiful community park offering recreational facilities for all ages. Features include a playground, walking trails, picnic shelters, and open green spaces perfect for family gatherings and community events.",
				),
				address: "100 Park Drive, Harmony, NC 28634",
				hours: "Dawn to Dusk",
				phone: "(704) 546-2342",
				amenities: ["Playground", "Walking Trails", "Picnic Shelters", "Open Fields", "Restrooms"],
			},
			{
				name: "Harmony Town Hall",
				slug: "town-hall",
				category: "Government" as const,
				description: createRichText(
					"The seat of town government and center of civic life in Harmony. Town Hall houses administrative offices and serves as the meeting place for the Board of Aldermen. Residents can access various town services here.",
				),
				address: "3389 Harmony Hwy, Harmony, NC 28634",
				hours: "Monday - Friday: 8:00 AM - 5:00 PM",
				phone: "(704) 546-2339",
				amenities: ["Accessible Entrance", "Public Meeting Room", "Parking"],
			},
			{
				name: "Camp Meeting Grounds",
				slug: "camp-meeting-grounds-poi",
				category: "Historic Sites" as const,
				description: createRichText(
					"The original camp meeting grounds where the Harmony community first gathered. This historic site predates the town's incorporation and represents the spiritual and communal roots of Harmony. The grounds continue to host community events and celebrations.",
				),
				address: "Harmony Highway, Harmony, NC 28634",
				hours: "Open during events",
				phone: "(704) 546-2339",
				amenities: ["Historic Markers", "Open Grounds", "Parking"],
			},
			{
				name: "Harmony Veterans Memorial",
				slug: "veterans-memorial",
				category: "Memorials" as const,
				description: createRichText(
					"A solemn memorial honoring the brave men and women from the Harmony community who served in the United States Armed Forces. The memorial features plaques, flags, and a peaceful garden setting for reflection.",
				),
				address: "Main Street, Harmony, NC 28634",
				hours: "Open 24 hours",
				amenities: ["Memorial Plaques", "Flag Display", "Garden", "Benches"],
			},
			{
				name: "Harmony Community Center",
				slug: "community-center-poi",
				category: "Government" as const,
				description: createRichText(
					"A multipurpose facility that serves as the heart of community activities. The center hosts meetings, classes, events, and social gatherings. Available for private rentals and community organization meetings.",
				),
				address: "Main Street, Harmony, NC 28634",
				hours: "Monday - Saturday: 9:00 AM - 9:00 PM",
				phone: "(704) 546-2342",
				amenities: ["Meeting Rooms", "Kitchen", "Stage", "Parking", "Accessible"],
			},
			{
				name: "Harmony Elementary School",
				slug: "harmony-elementary",
				category: "Education" as const,
				description: createRichText(
					"Part of the Iredell-Statesville Schools district, Harmony Elementary serves the children of the Harmony community. The school has been a cornerstone of education in the area for generations.",
				),
				address: "Harmony Highway, Harmony, NC 28634",
				hours: "School hours: 7:30 AM - 2:30 PM",
				phone: "(704) 546-2340",
				amenities: ["Playground", "Athletic Fields", "Library", "Parking"],
			},
		];

		const created = await Promise.all(
			pointsOfInterest.map(async (poi) => {
				try {
					const result = await payload.create({
						collection: "points-of-interest",
						data: poi,
					});
					return result;
				} catch (error) {
					console.error(`Error creating point of interest: ${poi.name}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} points of interest`);
		return valid;
	} catch (error) {
		console.error("Error seeding points of interest:", error);
		throw error;
	}
};
