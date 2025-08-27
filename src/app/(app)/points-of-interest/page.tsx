import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pointsOfInterest = [
	{
		id: 1,
		name: "Harmony Community Park",
		category: "Parks & Recreation",
		description: "Beautiful 25-acre park featuring walking trails, playground equipment, picnic areas, and sports facilities.",
		address: "123 Park Lane, Harmony, NC 28634",
		hours: "Dawn to Dusk",
		phone: "(704) 546-7004",
		image: "/images/park.jpg",
		amenities: ["Playground", "Walking Trails", "Picnic Areas", "Baseball Field", "Basketball Courts"],
	},
	{
		id: 2,
		name: "Historic Harmony Chapel",
		category: "Historic Sites",
		description: "Built in 1892, this historic chapel represents the founding of our community at the original camp meeting grounds.",
		address: "456 Chapel Road, Harmony, NC 28634",
		hours: "Tours: Saturday 10am-2pm",
		phone: "(704) 546-7010",
		image: "/images/chapel.jpg",
		amenities: ["Guided Tours", "Event Space", "Historical Exhibits"],
	},
	{
		id: 3,
		name: "Harmony Town Library",
		category: "Education",
		description: "Community library offering books, digital resources, computer access, and educational programs for all ages.",
		address: "789 Main Street, Harmony, NC 28634",
		hours: "Mon-Fri: 9am-7pm, Sat: 10am-5pm",
		phone: "(704) 546-7015",
		website: "https://library.townofharmony.org",
		image: "/images/library.jpg",
		amenities: ["Free WiFi", "Computer Lab", "Study Rooms", "Children's Section"],
	},
	{
		id: 4,
		name: "Farmers Market Pavilion",
		category: "Shopping",
		description: "Open-air pavilion hosting our weekly farmers market and community events throughout the year.",
		address: "321 Market Street, Harmony, NC 28634",
		hours: "Market Days: Sat 8am-1pm (Apr-Oct)",
		phone: "(704) 546-7020",
		image: "/images/market.jpg",
		amenities: ["Covered Pavilion", "Vendor Spaces", "Parking", "Restrooms"],
	},
	{
		id: 5,
		name: "Veterans Memorial",
		category: "Memorials",
		description: "A solemn tribute to local veterans who served our country, featuring memorial walls and reflection areas.",
		address: "Town Square, Harmony, NC 28634",
		hours: "Always Open",
		image: "/images/memorial.jpg",
		amenities: ["Memorial Walls", "Seating Areas", "Flag Display"],
	},
	{
		id: 6,
		name: "Harmony Creek Greenway",
		category: "Parks & Recreation",
		description: "3.5-mile paved greenway following Harmony Creek, perfect for walking, jogging, and cycling.",
		address: "Multiple Access Points",
		hours: "Dawn to Dusk",
		image: "/images/greenway.jpg",
		amenities: ["Paved Trail", "Mile Markers", "Benches", "Creek Views"],
	},
];

const categories = ["All", "Parks & Recreation", "Historic Sites", "Education", "Shopping", "Memorials"];

export default function PointsOfInterestPage() {
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
						{pointsOfInterest.map((poi) => (
							<Card key={poi.id} className="overflow-hidden hover:shadow-lg transition-shadow">
								<CardHeader className="pb-4">
									<Badge className="mb-2 w-fit">{poi.category}</Badge>
									<CardTitle className="text-xl">{poi.name}</CardTitle>
									<CardDescription>{poi.description}</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex items-start gap-2 text-sm text-gray-600">
										<MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>{poi.address}</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Clock className="h-4 w-4 flex-shrink-0" />
										<span>{poi.hours}</span>
									</div>
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
									{poi.amenities && (
										<div className="pt-2 border-t">
											<p className="text-sm font-medium mb-2">Amenities:</p>
											<div className="flex flex-wrap gap-1">
												{poi.amenities.map((amenity) => (
													<Badge key={amenity} variant="outline" className="text-xs">
														{amenity}
													</Badge>
												))}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						))}
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