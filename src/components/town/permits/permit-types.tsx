import {
	ArrowRight,
	Building,
	Car,
	Hammer,
	Home,
	Shield,
	TreePine,
	Wrench,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PermitType {
	id: string;
	name: string;
	description: string;
	fee: number; // in cents
	processingTime: string;
	requirements: string[];
	category: string;
	icon: React.ComponentType<{ className?: string }>;
}

const permitTypes: PermitType[] = [
	{
		id: "building",
		name: "Building Permit",
		description: "Required for new construction, additions, and major renovations",
		fee: 10000, // $100.00
		processingTime: "2-4 weeks",
		requirements: [
			"Construction plans and blueprints",
			"Site survey",
			"Engineering reports (if applicable)",
			"Contractor license verification",
		],
		category: "construction",
		icon: Building,
	},
	{
		id: "residential-renovation",
		name: "Residential Renovation",
		description: "For interior and exterior home improvements",
		fee: 5000, // $50.00
		processingTime: "1-2 weeks",
		requirements: [
			"Project description",
			"Before/after photos or drawings",
			"Contractor information",
		],
		category: "construction",
		icon: Home,
	},
	{
		id: "electrical",
		name: "Electrical Permit",
		description: "For electrical work and installations",
		fee: 7500, // $75.00
		processingTime: "3-5 business days",
		requirements: ["Electrical plan", "Licensed electrician information", "Load calculations"],
		category: "utilities",
		icon: Zap,
	},
	{
		id: "plumbing",
		name: "Plumbing Permit",
		description: "For plumbing installations and major repairs",
		fee: 6000, // $60.00
		processingTime: "3-5 business days",
		requirements: ["Plumbing diagram", "Licensed plumber information", "Material specifications"],
		category: "utilities",
		icon: Wrench,
	},
	{
		id: "driveway",
		name: "Driveway Permit",
		description: "For new driveways and driveway modifications",
		fee: 2500, // $25.00
		processingTime: "1 week",
		requirements: ["Property survey", "Driveway specifications", "Drainage plan"],
		category: "property",
		icon: Car,
	},
	{
		id: "tree-removal",
		name: "Tree Removal Permit",
		description: "Required for removing trees over 6 inches in diameter",
		fee: 1500, // $15.00
		processingTime: "3-5 business days",
		requirements: [
			"Tree location map",
			"Arborist report (for protected species)",
			"Replacement plan (if required)",
		],
		category: "property",
		icon: TreePine,
	},
	{
		id: "fence",
		name: "Fence Permit",
		description: "For installing or replacing fences over 4 feet high",
		fee: 3000, // $30.00
		processingTime: "1 week",
		requirements: ["Property survey", "Fence specifications", "Neighbor notification form"],
		category: "property",
		icon: Shield,
	},
	{
		id: "demolition",
		name: "Demolition Permit",
		description: "Required for demolishing structures or parts of structures",
		fee: 15000, // $150.00
		processingTime: "2-3 weeks",
		requirements: [
			"Demolition plan",
			"Hazmat inspection report",
			"Utilities disconnection confirmation",
			"Waste disposal plan",
		],
		category: "construction",
		icon: Hammer,
	},
];

const categoryColors: Record<string, string> = {
	construction: "bg-orange-100 text-orange-800",
	utilities: "bg-blue-100 text-blue-800",
	property: "bg-green-100 text-green-800",
};

interface PermitTypesProps {
	category?: string;
}

export function PermitTypes({ category }: PermitTypesProps) {
	const filteredPermits =
		category && category !== "all"
			? permitTypes.filter((permit) => permit.category === category)
			: permitTypes;

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{filteredPermits.map((permit) => {
				const IconComponent = permit.icon;
				const formattedFee = permit.fee > 0 ? `$${(permit.fee / 100).toFixed(2)}` : "Free";

				return (
					<Card key={permit.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
						<CardHeader className="pb-4">
							<div className="flex items-start justify-between gap-3">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<div className="p-2 rounded-lg bg-blue-50 text-blue-600">
											<IconComponent className="h-5 w-5" />
										</div>
										<Badge variant="secondary" className={categoryColors[permit.category]}>
											{permit.category}
										</Badge>
									</div>
									<h3 className="font-semibold text-lg mb-1">{permit.name}</h3>
									<p className="text-sm text-muted-foreground">{permit.description}</p>
								</div>
							</div>
						</CardHeader>

						<CardContent className="flex-1 flex flex-col justify-between">
							<div className="space-y-4 mb-6">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Fee:</span>
									<span className="font-medium">{formattedFee}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Processing Time:</span>
									<span className="font-medium">{permit.processingTime}</span>
								</div>

								<div>
									<h4 className="text-sm font-medium mb-2">Requirements:</h4>
									<ul className="text-xs text-muted-foreground space-y-1">
										{permit.requirements.slice(0, 3).map((requirement, index) => (
											<li key={index} className="flex items-start gap-2">
												<span className="inline-block w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
												{requirement}
											</li>
										))}
										{permit.requirements.length > 3 && (
											<li className="text-blue-600 text-xs">
												+{permit.requirements.length - 3} more requirements
											</li>
										)}
									</ul>
								</div>
							</div>

							<Button asChild className="w-full">
								<Link href={`/permits/apply?type=${permit.id}`}>
									Apply Now
									<ArrowRight className="h-4 w-4 ml-2" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
