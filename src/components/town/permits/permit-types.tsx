"use client";

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
	type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useBuilderData } from "@/lib/builder-data";
import { permitTypes as staticPermitTypes, type TownPermitType } from "@/data/town/permits";

const iconMap: Record<string, LucideIcon> = {
	Building,
	Home,
	Zap,
	Wrench,
	Car,
	TreePine,
	Shield,
	Hammer,
};

const categoryColors: Record<string, string> = {
	construction: "bg-orange-100 text-orange-800",
	utilities: "bg-stone text-sage",
	property: "bg-green-100 text-green-800",
};

interface PermitTypesProps {
	category?: string;
}

export function PermitTypes({ category }: PermitTypesProps) {
	// Map Builder.io data shape to local shape (permitId → id)
	interface BuilderPermitType {
		permitId: string;
		name: string;
		description: string;
		fee: number;
		processingTime: string;
		requirements: string[];
		category: string;
		icon: string;
	}

	const { data: rawPermits } = useBuilderData<BuilderPermitType>(
		"town-permit-type",
		{ limit: 50, fallback: staticPermitTypes.map((p) => ({ ...p, permitId: p.id })) },
	);

	const permitTypes = rawPermits.map((p) => ({ ...p, id: p.permitId }));

	const filteredPermits =
		category && category !== "all"
			? permitTypes.filter((permit) => permit.category === category)
			: permitTypes;

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{filteredPermits.map((permit) => {
				const IconComponent = iconMap[permit.icon] ?? Building;
				const formattedFee = permit.fee > 0 ? `$${(permit.fee / 100).toFixed(2)}` : "Free";

				return (
					<Card key={permit.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
						<CardHeader className="pb-4">
							<div className="flex items-start justify-between gap-3">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<div className="p-2 rounded-lg bg-cream text-sage">
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
											<li className="text-sage text-xs">
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
