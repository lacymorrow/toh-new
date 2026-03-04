export interface TownPermitType {
	id: string;
	name: string;
	description: string;
	fee: number; // in cents
	processingTime: string;
	requirements: string[];
	category: string;
	icon: string;
}

export const permitTypes: TownPermitType[] = [
	{
		id: "building",
		name: "Building Permit",
		description: "Required for new construction, additions, and major renovations",
		fee: 10000,
		processingTime: "2-4 weeks",
		requirements: [
			"Construction plans and blueprints",
			"Site survey",
			"Engineering reports (if applicable)",
			"Contractor license verification",
		],
		category: "construction",
		icon: "Building",
	},
	{
		id: "residential-renovation",
		name: "Residential Renovation",
		description: "For interior and exterior home improvements",
		fee: 5000,
		processingTime: "1-2 weeks",
		requirements: [
			"Project description",
			"Before/after photos or drawings",
			"Contractor information",
		],
		category: "construction",
		icon: "Home",
	},
	{
		id: "electrical",
		name: "Electrical Permit",
		description: "For electrical work and installations",
		fee: 7500,
		processingTime: "3-5 business days",
		requirements: ["Electrical plan", "Licensed electrician information", "Load calculations"],
		category: "utilities",
		icon: "Zap",
	},
	{
		id: "plumbing",
		name: "Plumbing Permit",
		description: "For plumbing installations and major repairs",
		fee: 6000,
		processingTime: "3-5 business days",
		requirements: ["Plumbing diagram", "Licensed plumber information", "Material specifications"],
		category: "utilities",
		icon: "Wrench",
	},
	{
		id: "driveway",
		name: "Driveway Permit",
		description: "For new driveways and driveway modifications",
		fee: 2500,
		processingTime: "1 week",
		requirements: ["Property survey", "Driveway specifications", "Drainage plan"],
		category: "property",
		icon: "Car",
	},
	{
		id: "tree-removal",
		name: "Tree Removal Permit",
		description: "Required for removing trees over 6 inches in diameter",
		fee: 1500,
		processingTime: "3-5 business days",
		requirements: [
			"Tree location map",
			"Arborist report (for protected species)",
			"Replacement plan (if required)",
		],
		category: "property",
		icon: "TreePine",
	},
	{
		id: "fence",
		name: "Fence Permit",
		description: "For installing or replacing fences over 4 feet high",
		fee: 3000,
		processingTime: "1 week",
		requirements: ["Property survey", "Fence specifications", "Neighbor notification form"],
		category: "property",
		icon: "Shield",
	},
	{
		id: "demolition",
		name: "Demolition Permit",
		description: "Required for demolishing structures or parts of structures",
		fee: 15000,
		processingTime: "2-3 weeks",
		requirements: [
			"Demolition plan",
			"Hazmat inspection report",
			"Utilities disconnection confirmation",
			"Waste disposal plan",
		],
		category: "construction",
		icon: "Hammer",
	},
];
