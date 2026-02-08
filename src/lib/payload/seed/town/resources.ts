import type { Payload } from "payload";

export const seedResources = async (payload: Payload) => {
	try {
		console.info("📋 Seeding resources...");

		// Clear existing data
		await payload.delete({
			collection: "resources",
			where: {
				id: {
					exists: true,
				},
			},
		});

		const resources = [
			// Documents
			{
				title: "Town Charter",
				slug: "town-charter",
				type: "document" as const,
				category: "General" as const,
				icon: "FileText",
				description: "The founding charter of the Town of Harmony, outlining the structure and powers of the town government.",
				sortOrder: 0,
			},
			{
				title: "Town Ordinances",
				slug: "town-ordinances",
				type: "document" as const,
				category: "General" as const,
				icon: "FileText",
				description: "A compilation of all current town ordinances and local laws governing the Town of Harmony.",
				sortOrder: 1,
			},
			{
				title: "Annual Budget",
				slug: "annual-budget",
				type: "document" as const,
				category: "General" as const,
				icon: "FileText",
				description: "The current fiscal year budget for the Town of Harmony, including revenue projections and expenditure details.",
				sortOrder: 2,
			},
			// Services
			{
				title: "Emergency Services",
				slug: "emergency-services-resource",
				type: "service" as const,
				category: "Community" as const,
				icon: "Shield",
				description: "Access emergency services including police, fire, and medical assistance.",
				contactPhone: "911",
				sortOrder: 3,
			},
			{
				title: "Town Hall",
				slug: "town-hall-service",
				type: "service" as const,
				category: "Community" as const,
				icon: "Home",
				description: "Town Hall administrative offices providing general town services, permits, and information.",
				contactPhone: "(704) 546-2339",
				sortOrder: 4,
			},
			{
				title: "Public Works",
				slug: "public-works-service",
				type: "service" as const,
				category: "Community" as const,
				icon: "Wrench",
				description: "Public Works Department handles roads, water, sewer, and infrastructure maintenance.",
				contactPhone: "(704) 546-2341",
				contactEmail: "publicworks@townofharmony.org",
				sortOrder: 5,
			},
			{
				title: "Parks & Recreation",
				slug: "parks-service",
				type: "service" as const,
				category: "Community" as const,
				icon: "Heart",
				description: "Parks & Recreation Department manages town parks, recreational facilities, and community programs.",
				contactPhone: "(704) 546-2342",
				contactEmail: "recreation@townofharmony.org",
				sortOrder: 6,
			},
			// Links
			{
				title: "Iredell County Government",
				slug: "iredell-county",
				type: "link" as const,
				category: "External" as const,
				icon: "Globe",
				description: "Official website of Iredell County Government, providing county services and information.",
				externalUrl: "https://www.co.iredell.nc.us/",
				sortOrder: 7,
			},
			{
				title: "North Carolina State Government",
				slug: "nc-state",
				type: "link" as const,
				category: "External" as const,
				icon: "Globe",
				description: "Official website of the State of North Carolina.",
				externalUrl: "https://www.nc.gov/",
				sortOrder: 8,
			},
			{
				title: "Iredell-Statesville Schools",
				slug: "iss-schools",
				type: "link" as const,
				category: "External" as const,
				icon: "Globe",
				description: "Iredell-Statesville Schools district serving the Harmony area.",
				externalUrl: "https://www.iss.k12.nc.us/",
				sortOrder: 9,
			},
			{
				title: "Greater Statesville Chamber",
				slug: "statesville-chamber",
				type: "link" as const,
				category: "External" as const,
				icon: "Globe",
				description: "Greater Statesville Chamber of Commerce supporting local businesses and economic development.",
				externalUrl: "https://statesvillechamber.org/",
				sortOrder: 10,
			},
		];

		const created = await Promise.all(
			resources.map(async (resource) => {
				try {
					const result = await payload.create({
						collection: "resources",
						data: resource,
					});
					return result;
				} catch (error) {
					console.error(`Error creating resource: ${resource.title}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} resources`);
		return valid;
	} catch (error) {
		console.error("Error seeding resources:", error);
		throw error;
	}
};
