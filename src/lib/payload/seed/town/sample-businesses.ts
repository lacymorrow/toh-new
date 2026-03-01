import type { Payload } from "payload";
import { createRichText } from "../../seed-utils";
import type { MediaMap } from "./seed-media";

export const seedSampleBusinesses = async (payload: Payload, media?: Partial<MediaMap>) => {
	try {
		console.info("🏪 Seeding sample businesses...");

		// Clear existing data
		await payload.delete({
			collection: "businesses",
			where: {
				id: {
					exists: true,
				},
			},
		});

		const businesses = [
			{
				name: "Harmony General Store",
				slug: "harmony-general-store",
				description: createRichText(
					"A family-owned general store serving the Harmony community since 1952. We carry groceries, household essentials, local produce, and a little bit of everything you might need.",
				),
				logo: media?.["biz-general-store"] ?? null,
				category: "retail" as const,
				contactName: "Martha Jenkins",
				email: "info@harmonygeneralstore.com",
				phone: "(704) 546-2350",
				address: "3401 Harmony Hwy",
				city: "Harmony",
				state: "NC",
				zipCode: "28634",
				hours: {
					monday: "7:00 AM - 7:00 PM",
					tuesday: "7:00 AM - 7:00 PM",
					wednesday: "7:00 AM - 7:00 PM",
					thursday: "7:00 AM - 7:00 PM",
					friday: "7:00 AM - 8:00 PM",
					saturday: "8:00 AM - 6:00 PM",
					sunday: "Closed",
				},
				isVerified: true,
				isFeatured: true,
			},
			{
				name: "Southern Comfort Diner",
				slug: "southern-comfort-diner",
				description: createRichText(
					"Home-style Southern cooking at its finest. Our diner has been a gathering place for the Harmony community for over 30 years, serving breakfast, lunch, and dinner with a smile.",
				),
				logo: media?.["biz-diner"] ?? null,
				category: "restaurant" as const,
				contactName: "Bobby Ray Thompson",
				email: "eat@southerncomfortdiner.com",
				phone: "(704) 546-2355",
				address: "3425 Harmony Hwy",
				city: "Harmony",
				state: "NC",
				zipCode: "28634",
				hours: {
					monday: "6:00 AM - 8:00 PM",
					tuesday: "6:00 AM - 8:00 PM",
					wednesday: "6:00 AM - 8:00 PM",
					thursday: "6:00 AM - 8:00 PM",
					friday: "6:00 AM - 9:00 PM",
					saturday: "7:00 AM - 9:00 PM",
					sunday: "8:00 AM - 3:00 PM",
				},
				isVerified: true,
				isFeatured: true,
			},
			{
				name: "Harmony Family Medicine",
				slug: "harmony-family-medicine",
				description: createRichText(
					"Providing comprehensive family healthcare to the Harmony community. We offer preventive care, wellness visits, chronic disease management, and same-day appointments for urgent needs.",
				),
				logo: media?.["biz-medical"] ?? null,
				category: "healthcare" as const,
				contactName: "Dr. Susan Patterson",
				email: "appointments@harmonyfamilymedicine.com",
				phone: "(704) 546-2360",
				website: "https://www.harmonyfamilymedicine.com",
				address: "125 Medical Center Dr",
				city: "Harmony",
				state: "NC",
				zipCode: "28634",
				hours: {
					monday: "8:00 AM - 5:00 PM",
					tuesday: "8:00 AM - 5:00 PM",
					wednesday: "8:00 AM - 5:00 PM",
					thursday: "8:00 AM - 5:00 PM",
					friday: "8:00 AM - 12:00 PM",
					saturday: "Closed",
					sunday: "Closed",
				},
				isVerified: true,
				isFeatured: false,
			},
			{
				name: "Harmony Hardware & Farm Supply",
				slug: "harmony-hardware-farm-supply",
				description: createRichText(
					"Your local source for hardware, tools, farm supplies, animal feed, and gardening essentials. Friendly, knowledgeable staff to help with any project.",
				),
				logo: media?.["biz-hardware"] ?? null,
				category: "retail" as const,
				contactName: "Tom Davis",
				email: "info@harmonyhardware.com",
				phone: "(704) 546-2365",
				address: "3450 Harmony Hwy",
				city: "Harmony",
				state: "NC",
				zipCode: "28634",
				hours: {
					monday: "7:30 AM - 6:00 PM",
					tuesday: "7:30 AM - 6:00 PM",
					wednesday: "7:30 AM - 6:00 PM",
					thursday: "7:30 AM - 6:00 PM",
					friday: "7:30 AM - 6:00 PM",
					saturday: "8:00 AM - 4:00 PM",
					sunday: "Closed",
				},
				isVerified: true,
				isFeatured: false,
			},
			{
				name: "Harmony Auto Repair",
				slug: "harmony-auto-repair",
				description: createRichText(
					"Honest, reliable auto repair and maintenance service. ASE-certified mechanics providing quality work at fair prices for over 20 years.",
				),
				logo: media?.["biz-auto"] ?? null,
				category: "service" as const,
				contactName: "Mike Reynolds",
				phone: "(704) 546-2370",
				address: "3480 Harmony Hwy",
				city: "Harmony",
				state: "NC",
				zipCode: "28634",
				hours: {
					monday: "8:00 AM - 5:30 PM",
					tuesday: "8:00 AM - 5:30 PM",
					wednesday: "8:00 AM - 5:30 PM",
					thursday: "8:00 AM - 5:30 PM",
					friday: "8:00 AM - 5:30 PM",
					saturday: "By appointment",
					sunday: "Closed",
				},
				isVerified: true,
				isFeatured: false,
			},
			{
				name: "Harmony Community Church Thrift Store",
				slug: "harmony-thrift-store",
				description: createRichText(
					"A community thrift store operated by volunteers from Harmony Community Church. All proceeds support local charitable programs and community outreach.",
				),
				logo: media?.["biz-thrift"] ?? null,
				category: "nonprofit" as const,
				contactName: "Linda Cartwright",
				phone: "(704) 546-2375",
				address: "200 Church St",
				city: "Harmony",
				state: "NC",
				zipCode: "28634",
				hours: {
					monday: "Closed",
					tuesday: "10:00 AM - 4:00 PM",
					wednesday: "10:00 AM - 4:00 PM",
					thursday: "10:00 AM - 4:00 PM",
					friday: "10:00 AM - 4:00 PM",
					saturday: "9:00 AM - 2:00 PM",
					sunday: "Closed",
				},
				isVerified: true,
				isFeatured: false,
			},
		];

		const created = await Promise.all(
			businesses.map(async (business) => {
				try {
					const result = await payload.create({
						collection: "businesses",
						data: business,
					});
					return result;
				} catch (error) {
					console.error(`Error creating business: ${business.name}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} businesses`);
		return valid;
	} catch (error) {
		console.error("Error seeding sample businesses:", error);
		throw error;
	}
};
