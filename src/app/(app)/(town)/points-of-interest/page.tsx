import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPointsOfInterest } from "@/lib/payload/town-data";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";
import { getMediaUrl } from "@/lib/utils/get-media-url";

export default async function PointsOfInterestPage() {
	const pois = await getPointsOfInterest();

	// Get unique categories from fetched data
	const categories = ["All", ...new Set(pois.map((poi: any) => poi.category as string))];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-4">Points of Interest</h1>
					<p className="text-xl">Discover what makes Harmony special</p>
				</div>
			</section>

			{/* Category Filter */}
			<section className="py-6 bg-white border-b">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<Badge key={category} variant={category === "All" ? "default" : "secondary"} className="cursor-pointer">
								{category}
							</Badge>
						))}
					</div>
				</div>
			</section>

			{/* Points of Interest Grid */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{pois.map((poi: any) => {
							const descriptionText = typeof poi.description === "string"
								? poi.description
								: extractTextFromRichText(poi.description);

							return (
								<Card key={poi.id} className="overflow-hidden hover:shadow-lg transition-shadow">
									{getMediaUrl(poi.image) && (
										<div className="h-48 overflow-hidden">
											<img
												src={getMediaUrl(poi.image)!}
												alt={poi.name}
												className="w-full h-full object-cover"
											/>
										</div>
									)}
									<CardHeader className="pb-4">
										<Badge className="mb-2 w-fit">{poi.category}</Badge>
										<CardTitle className="text-xl">{poi.name}</CardTitle>
										<CardDescription>{descriptionText}</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										{poi.address && (
											<div className="flex items-start gap-2 text-sm text-gray-600">
												<MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
												<span>{poi.address}</span>
											</div>
										)}
										{poi.hours && (
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<Clock className="h-4 w-4 flex-shrink-0" />
												<span>{poi.hours}</span>
											</div>
										)}
										{poi.phone && (
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<Phone className="h-4 w-4 flex-shrink-0" />
												<span>{poi.phone}</span>
											</div>
										)}
										{poi.website && (
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<ExternalLink className="h-4 w-4 flex-shrink-0" />
												<a href={poi.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
													Visit Website
												</a>
											</div>
										)}
										{Array.isArray(poi.amenities) && poi.amenities.length > 0 && (
											<div className="pt-2 border-t">
												<p className="text-sm font-medium mb-2">Amenities:</p>
												<div className="flex flex-wrap gap-1">
													{(poi.amenities as string[]).map((amenity) => (
														<Badge key={amenity} variant="outline" className="text-xs">
															{amenity}
														</Badge>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Additional Information */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Visit Harmony</h2>
						<p className="text-gray-600 mb-4">
							Located in beautiful Iredell County, North Carolina, the Town of Harmony offers a perfect blend of small-town charm and modern amenities.
							Our community takes pride in preserving our rich history while providing excellent facilities and services for residents and visitors alike.
						</p>
						<div className="grid md:grid-cols-3 gap-6 mt-6">
							<div>
								<h3 className="font-semibold mb-2">Visitor Information</h3>
								<p className="text-sm text-gray-600">
									Stop by Town Hall for maps, brochures, and friendly local advice about exploring our community.
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Parking</h3>
								<p className="text-sm text-gray-600">
									Free parking is available at all town facilities. Downtown street parking is limited to 2 hours during business hours.
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Accessibility</h3>
								<p className="text-sm text-gray-600">
									All town facilities are ADA accessible. Contact us for specific accommodation needs.
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
}
