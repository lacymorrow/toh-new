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

			<section className="py-16 bg-warm-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-12">
						{/* Latest News */}
						<div>
							<h2 className="text-2xl font-serif font-bold text-sage-dark mb-6 pb-3 border-b-2 border-wheat">
								Latest News
							</h2>
							<Suspense fallback={<div className="text-[#7A756C]">Loading news...</div>}>
								<LatestNews />
							</Suspense>
						</div>

						{/* Upcoming Events */}
						<div>
							<h2 className="text-2xl font-serif font-bold text-sage-dark mb-6 pb-3 border-b-2 border-wheat">
								Upcoming Events
							</h2>
							<Suspense fallback={<div className="text-[#7A756C]">Loading events...</div>}>
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
