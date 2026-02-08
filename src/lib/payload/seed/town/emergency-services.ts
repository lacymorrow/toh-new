import type { Payload } from "payload";

export const seedEmergencyServices = async (payload: Payload) => {
	try {
		console.info("🚨 Seeding emergency services...");

		// Clear existing data
		await payload.delete({
			collection: "emergency-services",
			where: {
				id: {
					exists: true,
				},
			},
		});

		const emergencyServices = [
			{
				title: "Emergency Services",
				description: "For life-threatening emergencies, fire, or crimes in progress. Call 911 immediately.",
				phone: "911",
				category: "immediate" as const,
				icon: "Phone",
				preparedness: [
					"Call 911",
					"Know your address",
					"Stay calm",
					"Follow dispatcher instructions",
					"Do not hang up until told to do so",
				],
				sortOrder: 0,
			},
			{
				title: "Fire Department",
				description: "Harmony Volunteer Fire Department provides fire suppression, rescue, and emergency medical services to the community.",
				phone: "(704) 546-3200",
				category: "immediate" as const,
				icon: "Flame",
				preparedness: [
					"Install smoke detectors on every level",
					"Create a fire escape plan",
					"Keep fire extinguishers accessible",
					"Never leave cooking unattended",
				],
				sortOrder: 1,
			},
			{
				title: "Police Department",
				description: "The Harmony Police Department serves and protects the community with professional law enforcement services.",
				phone: "(704) 546-2340",
				category: "public-safety" as const,
				icon: "Shield",
				preparedness: [
					"Lock doors and windows",
					"Report suspicious activity",
					"Keep emergency numbers handy",
				],
				sortOrder: 2,
			},
			{
				title: "Power Outages",
				description: "Report power outages and downed power lines. Stay away from downed lines and report them immediately.",
				phone: "(704) 555-0100",
				category: "utility" as const,
				icon: "Zap",
				preparedness: [
					"Keep flashlights and batteries available",
					"Have a battery-powered radio",
					"Unplug sensitive electronics during storms",
				],
				sortOrder: 3,
			},
			{
				title: "Water/Sewer Emergency",
				description: "Report water main breaks, sewer backups, and other water or sewer emergencies.",
				phone: "(704) 555-0101",
				category: "utility" as const,
				icon: "Wrench",
				preparedness: [
					"Know where your main water shutoff is",
					"Keep bottled water for emergencies",
					"Report leaks promptly",
				],
				sortOrder: 4,
			},
			{
				title: "Gas Leaks",
				description: "If you smell gas, leave the area immediately and call from a safe distance. Do not use electrical switches.",
				phone: "(704) 555-0102",
				category: "utility" as const,
				icon: "AlertTriangle",
				preparedness: [
					"Know the smell of natural gas",
					"Leave immediately if you smell gas",
					"Do not use electrical switches or phones near a gas leak",
				],
				sortOrder: 5,
			},
			{
				title: "Animal Control",
				description: "Report stray, dangerous, or injured animals. Animal control officers are available to assist with animal-related issues.",
				phone: "(704) 555-0103",
				category: "public-safety" as const,
				icon: "Shield",
				preparedness: [
					"Keep pets vaccinated and licensed",
					"Do not approach unfamiliar animals",
					"Secure garbage cans to avoid attracting wildlife",
				],
				sortOrder: 6,
			},
			{
				title: "Road Hazards",
				description: "Report road hazards including fallen trees, potholes, flooding, and debris on roadways.",
				phone: "(704) 555-0104",
				category: "public-safety" as const,
				icon: "AlertCircle",
				preparedness: [
					"Drive cautiously in bad weather",
					"Report hazards promptly",
					"Keep an emergency kit in your vehicle",
				],
				sortOrder: 7,
			},
			{
				title: "Hospital",
				description: "Iredell Memorial Hospital provides emergency medical care and hospital services to the Harmony area.",
				phone: "(704) 555-0105",
				category: "health" as const,
				icon: "Stethoscope",
				preparedness: [
					"Know the route to the nearest hospital",
					"Keep a list of medications and allergies",
					"Have health insurance information accessible",
				],
				sortOrder: 8,
			},
			{
				title: "Poison Control",
				description: "National Poison Control Center provides free, confidential medical advice 24 hours a day, 7 days a week.",
				phone: "1-800-222-1222",
				category: "health" as const,
				icon: "ShieldAlert",
				preparedness: [
					"Keep the poison control number posted",
					"Store household chemicals safely",
					"Keep medications out of reach of children",
				],
				sortOrder: 9,
			},
		];

		const created = await Promise.all(
			emergencyServices.map(async (service) => {
				try {
					const result = await payload.create({
						collection: "emergency-services",
						data: service,
					});
					return result;
				} catch (error) {
					console.error(`Error creating emergency service: ${service.title}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} emergency services`);
		return valid;
	} catch (error) {
		console.error("Error seeding emergency services:", error);
		throw error;
	}
};
