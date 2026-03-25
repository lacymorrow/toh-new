import type { Metadata } from "next";
import { FileText, Globe, Phone, Mail, Shield, Home, Landmark, BookOpen } from "lucide-react";
import { getResources } from "@/lib/town-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Resources | Town of Harmony, NC",
	description:
		"Access town documents, community services, and helpful links for the Town of Harmony, North Carolina.",
};

const iconMap: Record<string, React.ElementType> = {
	FileText,
	Globe,
	Shield,
	Home,
	Landmark,
	BookOpen,
};

export default async function ResourcesPage() {
	const resources = await getResources();

	const grouped: Record<string, typeof resources> = {};
	for (const resource of resources) {
		const label =
			resource.type === "document"
				? "Documents"
				: resource.type === "service"
					? "Services"
					: "Links";
		if (!grouped[label]) grouped[label] = [];
		grouped[label].push(resource);
	}

	const typeOrder = ["Documents", "Services", "Links"] as const;

	return (
		<div className="container mx-auto max-w-6xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Resources</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Town documents, community services, and helpful links.
				</p>
			</div>

			{typeOrder.map((type) => {
				const group = grouped[type];
				if (!group?.length) return null;

				return (
					<section key={type} className="mb-12">
						<h2 className="mb-6 text-2xl font-semibold">{type}</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{group.map((resource) => {
								const Icon = iconMap[resource.icon] ?? FileText;
								return (
									<Card key={resource.id}>
										<CardHeader className="pb-3">
											<div className="flex items-center gap-3">
												<Icon className="h-5 w-5 text-muted-foreground" />
												<CardTitle className="text-base">{resource.title}</CardTitle>
											</div>
											<Badge variant="secondary" className="w-fit">
												{resource.category}
											</Badge>
										</CardHeader>
										<CardContent>
											<p className="mb-3 text-sm text-muted-foreground">
												{resource.description}
											</p>
											<div className="flex flex-col gap-1.5 text-sm">
												{resource.contactPhone && (
													<a
														href={`tel:${resource.contactPhone.replace(/[^0-9+]/g, "")}`}
														className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
													>
														<Phone className="h-3.5 w-3.5" />
														{resource.contactPhone}
													</a>
												)}
												{resource.contactEmail && (
													<a
														href={`mailto:${resource.contactEmail}`}
														className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
													>
														<Mail className="h-3.5 w-3.5" />
														{resource.contactEmail}
													</a>
												)}
												{resource.externalUrl && (
													<a
														href={resource.externalUrl}
														target="_blank"
														rel="noopener noreferrer"
														className={cn(
															buttonVariants({ variant: "outline", size: "sm" }),
															"mt-2 w-fit",
														)}
													>
														View Resource
													</a>
												)}
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</section>
				);
			})}
		</div>
	);
}
