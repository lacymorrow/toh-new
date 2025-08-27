import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CommunitySpotlight() {
	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Community Spotlight</h2>

				<div className="grid md:grid-cols-3 gap-6">
					{/* Featured Business */}
					<Card className="overflow-hidden">
						<div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
							<div className="text-white text-center p-4">
								<h3 className="text-xl font-bold mb-2">Support Local Business</h3>
								<p className="text-sm">Discover what our local merchants have to offer</p>
							</div>
						</div>
						<CardContent className="p-4">
							<h4 className="font-semibold mb-2">Shop Local, Support Harmony</h4>
							<p className="text-sm text-gray-600 mb-4">
								Our local businesses are the heart of our community. Find restaurants, shops, and
								services in our business directory.
							</p>
							<Button asChild variant="outline" size="sm" className="w-full">
								<Link href="/business">Browse Directory</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Town History */}
					<Card className="overflow-hidden">
						<div className="h-48 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
							<div className="text-white text-center p-4">
								<h3 className="text-xl font-bold mb-2">Rich History</h3>
								<p className="text-sm">Established 1832</p>
							</div>
						</div>
						<CardContent className="p-4">
							<h4 className="font-semibold mb-2">Nearly 200 Years of Heritage</h4>
							<p className="text-sm text-gray-600 mb-4">
								Learn about Harmony's fascinating history, from our founding days to becoming the
								vibrant community we are today.
							</p>
							<Button asChild variant="outline" size="sm" className="w-full">
								<Link href="/history">Explore Our History</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Get Involved */}
					<Card className="overflow-hidden">
						<div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
							<div className="text-white text-center p-4">
								<h3 className="text-xl font-bold mb-2">Get Involved</h3>
								<p className="text-sm">Make a difference in your community</p>
							</div>
						</div>
						<CardContent className="p-4">
							<h4 className="font-semibold mb-2">Volunteer Opportunities</h4>
							<p className="text-sm text-gray-600 mb-4">
								Join committees, volunteer for events, or participate in community projects. Your
								involvement makes Harmony stronger.
							</p>
							<Button asChild variant="outline" size="sm" className="w-full">
								<Link href="/community/volunteer">Learn More</Link>
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600">5,234</div>
						<div className="text-sm text-gray-600">Population</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600">1832</div>
						<div className="text-sm text-gray-600">Established</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600">150+</div>
						<div className="text-sm text-gray-600">Local Businesses</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600">12</div>
						<div className="text-sm text-gray-600">Parks & Recreation</div>
					</div>
				</div>
			</div>
		</section>
	);
}
