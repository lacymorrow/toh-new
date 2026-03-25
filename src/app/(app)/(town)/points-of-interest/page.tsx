import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Clock, Phone as PhoneIcon } from "lucide-react";
import { getPointsOfInterest } from "@/lib/town-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
	title: "Points of Interest | Town of Harmony, NC",
	description:
		"Discover parks, historic sites, and local attractions in the Town of Harmony, North Carolina.",
};

export default async function PointsOfInterestPage() {
	const pois = await getPointsOfInterest();

	return (
		<div className="container mx-auto max-w-6xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Points of Interest
				</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Discover parks, historic sites, and local attractions in and around Harmony.
				</p>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{pois.map((poi) => (
					<Card key={poi.id} className="overflow-hidden">
						{poi.image && (
							<div className="relative h-48 w-full">
								<Image
									src={poi.image}
									alt={poi.name}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<CardHeader className="pb-2">
							<Badge variant="secondary" className="w-fit">
								{poi.category}
							</Badge>
							<CardTitle className="text-lg">{poi.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-3 text-sm text-muted-foreground">{poi.description}</p>

							<div className="flex flex-col gap-2 text-sm">
								<div className="flex items-start gap-2">
									<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
									<span className="text-muted-foreground">{poi.address}</span>
								</div>
								<div className="flex items-start gap-2">
									<Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
									<span className="text-muted-foreground">{poi.hours}</span>
								</div>
								{poi.phone && (
									<div className="flex items-start gap-2">
										<PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
										<a
											href={`tel:${poi.phone.replace(/[^0-9+]/g, "")}`}
											className="text-muted-foreground hover:text-foreground"
										>
											{poi.phone}
										</a>
									</div>
								)}
							</div>

							{poi.amenities.length > 0 && (
								<div className="mt-3 flex flex-wrap gap-1.5">
									{poi.amenities.map((amenity) => (
										<Badge key={amenity} variant="outline" className="text-xs">
											{amenity}
										</Badge>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
