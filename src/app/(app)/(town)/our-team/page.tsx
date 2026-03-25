import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { getTeamMembers } from "@/lib/town-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
	title: "Our Team | Town of Harmony, NC",
	description:
		"Meet the elected officials and staff who serve the Town of Harmony, North Carolina.",
};

export default async function OurTeamPage() {
	const members = await getTeamMembers();

	const grouped: Record<string, typeof members> = {};
	for (const member of members) {
		const cat = member.category;
		if (!grouped[cat]) grouped[cat] = [];
		grouped[cat].push(member);
	}

	const categoryOrder = ["Executive", "Town Council", "Staff"] as const;

	return (
		<div className="container mx-auto max-w-6xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Meet the elected officials and staff who serve the Town of Harmony.
				</p>
			</div>

			{categoryOrder.map((category) => {
				const group = grouped[category];
				if (!group?.length) return null;

				return (
					<section key={category} className="mb-12">
						<h2 className="mb-6 text-2xl font-semibold">{category}</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{group.map((member) => (
								<Card key={member.id}>
									<CardContent className="pt-6">
										<div className="flex flex-col items-center text-center">
											{member.image ? (
												<Image
													src={member.image}
													alt={member.name}
													width={96}
													height={96}
													className="mb-4 h-24 w-24 rounded-full object-cover"
												/>
											) : (
												<div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-2xl font-bold text-muted-foreground">
													{member.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</div>
											)}
											<h3 className="text-lg font-semibold">{member.name}</h3>
											<Badge variant="secondary" className="mt-1">
												{member.title}
											</Badge>
											{member.termExpires && (
												<p className="mt-2 text-sm text-muted-foreground">
													Term expires: {member.termExpires}
												</p>
											)}
											<div className="mt-3 flex flex-col gap-1">
												{member.phone && (
													<a
														href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
														className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
													>
														<Phone className="h-3.5 w-3.5" />
														{member.phone}
													</a>
												)}
												{member.email && (
													<a
														href={`mailto:${member.email}`}
														className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
													>
														<Mail className="h-3.5 w-3.5" />
														{member.email}
													</a>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
}
