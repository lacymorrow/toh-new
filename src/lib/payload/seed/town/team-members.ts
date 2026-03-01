import type { Payload } from "payload";

export const seedTeamMembers = async (payload: Payload, _media?: Record<string, number>) => {
	try {
		console.info("🏛️ Seeding team members...");

		// Clear existing data
		await payload.delete({
			collection: "team-members",
			where: {
				id: {
					exists: true,
				},
			},
		});

		const teamMembers = [
			// Executive
			{
				name: "Sean Turner",
				title: "Mayor",
				category: "Executive" as const,
				email: "mayor@townofharmony.org",
				phone: "(704) 546-7001",
				termExpires: "2024",
				sortOrder: 0,
				isActive: true,
			},
			{
				name: "Wanda Edwards",
				title: "Town Clerk",
				category: "Executive" as const,
				email: "clerk@townofharmony.org",
				phone: "(704) 546-7002",
				sortOrder: 1,
				isActive: true,
			},
			// Board of Aldermen
			{
				name: "Brandon Angell",
				title: "Alderman",
				category: "Board of Aldermen" as const,
				email: "bangell@townofharmony.org",
				phone: "(704) 546-7011",
				termExpires: "2025",
				sortOrder: 0,
				isActive: true,
			},
			{
				name: "Jared Clark",
				title: "Alderman",
				category: "Board of Aldermen" as const,
				email: "jclark@townofharmony.org",
				phone: "(704) 546-7012",
				termExpires: "2024",
				sortOrder: 1,
				isActive: true,
			},
			{
				name: "Scotty Harris",
				title: "Alderman",
				category: "Board of Aldermen" as const,
				email: "sharris@townofharmony.org",
				phone: "(704) 546-7013",
				termExpires: "2025",
				sortOrder: 2,
				isActive: true,
			},
			{
				name: "Chris Pierce",
				title: "Alderman",
				category: "Board of Aldermen" as const,
				email: "cpierce@townofharmony.org",
				phone: "(704) 546-7014",
				termExpires: "2024",
				sortOrder: 3,
				isActive: true,
			},
			// Department Heads
			{
				name: "Michael Thompson",
				title: "Town Manager",
				category: "Department Heads" as const,
				email: "manager@townofharmony.org",
				phone: "(704) 546-7003",
				department: "Administration",
				sortOrder: 0,
				isActive: true,
			},
			{
				name: "Sarah Johnson",
				title: "Finance Director",
				category: "Department Heads" as const,
				email: "finance@townofharmony.org",
				phone: "(704) 546-7004",
				department: "Finance",
				sortOrder: 1,
				isActive: true,
			},
			{
				name: "David Williams",
				title: "Public Works Director",
				category: "Department Heads" as const,
				email: "publicworks@townofharmony.org",
				phone: "(704) 546-7005",
				department: "Public Works",
				sortOrder: 2,
				isActive: true,
			},
			{
				name: "Jennifer Martinez",
				title: "Parks & Recreation Director",
				category: "Department Heads" as const,
				email: "recreation@townofharmony.org",
				phone: "(704) 546-7006",
				department: "Parks & Recreation",
				sortOrder: 3,
				isActive: true,
			},
			{
				name: "Robert Anderson",
				title: "Planning Director",
				category: "Department Heads" as const,
				email: "planning@townofharmony.org",
				phone: "(704) 546-7007",
				department: "Planning & Zoning",
				sortOrder: 4,
				isActive: true,
			},
			{
				name: "Chief James Wilson",
				title: "Police Chief",
				category: "Department Heads" as const,
				email: "police@townofharmony.org",
				phone: "(704) 546-7008",
				department: "Police Department",
				sortOrder: 5,
				isActive: true,
			},
		];

		const created = await Promise.all(
			teamMembers.map(async (member) => {
				try {
					const result = await payload.create({
						collection: "team-members",
						data: member,
					});
					return result;
				} catch (error) {
					console.error(`Error creating team member: ${member.name}`, error);
					return null;
				}
			}),
		);

		const valid = created.filter(Boolean);
		console.info(`✅ Created ${valid.length} team members`);
		return valid;
	} catch (error) {
		console.error("Error seeding team members:", error);
		throw error;
	}
};
