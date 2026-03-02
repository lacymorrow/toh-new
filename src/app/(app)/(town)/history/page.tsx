import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Calendar, MapPin, Users } from "lucide-react";
import { getHistoryArticles, getSettings } from "@/lib/payload/town-data";
import { getMediaUrl } from "@/lib/utils/get-media-url";

export const metadata: Metadata = {
	title: "History | Town of Harmony",
	description: "Discover the rich history of Harmony, North Carolina - from its founding at the camp meeting grounds in 1927 to the present day.",
};

export default async function HistoryPage() {
	const [periods, landmarks, settings] = await Promise.all([
		getHistoryArticles("period"),
		getHistoryArticles("landmark"),
		getSettings(),
	]);

	const established = (settings as any)?.branding?.established ?? "1927";

	return (
		<div className="min-h-screen bg-cream">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-sage-dark to-sage text-white py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Our History
						</h1>
						<p className="text-xl mb-6">
							Discover the story of Harmony, from its founding at the camp meeting grounds in {established} to a vibrant North Carolina community where traditions are carried into the future.
						</p>
						<div className="flex flex-wrap gap-4">
							<div className="flex items-center gap-2">
								<Calendar className="h-5 w-5" />
								<span>Established {established}</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								<span>{(settings as any)?.branding?.county ?? "Iredell County"}, NC</span>
							</div>
							<div className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								<span>A Close-Knit Community</span>
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
						{periods.map((period: any) => (
							<Card key={period.id} className="overflow-hidden hover:shadow-lg transition-shadow">
								<div className="h-48 bg-stone relative">
									{getMediaUrl(period.image) && (
										<img
											src={getMediaUrl(period.image)!}
											alt={period.title}
											className="absolute inset-0 w-full h-full object-cover"
										/>
									)}
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
									{Array.isArray(period.highlights) && (
										<ul className="space-y-2 mb-4">
											{(period.highlights as string[]).map((highlight, idx) => (
												<li key={idx} className="flex items-start gap-2">
													<ChevronRight className="h-4 w-4 text-[#7A756C] mt-0.5 flex-shrink-0" />
													<span className="text-sm text-[#4A4640]">{highlight}</span>
												</li>
											))}
										</ul>
									)}
									<Button variant="outline" className="w-full" asChild>
										<Link href={`/history/${period.slug}`}>
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
						{landmarks.map((landmark: any) => (
							<Card key={landmark.id} className="overflow-hidden">
								{getMediaUrl(landmark.image) && (
									<div className="h-36 relative">
										<img
											src={getMediaUrl(landmark.image)!}
											alt={landmark.title}
											className="w-full h-full object-cover"
										/>
									</div>
								)}
								<CardHeader>
									<div className="flex justify-between items-start mb-2">
										<MapPin className="h-5 w-5 text-sage" />
										<span className="text-sm text-[#7A756C]">{landmark.year}</span>
									</div>
									<CardTitle className="text-lg">{landmark.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-[#4A4640] mb-2">{landmark.description}</p>
									{landmark.address && (
										<p className="text-xs text-[#7A756C]">{landmark.address}</p>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Resources Section */}
			<section className="py-12 bg-cream">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Historical Resources</h2>
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<Card>
							<CardHeader>
								<BookOpen className="h-8 w-8 text-sage mb-2" />
								<CardTitle>Town Archives</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-[#4A4640] mb-4">
									Access historical documents, photographs, and records dating back to the founding in {established}.
								</p>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/history/archives">Visit Archives</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Users className="h-8 w-8 text-sage mb-2" />
								<CardTitle>Historical Society</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-[#4A4640] mb-4">
									Join the Harmony Historical Society and help preserve our town's heritage.
								</p>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/history/society">Join Society</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Calendar className="h-8 w-8 text-sage mb-2" />
								<CardTitle>Museum Hours</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-[#4A4640] mb-4">
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
			<section className="py-12 bg-sage-dark text-white">
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
						<Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-sage-dark">
							Contact Archivist
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
