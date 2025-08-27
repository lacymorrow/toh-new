import { Suspense } from "react";
import { CommunitySpotlight } from "@/components/town/community-spotlight";
import { HeroSection } from "@/components/town/hero-section";
import { LatestNews } from "@/components/town/latest-news";
import { NewsletterSignup } from "@/components/town/newsletter-signup";
import { QuickLinks } from "@/components/town/quick-links";
import { UpcomingEvents } from "@/components/town/upcoming-events";

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<QuickLinks />

			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Latest News */}
						<div className="lg:col-span-2">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News & Announcements</h2>
							<Suspense fallback={<div>Loading news...</div>}>
								<LatestNews />
							</Suspense>
						</div>

						{/* Upcoming Events */}
						<div>
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
							<Suspense fallback={<div>Loading events...</div>}>
								<UpcomingEvents />
							</Suspense>
						</div>
					</div>
				</div>
			</section>

			<CommunitySpotlight />
			<NewsletterSignup />
		</>
	);
}
