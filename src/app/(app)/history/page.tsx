import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Calendar, MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
	title: "History | Town of Harmony",
	description: "Discover the rich history of Harmony, West Virginia - from its founding in 1798 to the present day.",
};

const historicalPeriods = [
	{
		era: "1798 - 1850",
		title: "Founding Years",
		description: "The establishment and early growth of Harmony",
		highlights: [
			"Founded by John Harmony in 1798",
			"First church built in 1802",
			"Incorporated as a town in 1815",
		],
		image: "/images/history/founding.jpg",
		link: "/history/founding-years",
	},
	{
		era: "1850 - 1900",
		title: "Industrial Growth",
		description: "The rise of coal mining and railroad expansion",
		highlights: [
			"Railroad arrives in 1872",
			"Coal mining begins in 1875",
			"Population exceeds 5,000 in 1890",
		],
		image: "/images/history/industrial.jpg",
		link: "/history/industrial-growth",
	},
	{
		era: "1900 - 1950",
		title: "Modern Era",
		description: "Modernization and community development",
		highlights: [
			"First hospital opens in 1905",
			"Electric streetlights installed in 1912",
			"High school built in 1925",
		],
		image: "/images/history/modern.jpg",
		link: "/history/modern-era",
	},
	{
		era: "1950 - Present",
		title: "Contemporary Harmony",
		description: "From mining town to diverse community",
		highlights: [
			"Interstate highway completed in 1968",
			"Historic downtown restoration in 1995",
			"Town bicentennial celebration in 1998",
		],
		image: "/images/history/contemporary.jpg",
		link: "/history/contemporary",
	},
];

const historicalLandmarks = [
	{
		name: "Old Town Hall",
		year: "1825",
		description: "Original seat of town government, now a museum",
		address: "100 Main Street",
	},
	{
		name: "Harmony Methodist Church",
		year: "1802",
		description: "First church in Harmony, still holding services",
		address: "215 Church Street",
	},
	{
		name: "Railroad Depot",
		year: "1872",
		description: "Historic train station, now visitor center",
		address: "50 Railroad Avenue",
	},
	{
		name: "Miners Memorial",
		year: "1985",
		description: "Monument honoring coal mining heritage",
		address: "Memorial Park",
	},
];

export default function HistoryPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Our History
						</h1>
						<p className="text-xl mb-6">
							Discover the story of Harmony, from a small frontier settlement to a thriving West Virginia community.
						</p>
						<div className="flex flex-wrap gap-4">
							<div className="flex items-center gap-2">
								<Calendar className="h-5 w-5" />
								<span>Founded 1798</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								<span>Barbour County, WV</span>
							</div>
							<div className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								<span>Population: 12,543</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Historical Timeline</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{historicalPeriods.map((period, index) => (
							<Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
								<div className="h-48 bg-gray-200 relative">
									{/* Placeholder for image */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
									<div className="absolute bottom-4 left-4 text-white">
										<p className="font-semibold text-lg">{period.era}</p>
									</div>
								</div>
								<CardHeader>
									<CardTitle>{period.title}</CardTitle>
									<CardDescription>{period.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 mb-4">
										{period.highlights.map((highlight, idx) => (
											<li key={idx} className="flex items-start gap-2">
												<ChevronRight className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
												<span className="text-sm text-gray-700">{highlight}</span>
											</li>
										))}
									</ul>
									<Button variant="outline" className="w-full" asChild>
										<Link href={period.link}>
											Learn More
											<ChevronRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Historical Landmarks */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Historical Landmarks</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{historicalLandmarks.map((landmark, index) => (
							<Card key={index}>
								<CardHeader>
									<div className="flex justify-between items-start mb-2">
										<MapPin className="h-5 w-5 text-blue-600" />
										<span className="text-sm text-gray-500">{landmark.year}</span>
									</div>
									<CardTitle className="text-lg">{landmark.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-600 mb-2">{landmark.description}</p>
									<p className="text-xs text-gray-500">{landmark.address}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Resources Section */}
			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Historical Resources</h2>
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<Card>
							<CardHeader>
								<BookOpen className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Town Archives</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 mb-4">
									Access historical documents, photographs, and records dating back to 1798.
								</p>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/history/archives">Visit Archives</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Users className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Historical Society</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 mb-4">
									Join the Harmony Historical Society and help preserve our town's heritage.
								</p>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/history/society">Join Society</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Calendar className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Museum Hours</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 mb-4">
									Visit the Harmony History Museum at the Old Town Hall.
								</p>
								<div className="text-sm space-y-1">
									<p>Wed-Fri: 10am - 4pm</p>
									<p>Sat-Sun: 12pm - 5pm</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-12 bg-blue-900 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
					<p className="text-lg mb-6 max-w-2xl mx-auto">
						Do you have historical photos, documents, or stories about Harmony? 
						We'd love to add them to our archives.
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Button size="lg" variant="secondary">
							Submit Historical Materials
						</Button>
						<Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900">
							Contact Archivist
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}